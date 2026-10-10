import { ArrowRight } from 'lucide-react';
import PageHero from './PageHero';
import WorkFigure from '../hero-figures/WorkFigure';

export default function PortfolioHero() {
  return (
    <PageHero
      eyebrow="Our Portfolio"
      title="Digital"
      highlight="excellence in action."
      description="Explore a curated selection of our most impactful projects. From high-converting e-commerce platforms to sophisticated enterprise architecture, see how we translate complex requirements into beautiful, scalable realities."
      actions={
        <button
          type="button"
          onClick={() => {
            document.getElementById('portfolio-grid')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="btn-primary inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3.5 font-semibold"
        >
          View Projects
          <ArrowRight size={18} />
        </button>
      }
      figure={<WorkFigure />}
    />
  );
}
