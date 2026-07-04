import { Helmet } from 'react-helmet-async';
import AboutHero from '../components/sections/AboutHero';
import AboutStory from '../components/sections/AboutStory';
import AboutStats from '../components/sections/AboutStats';
import AboutValues from '../components/sections/AboutValues';

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Us | OrbitDevStudio</title>
        <meta name="description" content="Learn about OrbitDevStudio, our origin story, and the core values that drive our engineering excellence." />
      </Helmet>
      
      <div className="relative min-h-screen bg-white">
        <AboutHero />
        
        <div className="section-white">
          <AboutStory />
        </div>
        
        <AboutStats />
        
        <div className="section-white">
          <AboutValues />
        </div>
      </div>
    </>
  );
}
