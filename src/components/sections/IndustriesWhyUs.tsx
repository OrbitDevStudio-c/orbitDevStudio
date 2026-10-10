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
    icon: <CalendarClock size={20} className="brand-icon" />,
    title: "4+ Years Experience",
    desc: "Delivering high-end engineering solutions consistently.",
    className:
      "col-span-1 md:col-span-2 lg:col-span-2 bg-white/[0.02]",
  },
  {
    id: "delivery",
    icon: <Target size={20} className="brand-icon" />,
    title: "On-Spec",
    subtitle: "Delivery Focus",
    desc: "Clear milestones and regular check-ins keep delivery aligned with the agreed scope.",
    className:
      "col-span-1 md:col-span-1 lg:col-span-1 bg-[#101A2D] border-accent/20",
    isDark: true,
  },
  {
    id: "projects",
    icon: <Briefcase size={20} className="brand-icon" />,
    title: "50+",
    subtitle: "Projects Shipped",
    desc: "From startups to enterprise.",
    className:
      "col-span-1 md:col-span-1 lg:col-span-1 bg-white/[0.02]",
  },
  {
    id: "architecture",
    icon: <Cpu size={20} className="brand-icon" />,
    title: "Modern Architecture",
    desc:
      "Headless, microservices, and serverless infrastructures built to scale infinitely.",
    className:
      "col-span-1 md:col-span-1 lg:col-span-1 bg-white/[0.02]",
  },
  {
    id: "security",
    icon: <ShieldCheck size={20} className="brand-icon" />,
    title: "Enterprise Security",
    desc:
      "Encryption in transit and at rest, least-privilege access, and security-focused development practices.",
    className:
      "col-span-1 md:col-span-2 lg:col-span-2 bg-[#0B1220] border-white/5",
    isDark: true,
  },
  {
    id: "support",
    icon: <Zap size={20} className="brand-icon" />,
    title: "Fast Support",
    desc: "24/7 dedicated engineering SLAs.",
    className:
      "col-span-1 md:col-span-1 lg:col-span-1 bg-white/[0.02]",
  },
  {
    id: "ai",
    icon: <Bot size={20} className="brand-icon" />,
    title: "AI Ready",
    desc:
      "Seamlessly integrate LLMs, computer vision, and predictive analytics into your core product.",
    className:
      "col-span-1 md:col-span-2 lg:col-span-2 bg-white/[0.02]",
  },
  {
    id: "scale",
    icon: <Layers size={20} className="brand-icon" />,
    title: "Scalable Systems",
    desc:
      "Architected to handle sudden viral traffic spikes effortlessly.",
    className:
      "col-span-1 md:col-span-2 lg:col-span-2 bg-white/[0.02]",
  },
];

export default function IndustriesWhyUs() {
  return (
    <section className="bg-[#101A2D] w-full relative z-10 overflow-hidden">
      <div className="py-16 md:py-20 px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto w-full relative">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-white light:text-slate-900 mb-6 tracking-tight">
          Why Clients Choose Us
        </h2>

        <p className="text-[#C7D2E4] text-[16px] leading-relaxed">
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
                ? "border-transparent shadow-[0_8px_30px_rgba(22,119,255,0.1)]"
                : "border-white/5 shadow-sm hover:shadow-[0_8px_30px_rgba(22,119,255,0.15)] hover:border-accent/30"
            } hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between backdrop-blur-xl ${item.className}`}
          >
            {item.isDark && (
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/5 rounded-full blur-[40px] group-hover:bg-white/10 transition-colors duration-500" />
            )}

            <div className="relative z-10">
              <div className="brand-icon-wrap w-10 h-10 rounded-xl flex shrink-0 items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110 relative z-10">
                {item.icon}
              </div>

              <h3 className="text-2xl font-bold tracking-tight mb-1 text-white light:text-slate-900">
                {item.title}
              </h3>

              {item.subtitle && (
                <div className="text-xs font-semibold uppercase tracking-[0.18em] mb-2 text-white/60 light:text-slate-600">
                  {item.subtitle}
                </div>
              )}
            </div>

            <p className="relative z-10 text-sm leading-relaxed max-w-[90%] text-[#C7D2E4]">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
      </div>
    </section>
  );
}
