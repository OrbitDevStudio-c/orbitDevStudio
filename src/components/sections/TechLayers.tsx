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
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#0f172a] mb-6"
          >
            We build every <br />
            <span className="text-[#2E5BE5]">layer of your product.</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 leading-relaxed max-w-2xl"
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
              className="w-full bg-gradient-to-r from-[#121F45] to-[#1C419C] rounded-2xl md:rounded-3xl p-8 md:p-12 shadow-xl shadow-blue-900/10 border border-white/10 flex flex-col lg:flex-row gap-10 lg:gap-16 items-start lg:items-center relative overflow-hidden group hover:from-[#152554] hover:to-[#224EB5] transition-all duration-500"
            >
              {/* Decorative subtle gradient blob */}
              <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 group-hover:bg-white/10 transition-colors duration-700 pointer-events-none" />

              {/* Left Side: Content */}
              <div className="flex-1 text-white relative z-10 w-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm shadow-inner">
                    <layer.icon size={20} className="text-blue-200" />
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
                
                <p className="text-[15px] leading-relaxed text-blue-100/70 font-normal max-w-lg">
                  {layer.description}
                </p>
              </div>

              {/* Right Side: Technologies Grid */}
              <div className="w-full lg:w-auto relative z-10">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4 lg:min-w-[450px]">
                  {layer.technologies.map((tech) => (
                    <div 
                      key={tech}
                      className="px-4 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center text-center hover:bg-white/10 hover:border-white/30 transition-all cursor-default"
                    >
                      <span className="text-[11px] font-bold tracking-wider text-white/90 uppercase text-center w-full">
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
