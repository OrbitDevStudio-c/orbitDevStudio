import { Suspense, lazy, useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/ui/Navbar';
import { BrandIconGradientDefs } from '../components/ui/GradientIcon';
import { initAnalytics, installClickTracking, trackPageView } from '../lib/analytics';

const Footer = lazy(() => import('../components/ui/Footer'));
const AIChatWidget = lazy(() => import('../components/ui/AIChatWidget'));

function DeferredChrome() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const win = window as any;
    if ('requestIdleCallback' in win) {
      const handle = win.requestIdleCallback(() => setReady(true), { timeout: 2000 });
      return () => win.cancelIdleCallback(handle);
    } else {
      const id = setTimeout(() => setReady(true), 300);
      return () => clearTimeout(id);
    }
  }, []);

  if (!ready) return null;

  return (
    <Suspense fallback={null}>
      <Footer />
      <AIChatWidget />
    </Suspense>
  );
}

function useAnalytics() {
  const { pathname } = useLocation();

  useEffect(() => {
    initAnalytics();
    return installClickTracking();
  }, []);

  useEffect(() => {
    // Let react-helmet update document.title before the page view is recorded.
    const id = setTimeout(() => trackPageView(pathname), 300);
    return () => clearTimeout(id);
  }, [pathname]);
}

/** Alternates the two page shades (see `[data-shade]` in index.css) across top-level sections and the footer. */
function useAlternatingShades() {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;

    const apply = () => {
      let index = 0;
      root.querySelectorAll<HTMLElement>('main section, footer').forEach((el) => {
        if (el.parentElement?.closest('section, footer')) return;
        const shade = index++ % 2 === 0 ? 'a' : 'b';
        if (el.dataset.shade !== shade) el.dataset.shade = shade;
      });
    };

    apply();
    // Lazy sections and route changes add nodes later; observer callbacks run before paint.
    const observer = new MutationObserver(apply);
    observer.observe(root, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return ref;
}

export default function MainLayout({ children }: { children: ReactNode }) {
  useAnalytics();
  const shadeRootRef = useAlternatingShades();

  return (
    <div ref={shadeRootRef} className="relative min-h-screen w-full">
      <BrandIconGradientDefs />
      <div className="relative flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex flex-col">
          {children}
        </main>
        <DeferredChrome />
      </div>
    </div>
  );
}
