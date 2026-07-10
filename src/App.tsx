import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AnimatePresence } from 'framer-motion';

import LenisProvider from './components/providers/LenisProvider';
import ScrollToTop from './components/ScrollToTop';
import MainLayout from './layouts/MainLayout';

// Lazy loaded pages for performance
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Industries = lazy(() => import('./pages/Industries'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const CaseStudies = lazy(() => import('./pages/CaseStudies'));
const Process = lazy(() => import('./pages/Process'));
const TechStack = lazy(() => import('./pages/TechStack'));
const Careers = lazy(() => import('./pages/Careers'));
const Blog = lazy(() => import('./pages/Blog'));
const Contact = lazy(() => import('./pages/Contact'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Terms = lazy(() => import('./pages/Terms'));
const NotFound = lazy(() => import('./pages/NotFound'));
const HireUs = lazy(() => import('./pages/HireUs'));

function App() {
  return (
    <HelmetProvider>
      <LenisProvider>
        <Router>
          <ScrollToTop />
          <MainLayout>
            <Suspense fallback={<div className="flex h-screen items-center justify-center text-white"><div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div></div>}>
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/industries" element={<Industries />} />
                  <Route path="/portfolio" element={<Portfolio />} />
                  <Route path="/hire" element={<HireUs />} />
                  <Route path="/hire-us" element={<HireUs />} />
                  <Route path="/case-studies" element={<CaseStudies />} />
                  <Route path="/process" element={<Process />} />
                  <Route path="/tech" element={<TechStack />} />
                  <Route path="/tec" element={<TechStack />} />
                  <Route path="/technologies" element={<TechStack />} />
                  <Route path="/careers" element={<Careers />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </AnimatePresence>
            </Suspense>
          </MainLayout>
        </Router>
      </LenisProvider>
    </HelmetProvider>
  );
}

export default App;
