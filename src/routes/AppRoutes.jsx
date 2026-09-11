import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Contact from '../pages/Contact';
import TrialBooking from '../pages/TrialBooking';
import NotFound from '../pages/NotFound';

/**
 * The marketing site is one page. Only the two conversion flows get their own
 * route; /memberships used to duplicate a homepage section, so it now resolves
 * to that section instead of rendering it twice.
 */
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/book-trial" element={<TrialBooking />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/memberships" element={<Navigate to="/#memberships" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
