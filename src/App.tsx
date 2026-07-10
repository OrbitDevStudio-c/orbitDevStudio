import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AnimatePresence } from 'framer-motion';

import LenisProvider from './components/providers/LenisProvider';
import ScrollToTop from './components/ScrollToTop';
import MainLayout from './layouts/MainLayout';
import { routes } from './config/routes';

// Lazy loaded pages for performance
const pageModules: Record<string, React.LazyExoticComponent<React.ComponentType<any>>> = {
  Home: lazy(() => import('./pages/Home')),
  About: lazy(() => import('./pages/About')),
  Services: lazy(() => import('./pages/Services')),
  Industries: lazy(() => import('./pages/Industries')),
  Portfolio: lazy(() => import('./pages/Portfolio')),
  CaseStudies: lazy(() => import('./pages/CaseStudies')),
  Process: lazy(() => import('./pages/Process')),
  TechStack: lazy(() => import('./pages/TechStack')),
  Careers: lazy(() => import('./pages/Careers')),
  Blog: lazy(() => import('./pages/Blog')),
  Contact: lazy(() => import('./pages/Contact')),
  PrivacyPolicy: lazy(() => import('./pages/PrivacyPolicy')),
  Terms: lazy(() => import('./pages/Terms')),
  NotFound: lazy(() => import('./pages/NotFound')),
  HireUs: lazy(() => import('./pages/HireUs')),
};

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
                  {routes.flatMap((route) => {
                    const Component = pageModules[route.component];
                    if (!Component) return [];
                    
                    const mainRoute = <Route key={route.path} path={route.path} element={<Component />} />;
                    const aliasRoutes = route.aliases?.map((alias) => (
                      <Route key={alias} path={alias} element={<Component />} />
                    )) || [];
                    
                    return [mainRoute, ...aliasRoutes];
                  })}
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

