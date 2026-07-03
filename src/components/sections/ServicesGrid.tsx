import { Smartphone, Monitor, Lightbulb, TerminalSquare, Cpu, LineChart, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const services = [
  {
    icon: <Smartphone size={22} className="text-[#244CB3]" />,
    title: "Mobile Application Development",
    desc: "We build high-performance native and cross-platform mobile apps for iOS and Android that combine pixel-perfect design with blazing-fast performance. From consumer apps to enterprise mobility solutions, every product we ship is engineered for scale and user delight."
  },
  {
    icon: <Monitor size={22} className="text-[#244CB3]" />,
    title: "Web Application Engineering",
    desc: "Our engineers deliver full-stack web applications — from SaaS dashboards and customer portals to complex e-commerce platforms and internal tools. Every solution is architected for performance, accessibility, and long-term maintainability using modern frameworks."
  },
  {
    icon: <Lightbulb size={22} className="text-[#244CB3]" />,
    title: "UX/UI & Product Design",
    desc: "We craft intuitive digital experiences through research-backed UX strategy, modern UI design systems, and interactive prototyping. Every design decision is grounded in user behavior data and aligned with your brand identity to maximize engagement and conversions."
  },
  {
    icon: <TerminalSquare size={22} className="text-[#244CB3]" />,
    title: "Custom Software Solutions",
    desc: "We develop bespoke software systems precisely aligned with your business workflows — from automation engines and enterprise platforms to data pipelines and legacy modernization projects. Built to scale, maintained to last."
  },
  {
    icon: <Cpu size={22} className="text-[#244CB3]" />,
    title: "AI & Emerging Technology",
    desc: "We integrate AI, machine learning, intelligent automation, and IoT capabilities into your products, helping you unlock operational efficiency, smarter decision-making, and new revenue opportunities through cutting-edge technology."
  },
  {
    icon: <LineChart size={22} className="text-[#244CB3]" />,
    title: "Digital Marketing & Growth Engineering",
    desc: "From SEO and paid acquisition to conversion rate optimization and marketing automation, we build data-driven growth strategies that increase your qualified traffic, lower customer acquisition costs, and accelerate revenue."
  },
  {
    icon: <ShieldCheck size={22} className="text-[#244CB3]" />,
    title: "Quality Assurance & Testing",
    desc: "We implement comprehensive QA strategies including unit testing, integration testing, end-to-end automation, and performance benchmarking. Every release goes through rigorous validation to guarantee reliability, security, and a flawless user experience."
  }
];

export default function ServicesGrid() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto w-full relative z-10">
      
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1a2b4b] mb-4">
          Everything Your Digital Product Needs, Under One Roof
        </h2>
        <div className="w-16 h-1 bg-[#2E5BE5] mx-auto rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-2xl p-8 border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#244CB3]/5 flex items-center justify-center border border-[#244CB3]/10">
                {service.icon}
              </div>
              <h3 className="text-[17px] font-bold text-[#1a2b4b]">{service.title}</h3>
            </div>
            <p className="text-slate-500 text-[13px] leading-relaxed">
              {service.desc}
            </p>
          </motion.div>
        ))}

        {/* CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="bg-gradient-to-br from-[#1C3E96] to-[#132A66] rounded-2xl p-8 shadow-xl flex flex-col justify-center items-center text-center relative overflow-hidden"
        >
          {/* Decorative shapes inside CTA */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4" />

          <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 relative z-10">
            Ready to Build Something Great?
          </h3>
          <p className="text-white/80 text-[13px] leading-relaxed mb-6 max-w-sm relative z-10">
            Have an idea or project in mind? Our team is ready to help you turn your concept into a powerful digital solution.
          </p>
          <Link 
            to="/contact"
            className="px-6 py-3 rounded-xl bg-white text-[#1C3E96] font-bold text-[13px] hover:bg-slate-50 transition-colors inline-flex items-center gap-2 shadow-lg relative z-10 w-full sm:w-auto justify-center"
          >
            Request a Free Quote <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
