import { motion } from 'framer-motion';
import { ArrowRight, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';
import GradientIcon from '../ui/GradientIcon';

interface CaseStudyCTAProps {
  heading?: string;
  body?: string;
  secondary?: { to: string; label: string; track: string };
  /** `data-track-location` for the buttons. */
  trackLocation?: string;
}

/** Closing CTA for the case study pages, mirroring the Services CTA. */
export default function CaseStudyCTA({
  heading = 'Have a Project Like This in Mind?',
  body = "Tell us what you're building. We'll scope it with you and propose the right stack, team and plan to ship it.",
  secondary,
  trackLocation = 'case-study',
}: CaseStudyCTAProps) {
  return (
    <section aria-labelledby="case-study-cta-heading" className="bg-[#101A2D] relative w-full overflow-hidden py-24 md:py-32">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-full bg-[radial-gradient(circle,_rgba(22,119,255,0.1)_0%,_transparent_70%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center"
      >
        <GradientIcon icon={Rocket} size={36} boxClassName="mb-8 h-20 w-20 rounded-2xl" />

        <h2 id="case-study-cta-heading" className="mb-6 text-3xl font-bold tracking-tight text-white light:text-slate-900 md:text-5xl">
          {heading}
        </h2>

        <p className="mx-auto mb-10 max-w-2xl text-[16px] leading-relaxed text-[#C7D2E4] light:text-slate-600 md:text-[18px]">
          {body}
        </p>

        <div className="flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row">
          <Link
            to="/hire"
            data-track="start_project"
            data-track-location={trackLocation}
            className="btn-primary group flex w-full items-center justify-center gap-2.5 rounded-xl px-7 py-3.5 text-sm font-bold sm:w-auto"
          >
            Start Your Project
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>

          {secondary && (
            <Link
              to={secondary.to}
              data-track={secondary.track}
              data-track-location={trackLocation}
              className="flex w-full justify-center rounded-xl border border-white/15 px-7 py-3.5 text-sm font-bold text-white light:border-slate-300 light:text-slate-900 transition-all hover:border-white/30 hover:bg-white/[0.04] sm:w-auto"
            >
              {secondary.label}
            </Link>
          )}
        </div>
      </motion.div>
    </section>
  );
}
