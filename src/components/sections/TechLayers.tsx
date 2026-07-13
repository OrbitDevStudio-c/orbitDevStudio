import { motion } from 'framer-motion';
import { Smartphone, Database, Server, Layout } from 'lucide-react';

const layers = [
  {
    id: 'mobile',
    title: 'Mobile Development',
    icon: Smartphone,
    description: 'We craft native and cross-platform mobile applications that deliver pixel-perfect UX, blazing-fast performance, and seamless offline capabilities across iOS and Android devices.',
    technologies: ['iOS (SWIFT)', 'ANDROID (KOTLIN)', 'REACT NATIVE', 'FLUTTER', 'EXPO', 'FIREBASE']
  },
  {
    id: 'database',
    title: 'Database & Storage',
    icon: Database,
    description: 'From high-throughput transactional systems to flexible NoSQL stores, we architect data layers that remain performant, secure, and elastically scalable under any workload.',
    technologies: ['POSTGRESQL', 'MONGODB', 'MYSQL', 'REDIS', 'MARIADB', 'SQLITE']
  },
  {
    id: 'backend',
    title: 'Back-end & APIs',
    icon: Server,
    description: 'We engineer robust microservices, serverless architectures, and scalable APIs that form the reliable, secure, and high-performance backbone of your digital product ecosystem.',
    technologies: ['NODE.JS', 'PYTHON', 'JAVA', 'C# / .NET', 'GO', 'GRAPHQL']
  },
  {
    id: 'frontend',
    title: 'Front-end & UI',
    icon: Layout,
    description: 'Our front-end engineers build responsive, accessible design systems and performant web experiences that convert visitors into users — from landing pages to complex SaaS dashboards.',
    technologies: ['REACT', 'NEXT.JS', 'VUE', 'ANGULAR', 'TYPESCRIPT', 'TAILWIND CSS']
  }
];

export default function TechLayers() {
  return (
    <section className="bg-[#101A2D] py-16 md:py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="max-w-3xl mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[white] mb-6"
          >
            We build every <br />
            <span className="text-white">layer of your product.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-[#94A3B8] leading-relaxed max-w-2xl"
          >
            We don't just use the latest frameworks — we deeply understand them. Our
            engineers integrate the right stack into your existing infrastructure to maximize
            velocity, resilience, and long-term maintainability.
          </motion.p>
        </div>

        {/* Cards Stack */}
        <div className="space-y-6">
          {layers.map((layer, index) => (
            <motion.div
              key={layer.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="w-full bg-[#152037]/80 backdrop-blur-xl rounded-2xl md:rounded-3xl p-8 md:p-14 shadow-[0_10px_40px_rgba(0,0,0,0.3)] border border-white/10 flex flex-col lg:flex-row gap-10 lg:gap-16 items-start lg:items-center relative overflow-hidden group hover:shadow-[0_20px_50px_rgba(0,0,0,0.4),0_0_30px_rgba(79,140,255,0.15)] hover:border-white/20 hover:-translate-y-1 transition-all duration-500"
            >
              {/* Decorative subtle gradient blob */}
              <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-[#4F8CFF]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 group-hover:bg-[#4F8CFF]/20 transition-colors duration-700 pointer-events-none" />

              {/* Left Side: Content */}
              <div className="flex-1 text-white relative z-10 w-full">
                <div className="flex items-center gap-5 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center backdrop-blur-md group-hover:border-[#4F8CFF]/50 group-hover:bg-[#4F8CFF]/20 group-hover:shadow-[0_0_20px_rgba(79,140,255,0.3)] transition-all duration-500 shadow-inner">
                    <layer.icon size={26} className="text-[#4F8CFF]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold tracking-[0.2em] text-white/50 uppercase block mb-1">
                      CAPABILITY
                    </span>
                    <h3 className="text-2xl font-semibold tracking-tight text-white">
                      {layer.title}
                    </h3>
                  </div>
                </div>

                <p className="text-[15px] leading-relaxed text-[#C7D2E4] font-light max-w-lg">
                  {layer.description}
                </p>
              </div>

              {/* Right Side: Technologies Grid */}
              <div className="w-full lg:w-auto relative z-10">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4 lg:min-w-[450px]">
                  {layer.technologies.map((tech) => (
                    <div
                      key={tech}
                      className="px-5 py-4 rounded-xl border border-white/10 bg-white/[0.05] backdrop-blur-md flex items-center justify-center text-center hover:bg-white/[0.1] hover:border-[#4F8CFF] hover:shadow-[0_4px_20px_rgba(79,140,255,0.25)] hover:-translate-y-1 transition-all duration-300 cursor-default relative overflow-hidden"
                    >
                      <span className="text-[12px] font-bold tracking-[0.15em] text-[#C7D2E4] group-hover:text-white uppercase text-center w-full transition-colors">
                        {tech}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
