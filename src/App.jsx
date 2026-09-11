import { BrowserRouter } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ScrollManager from './components/common/ScrollManager';
import SmoothScroll from './components/common/SmoothScroll';
import NoiseOverlay from './components/common/NoiseOverlay';
import LocalBusinessSchema from './components/common/LocalBusinessSchema';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <SmoothScroll />
      <ScrollManager />
      <LocalBusinessSchema />
      <NoiseOverlay />

      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Header />

      <main id="main">
        <AppRoutes />
      </main>

      <Footer />
    </BrowserRouter>
  );
}
