import { Suspense, lazy, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/sections/Hero';

const StoryStats = lazy(() => import('../components/sections/StoryStats'));
const TechStackMarquee = lazy(() => import('../components/sections/TechStackMarquee'));
const FeaturedProjects = lazy(() => import('../components/sections/FeaturedProjects'));
const ProcessTimeline = lazy(() => import('../components/sections/ProcessTimeline'));
const Testimonials = lazy(() => import('../components/sections/Testimonials'));

function DeferredHomeSections() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setReady(true), 200);
    return () => window.clearTimeout(id);
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

export default function Home() {
  return (
    <>
      <Helmet>
        <title>OrbitDevStudio | Premium Digital Agency & Software Engineering</title>
        <meta name="description" content="OrbitDevStudio - Engineering premium software solutions, breathtaking aesthetics, and scalable architectures for tomorrow's leading enterprises." />
      </Helmet>
      
      <main className="w-full">
        <Hero />
        <DeferredHomeSections />
      </main>
    </>
  );
}
