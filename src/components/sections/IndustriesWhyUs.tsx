import { motion } from "framer-motion";
import {
  CalendarClock,
  Target,
  Briefcase,
  Cpu,
  ShieldCheck,
  Zap,
  Bot,
  Layers,
} from "lucide-react";

const whyUsItems = [
  {
    id: "experience",
    icon: <CalendarClock size={20} className="text-[#2E5BE5]" />,
    title: "4+ Years Experience",
    desc: "Delivering high-end engineering solutions consistently.",
    className:
      "col-span-1 md:col-span-2 lg:col-span-2 bg-[#0F172A]",
  },
  {
    id: "delivery",
    icon: <Target size={20} className="text-[#52C854]" />,
    title: "99.9%",
    subtitle: "Delivery Rate",
    desc: "On time and exactly to specification.",
    className:
      "col-span-1 md:col-span-1 lg:col-span-1 bg-[#132A1C] border-[#52C854]/20",
    isDark: true,
  },
  {
    id: "projects",
    icon: <Briefcase size={20} className="text-[#F6B73C]" />,
    title: "50+",
    subtitle: "Projects Shipped",
    desc: "From startups to enterprise.",
    className:
      "col-span-1 md:col-span-1 lg:col-span-1 bg-[#0F172A]",
  },
  {
    id: "architecture",
    icon: <Cpu size={20} className="text-[#B08CFF]" />,
    title: "Modern Architecture",
    desc:
      "Headless, microservices, and serverless infrastructures built to scale infinitely.",
    className:
      "col-span-1 md:col-span-1 lg:col-span-1 bg-[#0F172A]",
  },
  {
    id: "security",
    icon: <ShieldCheck size={20} className="text-[#4F8CFF]" />,
    title: "Enterprise Security",
    desc:
      "Bank-grade encryption, SOC2 compliance readiness, and zero-trust data protection.",
    className:
      "col-span-1 md:col-span-2 lg:col-span-2 bg-[#050B14] border-white/10",
    isDark: true,
  },
  {
    id: "support",
    icon: <Zap size={20} className="text-[#F36B6B]" />,
    title: "Fast Support",
    desc: "24/7 dedicated engineering SLAs.",
    className:
      "col-span-1 md:col-span-1 lg:col-span-1 bg-[#0F172A]",
  },
  {
    id: "ai",
    icon: <Bot size={20} className="text-[#2E5BE5]" />,
    title: "AI Ready",
    desc:
      "Seamlessly integrate LLMs, computer vision, and predictive analytics into your core product.",
    className:
      "col-span-1 md:col-span-2 lg:col-span-2 bg-[#0F172A]",
  },
  {
    id: "scale",
    icon: <Layers size={20} className="text-[#0f172a]" />,
    title: "Scalable Systems",
    desc:
      "Architected to handle sudden viral traffic spikes effortlessly.",
    className:
      "col-span-1 md:col-span-2 lg:col-span-2 bg-[#0F172A]",
  },
];

export default function IndustriesWhyUs() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto w-full relative z-10">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
          Why Clients Choose Us
        </h2>

        <p className="text-white/70 text-[16px] leading-relaxed">
          We combine the speed of a startup with the rigorous engineering
          standards of enterprise tech giants.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 auto-rows-[200px] gap-6">
        {whyUsItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className={`group relative overflow-hidden rounded-[24px] p-6 border ${
              item.isDark
                ? "border-transparent shadow-xl"
                : "border-slate-700 shadow-sm hover:shadow-xl"
            } hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between ${item.className}`}
          >
            {item.isDark && (
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/5 rounded-full blur-[40px] group-hover:bg-white/10 transition-colors duration-500" />
            )}

            <div className="relative z-10">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 bg-white/10 transition-transform duration-300 group-hover:scale-110">
                {item.icon}
              </div>

              <h3 className="text-2xl font-bold tracking-tight mb-1 text-white">
                {item.title}
              </h3>

              {item.subtitle && (
                <div className="text-xs font-semibold uppercase tracking-[0.18em] mb-2 text-white/60">
                  {item.subtitle}
                </div>
              )}
            </div>

            <p className="relative z-10 text-sm leading-relaxed max-w-[90%] text-white/80">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}