import { Helmet } from 'react-helmet-async';
import HireHero from '../components/sections/HireHero';
import HireProcess from '../components/sections/HireProcess';
import HireModels from '../components/sections/HireModels';
import HireWhyUs from '../components/sections/HireWhyUs';
import HireSkills from '../components/sections/HireSkills';
import HireForm from '../components/sections/HireForm';

export default function HireUs() {
  return (
    <>
      <Helmet>
        <title>Hire Dedicated Talent | OrbitDevStudio</title>
        <meta name="description" content="Augment your team with elite engineering talent. Flexible hiring models tailored for your project." />
      </Helmet>
      
      <div className="relative min-h-screen bg-white">
        <HireHero />
        
        <div className="section-white">
          <HireProcess />
          <HireModels />
          <HireWhyUs />
          <HireSkills />
          <HireForm />
        </div>
      </div>
    </>
  );
}
