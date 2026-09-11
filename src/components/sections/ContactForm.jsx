import { useRef, useState } from 'react';
import { MessageCircle, Mail, Check, AlertCircle, Loader2 } from 'lucide-react';
import { gym } from '../../data/gym';
import { cn } from '../../utils/helpers';
import { TRAINING_GOALS, PREFERRED_TIMES, MESSAGE_MAX } from '../../utils/constants';
import { validateInquiry, hasErrors } from '../../utils/validators';
import { openWhatsAppInquiry, isWhatsAppConfigured } from '../../services/whatsapp.service';
import { sendInquiryEmail, isEmailConfigured, buildMailtoUrl } from '../../services/email.service';
import Reveal from '../common/Reveal';
import SectionLabel from '../common/SectionLabel';
import Field from '../common/Field';

// One place mapping an outcome to its colour, so no state renders untinted.
const MSG_TONE = {
  success: 'border-l-success [&>svg]:text-success',
  whatsapp: 'border-l-success [&>svg]:text-success',
  error: 'border-l-danger [&>svg]:text-danger',
  invalid: 'border-l-danger [&>svg]:text-danger',
  fallback: 'border-l-accent [&>svg]:text-accent-bright',
  sending: 'border-l-text/20 text-text-dim',
};

// Only fields with a rule worth checking before submit.
const TOUCHABLE = new Set(['name', 'phone', 'email', 'goal']);

const EMPTY = { name: '', phone: '', email: '', goal: '', preferredTime: '', message: '' };

