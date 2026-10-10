import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AnimatePresence } from 'framer-motion';

import LenisProvider from './components/providers/LenisProvider';
import ScrollToTop from './components/ScrollToTop';
import MainLayout from './layouts/MainLayout';
import { ThemeProvider } from './context/ThemeContext';

// Lazy loaded pages for performance
import Home from './pages/Home';
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Industries = lazy(() => import('./pages/Industries'));
const IndustryDetail = lazy(() => import('./pages/IndustryDetail'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const CaseStudy = lazy(() => import('./pages/CaseStudy'));
const TechStack = lazy(() => import('./pages/TechStack'));
const TechStackDetail = lazy(() => import('./pages/TechStackDetail'));
const Careers = lazy(() => import('./pages/Careers'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));

const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Terms = lazy(() => import('./pages/Terms'));
const NotFound = lazy(() => import('./pages/NotFound'));
const HireUs = lazy(() => import('./pages/HireUs'));
const Pricing = lazy(() => import('./pages/Pricing'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Security = lazy(() => import('./pages/Security'));
const FreeAudit = lazy(() => import('./pages/FreeAudit'));

function App() {
  return (
    <ThemeProvider>
      <HelmetProvider>
        <LenisProvider>
          <Router>
            <ScrollToTop />
            <MainLayout>
              <Suspense fallback={<div className="flex h-screen items-center justify-center text-white light:text-slate-900"><div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div></div>}>
                <AnimatePresence mode="wait">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/industries" element={<Industries />} />
                    <Route path="/industries/:slug" element={<IndustryDetail />} />
                    <Route path="/portfolio" element={<Portfolio />} />
                    <Route path="/hire" element={<HireUs />} />
                    <Route path="/case-studies" element={<Navigate to="/portfolio" replace />} />
                    <Route path="/case-studies/:slug" element={<CaseStudy />} />
                    <Route path="/process" element={<Navigate to="/about#process" replace />} />
                    <Route path="/tech" element={<TechStack />} />
                    <Route path="/tech/:slug" element={<TechStackDetail />} />
                    <Route path="/careers" element={<Careers />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:slug" element={<BlogPost />} />
                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/security" element={<Security />} />
                    <Route path="/free-audit" element={<FreeAudit />} />

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
    </ThemeProvider>
  );
}

export default App;
