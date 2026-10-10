import PageHero from './PageHero';
import ServicesFigure from '../hero-figures/ServicesFigure';

export default function ServicesHero() {
  return (
    <PageHero
      eyebrow="Services"
      title={<>End-to-End Digital <br className="hidden sm:block" />Services</>}
      highlight="Engineered for Growth"
      description="From custom web and mobile applications to AI integration, cloud infrastructure, and performance marketing — Orbit Dev Studios delivers full-lifecycle digital solutions built with senior engineering talent, rigorous quality standards, and a relentless focus on measurable business outcomes."
      stats={[
        { value: '10+', label: 'Products Shipped' },
        { value: 'Free', label: 'Strategy Call' },
        { value: '15+', label: 'Technologies Mastered' },
      ]}
      figure={<ServicesFigure />}
    />
  );
}
