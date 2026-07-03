import { Helmet } from 'react-helmet-async';
import IndustriesHero from '../components/sections/IndustriesHero';
import IndustriesGrid from '../components/sections/IndustriesGrid';
import IndustriesShowcase from '../components/sections/IndustriesShowcase';
import IndustriesStory from '../components/sections/IndustriesStory';
import IndustriesTechClusters from '../components/sections/IndustriesTechClusters';
import IndustriesWhyUs from '../components/sections/IndustriesWhyUs';
import IndustriesFAQ from '../components/sections/IndustriesFAQ';

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
          <IndustriesFAQ />
        </div>

      </div>
    </>
  );
}
