import { Helmet } from 'react-helmet-async';
import IndustriesHero from '../components/sections/IndustriesHero';
import IndustriesGrid from '../components/sections/IndustriesGrid';
import IndustriesShowcase from '../components/sections/IndustriesShowcase';
import IndustriesStory from '../components/sections/IndustriesStory';
import IndustriesTechClusters from '../components/sections/IndustriesTechClusters';
import IndustriesWhyUs from '../components/sections/IndustriesWhyUs';
import IndustriesTestimonials from '../components/sections/IndustriesTestimonials';
import IndustriesFAQ from '../components/sections/IndustriesFAQ';
import IndustriesCTA from '../components/sections/IndustriesCTA';

export default function Industries() {
  return (
    <>
      <Helmet>
        <title>Industries | OrbitDevStudio</title>
        <meta name="description" content="Custom digital solutions tailored for various industries." />
      </Helmet>
      
      <div className="relative min-h-screen bg-white overflow-hidden">
        
        <IndustriesHero />
        
        <div className="section-white">
          <IndustriesGrid />
          <IndustriesShowcase />
          <IndustriesStory />
          <IndustriesTechClusters />
          <IndustriesWhyUs />
          <IndustriesTestimonials />
          <IndustriesFAQ />
          <IndustriesCTA />
        </div>

      </div>
    </>
  );
}
