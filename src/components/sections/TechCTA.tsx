import { ArrowRight, MessageSquareText } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TechCTA() {
  return (
    <section className="bg-[#101A2D] px-6 py-16 md:py-20 text-white md:px-12 lg:px-24">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-10 rounded-3xl border border-white/10 bg-gradient-to-r from-[#0B1220] to-[#101A2D] p-10 md:p-14 lg:flex-row lg:items-center lg:justify-between shadow-[0_20px_50px_rgba(0,0,0,0.4)] relative overflow-hidden">
        {/* Decorative subtle glow */}
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#4F8CFF]/10 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="max-w-2xl relative z-10">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.03] text-[#4F8CFF] border border-white/5 shadow-inner">
            <MessageSquareText size={28} />
          </div>
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl text-white mb-4">Need help choosing the right stack?</h2>
          <p className="text-lg leading-relaxed text-[#C7D2E4] font-light">
            Tell us what you are building and we will map the technical approach, timeline, and launch path.
          </p>
        </div>

        <Link
          to="/contact"
          className="relative z-10 inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-accent px-8 py-4 font-bold text-slate-950 transition-all hover:bg-accent/90 shadow-[0_4px_15px_rgba(79,140,255,0.3)] hover:shadow-[0_6px_25px_rgba(79,140,255,0.5)] hover:-translate-y-0.5"
        >
          Contact Us
          <ArrowRight size={20} />
        </Link>
      </div>
    </section>
  );
}
