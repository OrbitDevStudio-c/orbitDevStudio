import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "How fast can you start working on my project?",
    answer: "Our pre-vetted talent pool allows us to onboard a dedicated developer or a full team within 48 to 72 hours, drastically reducing the typical recruitment cycle."
  },
  {
    question: "Do I have direct communication with the developers?",
    answer: "Absolutely. Our developers integrate directly into your daily workflow. You can communicate with them via Slack, Microsoft Teams, Zoom, Jira, or any other tools your in-house team already uses."
  },
  {
    question: "What if the developer isn't the right fit?",
    answer: "We offer a two-week risk-free trial. If you feel the assigned developer isn't the perfect match for your project's culture or technical needs, we will replace them immediately at no additional cost."
  },
  {
    question: "Who manages the project and the developers?",
    answer: "You maintain full control over the project management and daily tasks. Our developers work as an extension of your team. However, if you need an end-to-end solution, we can also provide dedicated Project Managers and Scrum Masters."
  },
  {
    question: "How do you ensure code quality and security?",
    answer: "All our engineers follow strict agile methodologies, peer code reviews, and automated CI/CD pipelines. We enforce enterprise-grade security standards and sign comprehensive NDAs to protect your intellectual property."
  }
];

export default function HireFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 md:py-32 bg-slate-50 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <span className="text-[10px] font-bold tracking-[0.2em] text-[#4F8CFF] uppercase block mb-3">
            CLEARING DOUBTS
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#1B3675] mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-[15px] text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Everything you need to know about our staff augmentation process, billing, and how we seamlessly integrate with your existing team.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`bg-white rounded-2xl border transition-all duration-300 ${isOpen ? 'border-[#4F8CFF] shadow-lg shadow-blue-500/10' : 'border-slate-200 hover:border-slate-300 shadow-sm'}`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none"
                >
                  <span className={`text-lg font-bold transition-colors ${isOpen ? 'text-[#4F8CFF]' : 'text-[#0B1736]'}`}>
                    {faq.question}
                  </span>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${isOpen ? 'bg-[#4F8CFF] text-white' : 'bg-slate-100 text-slate-500'}`}>
                    {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                  </div>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 md:px-8 pb-8 text-slate-600 leading-relaxed">
                        <div className="w-full h-px bg-slate-100 mb-6" />
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
