import { motion } from 'framer-motion';
import { Laptop, Globe2, GraduationCap, HeartPulse, Coffee, Rocket } from 'lucide-react';

const benefits = [
  {
    icon: Globe2,
    title: 'Work From Anywhere',
    description: 'We are a remote-first team. Whether you prefer working from a beach in Bali or your home office, you have the flexibility to choose.'
  },
  {
    icon: Laptop,
    title: 'Top-Tier Equipment',
    description: 'We provide you with the latest MacBook Pro and a generous home office stipend to ensure you have the best tools for the job.'
  },
  {
    icon: GraduationCap,
    title: 'Continuous Learning',
    description: 'Get an annual budget for courses, books, and conferences. We heavily invest in the continuous growth of our engineers.'
  },
  {
    icon: HeartPulse,
    title: 'Health & Wellness',
    description: 'Comprehensive health, dental, and vision insurance for you and your dependents, plus mental health days when you need a break.'
  },
  {
    icon: Coffee,
    title: 'Flexible PTO',
    description: 'Take time off when you need it. We measure performance by the quality of your output, not the hours you sit at your desk.'
  },
  {
    icon: Rocket,
    title: 'Impactful Projects',
    description: 'Work with cutting-edge tech stacks (React, Next.js, AWS) on high-impact projects that reach millions of users globally.'
  }
];

export default function CareersBenefits() {
  return (
    <section className="py-24 md:py-32 bg-navy relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <span className="text-[10px] font-bold tracking-[0.2em] text-accent uppercase block mb-3">
            LIFE AT ORBIT
          </span>
          <h2 className="text-h2 text-white mb-6">
            Why you'll love working here.
          </h2>
          <div className="w-16 h-1.5 bg-accent mx-auto mb-8 rounded-full" />
          <p className="text-[15px] text-slate-400 leading-relaxed max-w-2xl mx-auto">
            We believe that happy engineers write the best code. That's why we've built a culture and a benefits package designed to support your professional growth and personal well-being.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-dark p-8 transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-[#4F8CFF] group-hover:scale-110 transition-all duration-300">
                <benefit.icon size={24} className="text-accent group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent transition-colors">
                {benefit.title}
              </h3>
              <p className="text-sm leading-relaxed text-slate-400">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
