import { motion } from 'framer-motion';

export default function AboutStory() {
  return (
    <section className="bg-navy-deep py-16 md:py-20 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col max-w-lg"
          >
            <span className="text-[11px] font-bold tracking-[0.22em] text-accent uppercase block mb-3">
              OUR ORIGIN STORY
            </span>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-white light:text-slate-900 mb-5 leading-[1.2]">
              Built by engineers, for <span className="text-gradient-blue">forward-thinking</span> businesses.
            </h2>

            <div className="origin-accent-line mb-6" />

            <div className="space-y-4 text-[14px] origin-body leading-relaxed">
              <p>
                OrbitDevStudio was founded on a simple premise: businesses shouldn't have to choose between fast delivery and robust, scalable architecture. In an industry flooded with rushed templates and fragile codebases, we set out to build digital products that last.
              </p>
              <p>
                What started as a small team of passionate senior engineers has grown into a premier development studio. Over the years, we've helped startups scale to millions of users, modernized legacy enterprise systems, and launched high-converting digital storefronts.
              </p>
              <p>
                Our philosophy is rooted in engineering excellence and radical transparency. We believe in writing clean code, maintaining open lines of communication, and treating every client's product as if it were our own.
              </p>
            </div>
          </motion.div>

          {/* Right: Images Composition */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative h-[320px] sm:h-[380px] md:h-[480px] w-full"
          >
            {/* Ambient blue glow behind the composition */}
            <div
              className="origin-blob absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] rounded-full -z-10"
              aria-hidden="true"
            />

            {/* Faint orbital ring — subtle nod to the brand, not a space illustration */}
            <div
              className="origin-orbit-ring absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] rounded-full -z-10"
              style={{ animation: 'ring-spin 120s linear infinite' }}
              aria-hidden="true"
            />

            {/* Main large image */}
            <div className="origin-frame origin-frame--primary absolute right-0 top-0 w-3/4 h-[78%] rounded-3xl overflow-hidden z-10">
              <img
                src="/about-story-1.webp"
                alt="OrbitDevStudio team collaborating"
                className="origin-frame-img"
                loading="lazy"
                decoding="async"
                width={500}
                height={400}
              />
            </div>

            {/* Secondary overlapping image */}
            <div className="origin-frame origin-frame--secondary absolute left-0 bottom-0 w-[52%] h-[52%] rounded-3xl overflow-hidden z-20">
              <img
                src="/developer-working.webp"
                alt="Developer writing code"
                className="origin-frame-img"
                loading="lazy"
                decoding="async"
                width={300}
                height={300}
              />
            </div>

            {/* Floating badge */}
            <div className="origin-badge absolute right-[6%] bottom-[10%] z-30 flex items-center gap-3">
              <div className="origin-badge-circle">
                50+
              </div>
              <div className="flex flex-col">
                <span className="origin-badge-title text-[13px] font-bold">Global Experts</span>
                <span className="origin-badge-sub text-[9px] font-bold tracking-wider uppercase">In-house</span>
              </div>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
