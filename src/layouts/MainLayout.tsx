import { Suspense, lazy, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import Navbar from '../components/ui/Navbar';

const Footer = lazy(() => import('../components/ui/Footer'));

function DeferredFooter() {
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
    </Suspense>
  );
}

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen w-full">
      <div className="relative flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex flex-col">
          {children}
        </main>
        <DeferredFooter />
      </div>
    </div>
  );
}
