import { CheckCircle2 } from 'lucide-react';

const principles = [
  'Pick proven tools before trendy tools.',
  'Design the database model before the UI becomes expensive to change.',
  'Keep deployment, monitoring, and rollback paths clear from day one.',
  'Use automation where it saves time without making the product harder to own.',
];

export default function TechPhilosophy() {
  return (
    <section className="bg-slate-50 px-6 py-24 text-slate-950 md:px-12 lg:px-24">
      <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-accent">Engineering Standard</p>
          <h2 className="text-3xl font-bold tracking-normal md:text-5xl">Built for launch day and the years after it.</h2>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-6 md:p-8">
          <p className="text-lg leading-8 text-slate-600">
            A good stack is not just a list of tools. It decides how fast your product can change, how stable it feels under traffic, and how easily another engineer can understand it later.
          </p>

          <div className="mt-8 grid gap-4">
            {principles.map((principle) => (
              <div key={principle} className="flex gap-3 rounded-lg bg-slate-50 p-4">
                <CheckCircle2 className="mt-0.5 shrink-0 text-accent" size={20} />
                <p className="text-sm font-semibold leading-6 text-slate-700">{principle}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
