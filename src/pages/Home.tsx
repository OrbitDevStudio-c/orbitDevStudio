import { Suspense, lazy, useEffect, useState } from 'react';
import Hero from '../components/sections/Hero';

const StoryStats = lazy(() => import('../components/sections/StoryStats'));
const TechStackMarquee = lazy(() => import('../components/sections/TechStackMarquee'));
const FeaturedProjects = lazy(() => import('../components/sections/FeaturedProjects'));
const ProcessTimeline = lazy(() => import('../components/sections/ProcessTimeline'));
const Testimonials = lazy(() => import('../components/sections/Testimonials'));

function DeferredHomeSections() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const win = window as any;
    if ('requestIdleCallback' in win) {
      const handle = win.requestIdleCallback(() => setReady(true), { timeout: 2000 });
      return () => win.cancelIdleCallback(handle);
    } else {
      const id = setTimeout(() => setReady(true), 200);
      return () => clearTimeout(id);
    }
  }, []);

  if (!ready) return null;

  return (
    <Suspense fallback={null}>
      <StoryStats />
      <TechStackMarquee />
      <FeaturedProjects />
      <ProcessTimeline />
      <Testimonials />
    </Suspense>
  );
}

import SEO from '../components/ui/SEO';
import { getRouteMeta } from '../config/routes';

const meta = getRouteMeta('/')!;

export default function Home() {
  return (
    <>
      <SEO {...meta} />
      
      <main className="w-full">
        <Hero />
        <DeferredHomeSections />
      </main>
    </>
  );
}
