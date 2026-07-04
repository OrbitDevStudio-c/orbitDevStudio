import { ArrowRight, MessageSquareText } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TechCTA() {
  return (
    <section className="bg-[#07111f] px-6 py-24 text-white md:px-12 lg:px-24">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-8 rounded-lg border border-white/10 bg-white/[0.04] p-8 md:p-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/20 text-blue-200">
            <MessageSquareText size={24} />
          </div>
          <h2 className="text-3xl font-bold tracking-normal md:text-5xl">Need help choosing the right stack?</h2>
          <p className="mt-4 text-lg leading-8 text-slate-300">
            Tell us what you are building and we will map the technical approach, timeline, and launch path.
          </p>
        </div>

        <Link
          to="/contact"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-slate-950 transition-colors hover:bg-slate-100"
        >
          Contact Us
          <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}
