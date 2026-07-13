import { Zap, Server, Shield, HeartHandshake } from 'lucide-react';
import { motion } from 'framer-motion';

const benefits = [
  {
    icon: <Zap size={24} />,
    title: "Faster Delivery",
    desc: "Agile methodologies and automated pipelines ensure rapid feature deployment without sacrificing quality."
  },
  {
    icon: <Server size={24} />,
    title: "Scalable Architecture",
    desc: "Systems engineered to grow with your user base, preventing technical debt and costly rewrites."
  },
  {
    icon: <Shield size={24} />,
    title: "Enterprise Security",
    desc: "Bank-grade security protocols and rigorous compliance standards baked into every line of code."
  },
  {
    icon: <HeartHandshake size={24} />,
    title: "Long-Term Partnership",
    desc: "We function as an extension of your team, providing continuous support, maintenance, and strategic guidance."
  }
];

export default function ServicesBenefits() {
  return (
    <section className="bg-[#101A2D] py-24 px-6 md:px-12 lg:px-24 w-full relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
            Why Businesses Choose OrbitDevStudio
          </h2>
          <div className="w-16 h-1 bg-accent mx-auto rounded-full shadow-[0_0_10px_rgba(79,140,255,0.4)]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-dark group p-8 rounded-[24px] hover:shadow-[0_8px_30px_rgba(79,140,255,0.15)] flex flex-col items-start transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-6 border border-accent/20 group-hover:bg-accent group-hover:text-white group-hover:border-accent group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(79,140,255,0.3)] transition-all duration-300">
                {benefit.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-3 tracking-tight">
                {benefit.title}
              </h3>
              <p className="text-[#94A3B8] text-[14px] leading-relaxed">
                {benefit.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
