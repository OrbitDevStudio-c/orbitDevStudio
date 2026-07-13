import { motion } from 'framer-motion';
import { FileText, Users, Handshake, Code2 } from 'lucide-react';

const steps = [
  {
    num: 1,
    icon: FileText,
    title: 'Share Your Requirements',
    description: 'Provide details about your project, goals, and technical expectations so our team can clearly understand your business needs.'
  },
  {
    num: 2,
    icon: Users,
    title: 'Technical Consultation',
    description: 'Our experts review your requirements, discuss the project scope, and recommend the best technologies and development approach.'
  },
  {
    num: 3,
    icon: Handshake,
    title: 'Choose Engagement Model',
    description: 'Select the hiring model that fits your project timeline, budget, and development requirements.'
  },
  {
    num: 4,
    icon: Code2,
    title: 'Development Begins',
    description: 'Once everything is finalized, our developers integrate with your team and begin building your solution using agile development practices.'
  }
];

export default function HireProcess() {
  return (
<section className="bg-[#101A2D] py-16 md:py-20 relative overflow-hidden">
  <div className="max-w-[1400px] mx-auto px-6">

    {/* Header */}
    <div className="text-center max-w-3xl mx-auto mb-20 md:mb-32">
      <span className="text-[10px] font-bold tracking-[0.2em] text-accent uppercase block mb-3">
        SIMPLE PROCESS
      </span>

      <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
        How We Work
      </h2>

      <div className="w-16 h-1.5 bg-accent mx-auto mb-8 rounded-full" />

      <p className="text-[15px] text-[#C7D2E4] leading-relaxed max-w-2xl mx-auto">
        Our streamlined development workflow ensures transparency,
        efficiency, and faster project delivery. From understanding your
        requirements to launching your solution, our team follows a
        structured process designed to turn your ideas into high-quality
        digital products.
      </p>
    </div>

    {/* Timeline */}
    <div className="relative">

      {/* Horizontal Line Background (Desktop) */}
     <div className="hidden md:block absolute top-[60px] left-[10%] right-[10%] z-0">

  <div className="h-[2px] w-full bg-white/5 rounded-full" />

  <motion.div
    initial={{ width: 0 }}
    whileInView={{ width: "100%" }}
    viewport={{ once: true }}
    transition={{ duration: 2 }}
    className="absolute top-0 left-0 h-[2px] rounded-full
    bg-gradient-to-r
    from-[#3B6FE0]
    via-[#7C5CFF]
    to-[#00D4FF]
    shadow-[0_0_20px_rgba(79,140,255,0.9)]"
  />

  <motion.div
    initial={{ x: "0%" }}
    whileInView={{ x: "100%" }}
    viewport={{ once: true }}
    transition={{ duration: 2 }}
    className="absolute -top-[7px] w-4 h-4 rounded-full
    bg-accent
    shadow-[0_0_25px_#3B6FE0]"
  />
</div>

      {/* Vertical Line Background (Mobile) */}
      <div className="block md:hidden absolute left-[50px] top-[10%] bottom-[10%] w-[2px] bg-white/5 z-0" />

      {/* Vertical Line Animated Fill (Mobile) */}
      <motion.div
        initial={{ height: 0 }}
        whileInView={{ height: "80%" }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
        className="block md:hidden absolute left-[50px] top-[10%] w-[2px] bg-accent z-0"
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6 relative z-10">
        {steps.map((step, index) => (
          <motion.div
            key={step.num}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
            className="flex flex-row md:flex-col items-center md:text-center gap-6 md:gap-8 group"
          >
            {/* Icon Circle */}
            <div className="relative">

              {/* Number Badge */}
              <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center text-[10px] font-bold z-20 border-2 border-[#101A2D] shadow-[0_0_10px_rgba(79,140,255,0.3)]">
                {step.num}
              </div>

              {/* Circle */}
              <div className="w-[100px] h-[100px] rounded-full bg-white/[0.02] border border-white/10 flex items-center justify-center shadow-[0_0_0_4px_rgba(16,26,45,1),0_0_0_8px_rgba(79,140,255,0.15)] group-hover:scale-110 group-hover:bg-accent/10 group-hover:border-accent/30 group-hover:shadow-[0_0_0_4px_rgba(16,26,45,1),0_0_0_12px_rgba(79,140,255,0.25)] transition-all duration-500 relative z-10 shrink-0">
                <step.icon
                  size={32}
                  className="text-accent"
                  strokeWidth={1.5}
                />
              </div>
            </div>

            {/* Text Content */}
            <div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-3">
                {step.title}
              </h3>

              <p className="text-sm leading-relaxed text-[#94A3B8] max-w-[280px] mx-auto">
                {step.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>

  </div>
</section>
  );
}
