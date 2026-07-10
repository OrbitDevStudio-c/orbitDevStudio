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
    <section className="py-24 md:py-32 bg-slate-50 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 md:mb-32">
          <span className="text-[10px] font-bold tracking-[0.2em] text-[#4F8CFF] uppercase block mb-3">
            SIMPLE PROCESS
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#0B1736] mb-6">
            How We Work
          </h2>
          <div className="w-16 h-1.5 bg-[#1B3675] mx-auto mb-8 rounded-full" />
          <p className="text-[15px] text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Our streamlined development workflow ensures transparency, efficiency, and faster project delivery. From understanding your requirements to launching your solution, our team follows a structured process designed to turn your ideas into high-quality digital products.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Horizontal Line Background (Desktop) */}
          <div className="hidden md:block absolute top-[60px] left-[10%] right-[10%] h-[2px] bg-blue-100 z-0" />
          
          {/* Horizontal Line Animated Fill (Desktop) */}
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: '80%' }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
            className="hidden md:block absolute top-[60px] left-[10%] h-[2px] bg-[#4F8CFF] z-0" 
          />

          {/* Vertical Line Background (Mobile) */}
          <div className="block md:hidden absolute left-[50px] top-[10%] bottom-[10%] w-[2px] bg-blue-100 z-0" />

          {/* Vertical Line Animated Fill (Mobile) */}
          <motion.div 
            initial={{ height: 0 }}
            whileInView={{ height: '80%' }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
            className="block md:hidden absolute left-[50px] top-[10%] w-[2px] bg-[#4F8CFF] z-0" 
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
                  <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-[#4F8CFF] text-white flex items-center justify-center text-[10px] font-bold z-20 border-2 border-white shadow-md">
                    {step.num}
                  </div>
                  
                  {/* Circle */}
                  <div className="w-[100px] h-[100px] rounded-full bg-white border-2 border-[#4F8CFF] flex items-center justify-center shadow-[0_0_0_4px_rgba(255,255,255,1),0_0_0_8px_rgba(79,140,255,0.1)] group-hover:scale-110 group-hover:shadow-[0_0_0_4px_rgba(255,255,255,1),0_0_0_12px_rgba(79,140,255,0.2)] transition-all duration-500 relative z-10 shrink-0">
                    <step.icon size={32} className="text-[#4F8CFF]" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Text Content */}
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-[#0B1736] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-500 max-w-[280px] mx-auto">
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
