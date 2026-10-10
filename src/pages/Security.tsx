import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Lock,
  Database,
  KeyRound,
  Fingerprint,
  HardDriveDownload,
  Plug,
  EyeOff,
  FileSignature,
  ShieldAlert,
  ShieldCheck,
  ArrowRight,
  Mail,
  CheckCircle2,
} from 'lucide-react';
import { SITE_URL } from '../config/site';
import GradientIcon from '../components/ui/GradientIcon';
import PageHero from '../components/sections/PageHero';
import SecurityFigure from '../components/hero-figures/SecurityFigure';

const PAGE_URL = `${SITE_URL}/security`;
const TITLE = 'Security & Privacy | Orbit Dev Studios';
const DESCRIPTION =
  'How Orbit Dev Studios approaches security and privacy: HTTPS everywhere, minimal data collection, least-privilege access, MFA, backups, client confidentiality, NDAs and responsible disclosure.';
const OG_IMAGE = `${SITE_URL}/companylogo-social.webp`;
const CONTACT_EMAIL = 'orbitdevstudios@gmail.com';
const TRACK_LOCATION = 'security_page';

const PRACTICES: { icon: typeof Lock; title: string; body: React.ReactNode }[] = [
  {
    icon: Lock,
    title: 'HTTPS / TLS everywhere',
    body: 'We serve the sites and apps we build over HTTPS, using TLS certificates from the hosting provider or a trusted certificate authority, and we use encrypted connections for the tools and services we work with.',
  },
  {
    icon: Database,
    title: 'Data handling',
    body: 'We collect only what we need to deliver the work. Client data and materials are used solely for the project they were shared for, and are not sold or shared with unrelated parties.',
  },
  {
    icon: KeyRound,
    title: 'Access control',
    body: 'We follow least-privilege principles: team members get access only to the systems a project needs. At handover we hand credentials back to you and revoke or remove our access unless you ask us to keep supporting the project.',
  },
  {
    icon: Fingerprint,
    title: 'Authentication',
    body: 'We use multi-factor authentication on our own work accounts where providers support it. In the products we build, we use established authentication libraries and patterns (hashed passwords, secure sessions or tokens) rather than rolling our own.',
  },
  {
    icon: HardDriveDownload,
    title: 'Backups',
    body: 'Backups are configured with your hosting or database provider. Backup frequency and retention are agreed per project, based on your needs and the provider plan you choose.',
  },
  {
    icon: Plug,
    title: 'Third-party services',
    body: 'We build on reputable, well-established providers for hosting, databases, email and payments. Wherever possible, you own these accounts directly, so you keep control of your infrastructure and data.',
  },
  {
    icon: EyeOff,
    title: 'Client confidentiality',
    body: "We treat your plans, code and business information as confidential. We don't publish your project in our portfolio or case studies without your permission.",
  },
  {
    icon: FileSignature,
    title: 'NDAs available',
    body: "Need a non-disclosure agreement before sharing details? We're happy to sign your NDA or provide ours before a project kicks off.",
  },
  {
    icon: ShieldAlert,
    title: 'Responsible disclosure',
    body: (
      <>
        If you believe you've found a security issue in something we've built or in this website, please
        email{' '}
        <a
          href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Security disclosure')}`}
          data-track-location={TRACK_LOCATION}
          className="text-accent font-semibold break-all hover:underline"
        >
          {CONTACT_EMAIL}
        </a>{' '}
        with details. We'll acknowledge your report within 3 business
        days.
      </>
    ),
  },
];

const DATA_STEPS = [
  {
    title: 'What we collect',
    body: 'Contact details you send us (name, email, company) and the project information, files or access you choose to share. Nothing more than the work requires.',
  },
  {
    title: 'How we use it',
    body: 'Only to scope, build, support and communicate about your project. We do not sell client data or use it for unrelated purposes.',
  },
  {
    title: 'Where it lives',
    body: 'In the tools and providers needed for the project, ideally accounts you own. Credentials are shared through a password manager or secure channel rather than plain email where possible.',
  },
  {
    title: 'When the project ends',
    body: 'We hand over code, credentials and documentation, revoke our access unless ongoing support is agreed, and delete project materials on request.',
  },
];

