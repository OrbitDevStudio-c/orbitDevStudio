import PageHero from './PageHero';
import IndustriesFigure from '../hero-figures/IndustriesFigure';

export default function IndustriesHero() {
  return (
    <PageHero
      eyebrow="Industries"
      title="Empowering Industries with"
      highlight="Custom Solutions"
      description="From healthcare portals to interactive design portfolios and robust e-commerce platforms — OrbitDevStudio engineers highly specialized digital experiences tailored to the unique regulatory, operational, and aesthetic demands of your sector."
      stats={[
        { value: '7+', label: 'Core Industries' },
        { value: '100%', label: 'Customization' },
        { value: 'Scale', label: 'Built into DNA' },
      ]}
      figure={<IndustriesFigure />}
    />
  );
}
