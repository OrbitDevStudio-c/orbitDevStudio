import { Helmet } from 'react-helmet-async';
import Hero from '../components/sections/Hero';
import StoryStats from '../components/sections/StoryStats';
import TechStackMarquee from '../components/sections/TechStackMarquee';
import FeaturedProjects from '../components/sections/FeaturedProjects';
import Industries from '../components/sections/Industries';
import Testimonials from '../components/sections/Testimonials';
import ProcessTimeline from '../components/sections/ProcessTimeline';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>OrbitDevStudio | Premium Digital Agency & Software Engineering</title>
        <meta name="description" content="OrbitDevStudio - Engineering premium software solutions, breathtaking aesthetics, and scalable architectures for tomorrow's leading enterprises." />
      </Helmet>
      
      <main className="w-full">
        <Hero />
        <StoryStats />
        <TechStackMarquee />
        <FeaturedProjects />
        <ProcessTimeline />
        <Testimonials />
      </main>
    </>
  );
}