export default function Security() {
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
              { '@type': 'ListItem', position: 2, name: 'Security & Privacy', item: PAGE_URL },
            ],
          })}
        </script>
      </Helmet>

      <div className="relative min-h-screen bg-navy">
        {/* Hero */}
        <PageHero
          eyebrow="Trust"
          title="Security &"
          highlight="Privacy"
          description={
            <>
              <p className="mb-4">
                When you trust us with your product, code and data, we take that seriously. Here is a
                plain-English overview of the practices we follow on every project.
              </p>
              <p className="text-sm">
                For how we handle personal data collected through this website, see our{' '}
                <Link to="/privacy-policy" className="text-accent font-semibold hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </>
          }
          figure={<SecurityFigure />}
        />

        <div className="section-white">
          {/* Practice cards */}
          <section aria-labelledby="practices-heading" className="py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-6">
              <div className="max-w-2xl mb-10 md:mb-12">
                <h2
                  id="practices-heading"
                  className="text-3xl sm:text-4xl text-white light:text-slate-900 font-bold tracking-tight mb-4"
                >
                  Our security practices
                </h2>
                <p className="text-[#C7D2E4] light:text-slate-600 leading-relaxed">
                  The everyday habits and defaults we bring to client work.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {PRACTICES.map(({ icon: Icon, title, body }, i) => (
                  <motion.article
                    key={title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: (i % 3) * 0.06 }}
                    className={`card-dark group p-6 md:p-7 flex flex-col ${i === PRACTICES.length - 1 && PRACTICES.length % 2 === 1 ? 'sm:col-span-2 lg:col-span-1' : ''}`}
                  >
                    <GradientIcon icon={Icon} size={22} boxClassName="w-12 h-12 rounded-xl mb-5" />
                    <h3 className="text-lg text-white light:text-slate-900 font-bold tracking-tight mb-2">{title}</h3>
                    <p className="text-[#C7D2E4] light:text-slate-600 text-[15px] leading-relaxed">{body}</p>
                  </motion.article>
                ))}
              </div>

              <div className="mt-8 md:mt-10 rounded-2xl border border-white/10 bg-white/[0.03] light:border-slate-200 light:bg-white px-5 py-4 md:px-6 text-sm text-[#C7D2E4] light:text-slate-600 leading-relaxed flex items-start gap-3">
                <GradientIcon icon={ShieldCheck} size={18} box={false} className="shrink-0 mt-0.5" />
                <span>
                  Specific compliance requirements (e.g. HIPAA, GDPR) can be discussed and scoped per
                  project.
                </span>
              </div>
            </div>
          </section>

          {/* How we handle your data */}
          <section aria-labelledby="data-heading" className="py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 lg:gap-16 items-start">
              <div className="lg:col-span-5 lg:sticky lg:top-28">
                <h2
                  id="data-heading"
                  className="text-3xl sm:text-4xl text-white light:text-slate-900 font-bold tracking-tight mb-4"
                >
                  How we handle your data
                </h2>
                <p className="text-[#C7D2E4] light:text-slate-600 leading-relaxed">
                  From the first enquiry to project handover, this is what happens to the information you
                  share with us.
                </p>
              </div>

              <ol className="lg:col-span-7 flex flex-col gap-4">
                {DATA_STEPS.map((step, i) => (
                  <li
                    key={step.title}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] light:border-slate-200 light:bg-white p-5 md:p-6 flex gap-4 md:gap-5"
                  >
                    <span
                      className="w-9 h-9 rounded-full bg-accent/10 border border-accent/30 text-accent text-sm font-bold flex items-center justify-center shrink-0"
                      aria-hidden="true"
                    >
                      {i + 1}
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-base text-white light:text-slate-900 font-bold tracking-tight mb-1.5">
                        {step.title}
                      </h3>
                      <p className="text-[#C7D2E4] light:text-slate-600 text-[15px] leading-relaxed">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* Confidentiality & NDAs */}
          <section aria-labelledby="nda-heading" className="py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-6">
              <div className="glass-panel p-6 sm:p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                <div>
                  <GradientIcon icon={FileSignature} size={26} boxClassName="w-14 h-14 rounded-2xl mb-5 md:mb-6" />
                  <h2
                    id="nda-heading"
                    className="text-2xl sm:text-3xl text-white light:text-slate-900 font-bold tracking-tight mb-4"
                  >
                    Confidentiality &amp; NDAs
                  </h2>
                  <p className="text-[#C7D2E4] light:text-slate-600 leading-relaxed">
                    Your idea, roadmap and code stay yours. We're happy to sign an NDA before you share
                    sensitive details, and confidentiality and IP ownership terms are included in our
                    project agreements.
                  </p>
                </div>
                <ul className="flex flex-col gap-4">
                  {[
                    'NDA available on request, yours or ours',
                    'Code and IP transferred to you at handover, per your agreement',
                    'No portfolio or case-study use without your written permission',
                    'Project information shared only with team members working on it',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[15px] text-[#C7D2E4] light:text-slate-600 leading-relaxed">
                      <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section aria-labelledby="security-cta-heading" className="relative overflow-hidden py-20 md:py-28">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-full bg-[radial-gradient(circle,_rgba(22,119,255,0.1)_0%,_transparent_70%)] pointer-events-none" />
            <div className="max-w-4xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
              <h2
                id="security-cta-heading"
                className="text-3xl sm:text-4xl md:text-5xl text-white light:text-slate-900 font-bold tracking-tight mb-5 md:mb-6"
              >
                Questions about security?
              </h2>
              <p className="text-[#C7D2E4] light:text-slate-600 text-base md:text-lg leading-relaxed max-w-2xl mb-8 md:mb-10">
                Tell us about your requirements, whether that's an NDA, a specific compliance need or how
                we'd handle access to your systems, and we'll walk you through our approach.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <Link
                  to="/hire"
                  data-track="security_lets_talk"
                  data-track-location={TRACK_LOCATION}
                  className="btn-primary group w-full sm:w-auto rounded-xl px-7 py-3.5 font-bold text-sm inline-flex items-center justify-center gap-2.5"
                >
                  Let's Talk
                  <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                </Link>
                <a
                  href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Security question')}`}
                  data-track="security_email"
                  data-track-location={TRACK_LOCATION}
                  className="w-full sm:w-auto px-7 py-3.5 text-white light:text-slate-900 border border-white/15 font-bold text-sm rounded-xl hover:border-white/30 hover:bg-white/[0.04] transition-all inline-flex items-center justify-center gap-2"
                >
                  <Mail size={16} aria-hidden="true" />
                  Email us
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
