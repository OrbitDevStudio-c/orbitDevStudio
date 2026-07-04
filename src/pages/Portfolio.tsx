import { Helmet } from 'react-helmet-async';
import PortfolioHero from '../components/sections/PortfolioHero';
import PortfolioGrid from '../components/sections/PortfolioGrid';

export default function Portfolio() {
  return (
    <>
      <Helmet>
        <title>Portfolio | OrbitDevStudio</title>
        <meta name="description" content="OrbitDevStudio - Digital excellence in action. Explore our portfolio of premium web experiences." />
      </Helmet>
      
      <div className="relative min-h-screen bg-white">
        <PortfolioHero />
        <div className="section-white">
          <PortfolioGrid />
        </div>
      </div>
    </>
  );
}