export default function ContactForm({
  heading = 'Your first session starts here.',
  kicker = 'Book a free trial',
  index = '08',
  id = 'contact',
}) {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const busyRef = useRef(false);

  const emailReady = isEmailConfigured();
  const waReady = isWhatsAppConfigured();
  const sending = status.type === 'sending';

  const setField = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    // Clear a field's error as soon as the visitor starts correcting it.
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
  };

  /** Field-level check on blur, so a bad phone or a skipped field is flagged
      as soon as the visitor leaves it rather than only at submit. */
  const validateField = (e) => {
    const { name } = e.target;
    if (!TOUCHABLE.has(name)) return;
    const errs = validateInquiry(values, { requireEmail: false });
    setErrors((prev) => ({ ...prev, [name]: errs[name] }));
  };

  const focusFirstError = (errs) => {
    const first = Object.keys(errs)[0];
    if (first) document.getElementById(first)?.focus();
  };

  const runValidation = (requireEmail) => {
    const errs = validateInquiry(values, { requireEmail });
    const cleaned = Object.fromEntries(Object.entries(errs).filter(([, v]) => v));
    setErrors(cleaned);
    if (hasErrors(cleaned)) {
      setStatus({ type: 'invalid', message: 'Please check the highlighted fields.' });
      focusFirstError(cleaned);
      return false;
    }
    return true;
  };

  const handleWhatsApp = (e) => {
    e.preventDefault();
    if (busyRef.current) return;
    if (!waReady) {
      setStatus({
        type: 'error',
        message: 'WhatsApp is not configured yet. Please call or email us instead.',
      });
      return;
    }
    if (!runValidation(false)) return;

    busyRef.current = true;
    openWhatsAppInquiry(values);
    // WhatsApp owns the conversation from here - do not claim we delivered it.
    setStatus({
      type: 'whatsapp',
      message:
        'WhatsApp is opening with your details filled in. Press send there and we will reply from this number.',
    });
    busyRef.current = false;
  };

  const handleEmail = async () => {
    if (busyRef.current) return;

    if (!emailReady) {
      setStatus({
        type: 'fallback',
        message:
          'Email sending is not switched on for this site yet. Use WhatsApp, or open your own email app below.',
      });
      return;
    }
    if (!runValidation(true)) return;

    busyRef.current = true;
    setStatus({ type: 'sending', message: 'Sending your enquiry…' });

    try {
      await sendInquiryEmail(values);
      setStatus({
        type: 'success',
        message: 'Your enquiry is in. We reply to everything within one working day.',
      });
      setValues(EMPTY);
    } catch (err) {
      const notConfigured = err?.message === 'NOT_CONFIGURED';
      setStatus({
        type: notConfigured ? 'fallback' : 'error',
        message: notConfigured
          ? 'Email sending is not switched on for this site yet. Use WhatsApp, or open your own email app below.'
          : 'We couldn’t send the email right now. Please use WhatsApp or call us directly.',
      });
    } finally {
      busyRef.current = false;
    }
  };

  const showFallbackLinks = status.type === 'fallback' || status.type === 'error';

  return (
    <section className="bg-bg-2 py-section" id={id} aria-labelledby="cta-title">
      <div className="section-shell grid gap-[clamp(2.5rem,5vw,4.5rem)] 2xl:grid-cols-[minmax(0,4fr)_minmax(0,6fr)] 2xl:items-start 2xl:gap-[clamp(3rem,6vw,6rem)]">
        <div className="grid content-start gap-[clamp(1.75rem,3vw,2.5rem)]">
          <Reveal>
            <SectionLabel index={index}>{kicker}</SectionLabel>
            <h2 className="display mt-4 max-w-[15ch] text-d2 text-text" id="cta-title">
              {heading}
            </h2>
          </Reveal>

          <Reveal delay={0.08} className="grid gap-4">
            <p className="max-w-[40ch] text-lead text-text-dim">
              One session, no charge, no sales pitch. You train, you look around, and you decide
              afterwards.
            </p>
            <ul className="grid gap-2.5 border-t border-text/10 pt-4 [&>li]:relative [&>li]:pl-6 [&>li]:text-sm [&>li]:text-text-dim [&>li:before]:absolute [&>li:before]:left-0 [&>li:before]:top-[0.7em] [&>li:before]:h-0.5 [&>li:before]:w-2.5 [&>li:before]:bg-accent [&>li:before]:content-['']">
              <li>A coach walks you through the floor</li>
              <li>You do a real session, scaled to you</li>
              <li>We talk about a plan only if you want to</li>
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="">
          <form
            className="grid gap-6 border border-text/10 bg-bg p-[clamp(1.5rem,3vw,2.5rem)]"
            onSubmit={handleWhatsApp}
            noValidate
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                id="name"
                label="Name"
                required
                value={values.name}
                onChange={setField}
                onBlur={validateField}
                error={errors.name}
                autoComplete="name"
                placeholder="Your name"
              />
              <Field
                id="phone"
                label="Phone"
                required
                as="input"
                type="tel"
                inputMode="tel"
                value={values.phone}
                onChange={setField}
                onBlur={validateField}
                error={errors.phone}
                autoComplete="tel"
                placeholder="Your mobile number"
              />
              <Field
                id="email"
                label="Email"
                as="input"
                type="email"
                inputMode="email"
                value={values.email}
                onChange={setField}
                onBlur={validateField}
                error={errors.email}
                autoComplete="email"
                placeholder="you@example.com"
                hint="Needed only if you want a reply by email."
                className="sm:col-span-2"
              />
              <Field
                id="goal"
                label="What do you want to work on"
                required
                as="select"
                value={values.goal}
                onChange={setField}
                onBlur={validateField}
                error={errors.goal}
              >
                <option value="">Choose one</option>
                {TRAINING_GOALS.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </Field>
              <Field
                id="preferredTime"
                label="Preferred time"
                as="select"
                value={values.preferredTime}
                onChange={setField}
                onBlur={validateField}
                error={errors.preferredTime}
              >
                <option value="">No preference</option>
                {PREFERRED_TIMES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </Field>
              <Field
                id="message"
                label="Anything we should know"
                as="textarea"
                value={values.message}
                onChange={setField}
                onBlur={validateField}
                error={errors.message}
                maxLength={MESSAGE_MAX}
                placeholder="Injuries, training history, questions…"
                className="sm:col-span-2"
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <button type="submit" className="btn btn-primary btn-lg w-full" disabled={sending}>
                <MessageCircle size={16} strokeWidth={2} aria-hidden="true" />
                <span>Send on WhatsApp</span>
              </button>

              <button
                type="button"
                className="btn btn-ghost btn-lg w-full"
                onClick={handleEmail}
                disabled={sending}
              >
                {sending ? (
                  <Loader2 size={16} strokeWidth={2} aria-hidden="true" className="animate-spin" />
                ) : (
                  <Mail size={16} strokeWidth={2} aria-hidden="true" />
                )}
                <span>{sending ? 'Sending…' : 'Send by email'}</span>
              </button>
            </div>

            <p className="text-sm text-muted">
              WhatsApp opens a chat with your details filled in — quickest way to reach us.
            </p>

            {/* Every outcome is announced, and nothing claims success it did not get. */}
            <div className="grid gap-4" role="status" aria-live="polite">
              {status.type !== 'idle' && status.message ? (
                <p
                  className={cn(
                    'flex items-start gap-2.5 border border-l-2 border-text/10 bg-surface p-4 text-sm text-text [&>svg]:mt-[0.15em] [&>svg]:flex-none',
                    MSG_TONE[status.type] ?? 'border-l-text/20 text-text-dim'
                  )}
                >
                  {status.type === 'success' || status.type === 'whatsapp' ? (
                    <Check size={16} strokeWidth={2.25} aria-hidden="true" />
                  ) : status.type === 'sending' ? (
                    <Loader2
                      size={16}
                      strokeWidth={2}
                      aria-hidden="true"
                      className="animate-spin"
                    />
                  ) : (
                    <AlertCircle size={16} strokeWidth={2.25} aria-hidden="true" />
                  )}
                  <span>{status.message}</span>
                </p>
              ) : null}

              {showFallbackLinks ? (
                <p className="flex flex-wrap gap-6">
                  <a className="link-arrow" href={buildMailtoUrl(values)}>
                    Email us directly
                  </a>
                  <a className="link-arrow" href={`tel:${gym.phoneDial}`}>
                    Call {gym.phoneDisplay}
                  </a>
                </p>
              ) : null}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
