import { Helmet } from 'react-helmet-async';
import CareersHero from '../components/sections/CareersHero';
import CareersBenefits from '../components/sections/CareersBenefits';
import CareersOpenings from '../components/sections/CareersOpenings';

export default function Careers() {
  return (
    <>
      <Helmet>
        <title>Careers | OrbitDevStudio</title>
        <meta name="description" content="Join OrbitDevStudio and help us build the future of digital products. Explore our open roles and benefits." />
      </Helmet>
      
      <div className="relative min-h-screen bg-white">
        <CareersHero />
        
        <div className="section-white">
          <CareersBenefits />
          <CareersOpenings />
        </div>
      </div>
    </>
  );
}
