import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Clock } from 'lucide-react';

const positions = [
  {
    id: 1,
    title: 'Senior Full Stack Engineer',
    department: 'Engineering',
    location: 'Remote (Global)',
    type: 'Full-time',
    description: 'We are looking for an experienced engineer with deep knowledge of React, Node.js, and AWS to lead the development of enterprise-scale applications.'
  },
  {
    id: 2,
    title: 'UI/UX Designer',
    department: 'Design',
    location: 'Remote (Global)',
    type: 'Full-time',
    description: 'Join our design team to craft beautiful, intuitive, and highly functional user interfaces for cutting-edge digital products.'
  },
  {
    id: 3,
    title: 'React Native Developer',
    department: 'Engineering',
    location: 'Ahmedabad, India / Remote',
    type: 'Full-time',
    description: 'Help us build robust and performant mobile applications for both iOS and Android using React Native and modern mobile architectures.'
  },
  {
    id: 4,
    title: 'Technical Project Manager',
    department: 'Product',
    location: 'Remote (Global)',
    type: 'Full-time',
    description: 'Lead agile sprints, interface directly with enterprise clients, and ensure our engineering teams deliver high-quality products on time.'
  }
];

export default function CareersOpenings() {
  return (
    <section id="open-positions" className="py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="max-w-[1000px] mx-auto px-6">
        
        <div className="text-center mb-16 md:mb-20">
          <span className="text-[10px] font-bold tracking-[0.2em] text-[#4F8CFF] uppercase block mb-3">
            CURRENT OPENINGS
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#1B3675] mb-6">
            Find your next role.
          </h2>
          <p className="text-[15px] text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Don't see a role that fits exactly? We're always open to meeting talented people. Send your resume to <a href="mailto:orbitdevstudio@zohomail.in" className="text-[#4F8CFF] font-semibold hover:underline">orbitdevstudio@zohomail.in</a>.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {positions.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group bg-white rounded-2xl border border-slate-200 p-6 md:p-8 hover:border-[#4F8CFF] hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 bg-blue-50 text-[#4F8CFF] text-[10px] font-bold uppercase tracking-wider rounded-full">
                    {job.department}
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-[#1B3675] mb-3 group-hover:text-[#4F8CFF] transition-colors">
                  {job.title}
                </h3>
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 font-medium mb-4">
                  <div className="flex items-center gap-1.5">
                    <MapPin size={16} />
                    {job.location}
                  </div>
                  <div className="w-1 h-1 rounded-full bg-slate-300" />
                  <div className="flex items-center gap-1.5">
                    <Clock size={16} />
                    {job.type}
                  </div>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed max-w-2xl line-clamp-2 md:line-clamp-none">
                  {job.description}
                </p>
              </div>

              <div className="shrink-0 md:ml-8">
                <a 
                  href={`mailto:orbitdevstudio@zohomail.in?subject=Application for ${job.title}`}
                  className="w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-slate-50 border border-slate-200 px-6 py-3 font-semibold text-[#1B3675] transition-all group-hover:bg-[#4F8CFF] group-hover:text-white group-hover:border-[#4F8CFF]"
                >
                  Apply Now
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
