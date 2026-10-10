import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Send, ScanSearch, FileCheck2, Plus, Minus, ArrowRight } from 'lucide-react';
import { SITE_URL } from '../config/site';
import FreeAuditSection from '../components/sections/FreeAuditSection';
import GradientIcon from '../components/ui/GradientIcon';
import PageHero from '../components/sections/PageHero';
import AuditFigure from '../components/hero-figures/AuditFigure';

const PAGE_URL = `${SITE_URL}/free-audit`;
const TITLE = 'Free Website Audit | Orbit Dev Studios';
const DESCRIPTION =
  'Request a free website audit from Orbit Dev Studios. We review UI/UX, mobile responsiveness, performance, SEO fundamentals and conversion opportunities, then send you an actionable report.';
const OG_IMAGE = `${SITE_URL}/companylogo-social.webp`;
const TRACK_LOCATION = 'free_audit_page';

const STEPS = [
  {
    icon: Send,
    title: 'Submit your site',
    desc: 'Share your website URL and anything you would like us to focus on. It takes about a minute.',
  },
  {
    icon: ScanSearch,
    title: 'We review',
    desc: 'Our team works through your site across design, mobile, performance, SEO basics and conversion.',
  },
  {
    icon: FileCheck2,
    title: 'You get an actionable report',
    desc: 'A prioritised summary of what to fix and why, written in plain English, sent to your inbox.',
  },
];

const FAQS: { q: string; a: React.ReactNode }[] = [
  {
    q: 'Is the audit really free?',
    a: 'Yes. There is no charge and no obligation to work with us afterwards. If you would like help implementing the recommendations, we can talk about that separately.',
  },
  {
    q: 'How long does it take?',
    a: (
      <>
        We aim to send your findings within 2–3 business days of
        receiving your request. Larger or more complex sites can take a little longer, and we'll let you
        know if that's the case.
      </>
    ),
  },
  {
    q: 'What do you need from me?',
    a: 'Just your website URL and an email address to send the report to. You do not need to give us logins, hosting access or analytics access for this review.',
  },
  {
    q: 'Do you guarantee specific results?',
    a: "No. The audit highlights issues and opportunities we find, with our recommendations. Outcomes depend on what gets implemented and on factors outside anyone's control, so we don't promise specific rankings, speed scores or conversion numbers.",
  },
  {
    q: 'What happens to the information I submit?',
    a: (
      <>
        We use it only to prepare and send your audit and to reply to you. See our{' '}
        <Link to="/privacy-policy" className="text-accent underline underline-offset-2">
          Privacy Policy
        </Link>{' '}
        and{' '}
        <Link to="/security" className="text-accent underline underline-offset-2">
          Security &amp; Privacy
        </Link>{' '}
        page for more detail.
      </>
    ),
  },
];

function FaqItem({ q, a, index }: { q: string; a: React.ReactNode; index: number }) {
  const [open, setOpen] = useState(index === 0);
  const panelId = `audit-faq-panel-${index}`;
  const buttonId = `audit-faq-button-${index}`;
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] light:border-slate-200 light:bg-white overflow-hidden">
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((o) => !o)}
          className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer"
        >
          <span className="text-white light:text-slate-900 text-[15px] sm:text-base font-semibold">{q}</span>
          <span
            className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
              open ? 'bg-accent text-white' : 'border border-white/10 light:border-slate-200 text-[#94A3B8]'
            }`}
            aria-hidden="true"
          >
            {open ? <Minus size={15} /> : <Plus size={15} />}
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="mx-5 sm:mx-6 border-t border-white/10 light:border-slate-200 py-5 text-[#C7D2E4] light:text-slate-600 text-[15px] leading-7">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FreeAudit() {
  return (
    <>
      <Helmet>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={PAGE_URL} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:image" content={OG_IMAGE} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={PAGE_URL} />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content={OG_IMAGE} />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
              { '@type': 'ListItem', position: 2, name: 'Free Website Audit', item: PAGE_URL },
            ],
          })}
        </script>
      </Helmet>

      <div className="relative min-h-screen bg-navy">
        {/* Hero */}
        <PageHero
          eyebrow="Free Website Audit"
          title="Find out what's holding"
          highlight="your website back"
          description="Get a free, no-obligation review of your website from our team. We look at design, mobile experience, speed, SEO fundamentals and conversion, then send you clear, prioritised recommendations you can act on."
          actions={
            <>
              <a
                href="#free-audit"
                data-track="free_audit_hero"
                data-track-location={TRACK_LOCATION}
                className="btn-primary group rounded-xl px-7 py-3.5 font-bold text-sm inline-flex items-center justify-center gap-2.5"
              >
                Request My Free Audit
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
              </a>
              <a
                href="#how-it-works"
                data-track="free_audit_how_it_works"
                data-track-location={TRACK_LOCATION}
                className="px-7 py-3.5 text-white light:text-slate-900 border border-white/15 font-bold text-sm rounded-xl hover:border-white/30 hover:bg-white/[0.04] transition-all inline-flex items-center justify-center"
              >
                How it works
              </a>
            </>
          }
          figure={<AuditFigure />}
        />

        <div className="section-white">
          <FreeAuditSection id="free-audit" trackLocation={TRACK_LOCATION} />

          {/* How it works */}
          <section id="how-it-works" aria-labelledby="how-it-works-heading" className="py-20 md:py-24 scroll-mt-24">
            <div className="max-w-7xl mx-auto px-6">
              <div className="max-w-2xl mb-12">
                <h2
                  id="how-it-works-heading"
                  className="text-3xl sm:text-4xl text-white light:text-slate-900 font-bold tracking-tight mb-4"
                >
                  How it works
                </h2>
                <p className="text-[#C7D2E4] light:text-slate-600 leading-relaxed">
                  Three simple steps from request to report.
                </p>
              </div>

              <ol className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {STEPS.map(({ icon: Icon, title, desc }, i) => (
                  <motion.li
                    key={title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="card-dark group p-7"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <GradientIcon icon={Icon} size={22} boxClassName="w-12 h-12 rounded-xl" />
                      <span className="text-sm font-bold tracking-widest text-slate-500" aria-hidden="true">
                        0{i + 1}
                      </span>
                    </div>
                    <h3 className="text-lg text-white light:text-slate-900 font-bold tracking-tight mb-2">
                      <span className="sr-only">Step {i + 1}: </span>
                      {title}
                    </h3>
                    <p className="text-[#C7D2E4] light:text-slate-600 text-[15px] leading-relaxed">{desc}</p>
                  </motion.li>
                ))}
              </ol>
            </div>
          </section>

          {/* FAQs */}
          <section aria-labelledby="audit-faq-heading" className="pb-24 md:pb-32">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              <div className="lg:col-span-4">
                <h2
                  id="audit-faq-heading"
                  className="text-3xl sm:text-4xl text-white light:text-slate-900 font-bold tracking-tight mb-4"
                >
                  Audit FAQs
                </h2>
                <p className="text-[#C7D2E4] light:text-slate-600 leading-relaxed mb-6">
                  Still have a question? Email us at{' '}
                  <a
                    href="mailto:orbitdevstudios@gmail.com?subject=Free%20Website%20Audit%20question"
                    data-track-location={TRACK_LOCATION}
                    className="text-accent font-semibold break-all hover:underline"
                  >
                    orbitdevstudios@gmail.com
                  </a>
                  .
                </p>
              </div>
              <div className="lg:col-span-8 flex flex-col gap-4">
                {FAQS.map((f, i) => (
                  <FaqItem key={f.q} q={f.q} a={f.a} index={i} />
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
