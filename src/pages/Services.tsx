import { Helmet } from 'react-helmet-async';
import ServicesHero from '../components/sections/ServicesHero';
import ServicesGrid from '../components/sections/ServicesGrid';
import ServicesDomains from '../components/sections/ServicesDomains';
import ServicesProcess from '../components/sections/ServicesProcess';

export default function Services() {
  return (
    <>
      <Helmet>
        <title>Services | OrbitDevStudio</title>
        <meta name="description" content="End-to-End Digital Services Engineered for Growth" />
      </Helmet>
      
      {/* Root container overrides dark theme */}
      <div className="relative min-h-screen bg-white">
        
        {/* Galaxy Blue Hero Section (Contains confined particles) */}
        <ServicesHero />
        
        {/* The rest of the page uses the graph-paper grid lines background */}
        <div className="section-white">
          <ServicesGrid />
          <ServicesDomains />
          <ServicesProcess />
        </div>

      </div>
    </>
  );
}
