import { Helmet } from 'react-helmet-async';
import TechHero from '../components/sections/TechHero';
import TechLayers from '../components/sections/TechLayers';
import TechWhyUs from '../components/sections/TechWhyUs';
import TechDelivery from '../components/sections/TechDelivery';

export default function TechStack() {
  return (
    <>
      <Helmet>
        <title>Technologies | OrbitDevStudio</title>
        <meta name="description" content="The cutting-edge engineering stack we use to build highly scalable digital products." />
      </Helmet>
      
      <div className="relative min-h-screen bg-white">
        <TechHero />
        <div className="section-white">
          <TechLayers />
          <TechWhyUs />
          <TechDelivery />
        </div>
      </div>
    </>
  );
}
