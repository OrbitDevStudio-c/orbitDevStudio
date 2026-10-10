import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { SITE_URL } from '../config/site';
import PageHero from '../components/sections/PageHero';
import PrivacyFigure from '../components/hero-figures/PrivacyFigure';

const TITLE = 'Privacy Policy | Orbit Dev Studios';
const DESCRIPTION =
  'How Orbit Dev Studios collects, uses and protects personal information submitted through our website, forms and AI assistant.';
const URL = `${SITE_URL}/privacy-policy`;
const CONTACT_EMAIL = 'orbitdevstudios@gmail.com';

type Section = { id: string; title: string; paragraphs?: string[]; items?: string[]; after?: string[] };

// Reflects how this website actually processes data. Have it reviewed by a legal professional before relying on it.
const SECTIONS: Section[] = [
  {
    id: 'who-we-are',
    title: '1. Who we are',
    paragraphs: [
      `Orbit Dev Studios ("we", "us") designs and builds websites, web applications and custom software. This policy explains how we handle personal information collected through ${SITE_URL.replace('https://', '')} and when you contact us. For any privacy question, email ${CONTACT_EMAIL}.`,
    ],
  },
  {
    id: 'information-we-collect',
    title: '2. Information we collect',
    paragraphs: ['We only collect information you choose to give us, plus basic technical data needed to run the site:'],
    items: [
      'Project and contact forms (Start Your Project, Free Website Audit): your name, email, phone number if provided, company, website URL and the details of your request.',
      'Careers applications: your name, contact details, experience, portfolio links, cover letter and the CV/résumé file you upload.',
      'Orbit AI chat assistant: the messages you type and, if you use the microphone, a short audio recording of your question.',
      'Usage data: if analytics is enabled, pages visited, buttons clicked, approximate location, device and browser type. We do not record the content of chat messages in analytics.',
    ],
  },
  {
    id: 'how-we-use',
    title: '3. How we use your information',
    items: [
      'To reply to enquiries, prepare proposals and estimates, and deliver the services you engage us for.',
      'To review job applications.',
      'To answer questions through the Orbit AI assistant.',
      'To understand how the website is used and improve it.',
      'To meet legal, accounting or security obligations.',
    ],
    after: ['We do not sell or rent your personal information, and we do not use it for third-party advertising.'],
  },
  {
    id: 'service-providers',
    title: '4. Service providers we use',
    paragraphs: ['To run this website we rely on a small number of third-party providers, who process data on our behalf:'],
    items: [
      'Vercel: website hosting and serverless functions.',
      'EmailJS and our email provider: delivering form submissions to our inbox.',
      'OpenRouter and Groq: generating Orbit AI chat replies and transcribing voice input. Your message (and recording, if you use the mic) is sent to these providers to produce a response. Please do not share sensitive personal information in the chat.',
      "Your browser's speech recognition service: when you use the mic, supported browsers show your words live by sending the audio to their own speech service (for example Google in Chrome, Microsoft in Edge, Apple in Safari), under that provider's privacy terms.",
      'Google Analytics: website analytics, only if enabled.',
    ],
  },
  {
    id: 'cookies',
    title: '5. Cookies and local storage',
    paragraphs: [
      'The site stores your light/dark theme preference and your current chat conversation in your browser (the chat clears when you close the tab). If analytics is enabled, Google Analytics sets cookies to distinguish visitors. You can block or delete cookies in your browser settings; the site will still work.',
    ],
  },
  {
    id: 'retention',
    title: '6. How long we keep information',
    paragraphs: [
      'We keep enquiry and project correspondence for as long as needed to respond, deliver the work and meet legal obligations. We keep job applications for as long as needed to fill the role, or longer only with your consent. Chat conversations are not stored in our own database.',
    ],
  },
  {
    id: 'security',
    title: '7. How we protect information',
    paragraphs: [
      'The website is served over HTTPS. Access to client information is limited to the people working on your request, and we use reputable providers for hosting and email. No system is perfectly secure, but we take reasonable steps to protect your data. You can read more about our practices on our Security & Privacy page.',
    ],
  },
  {
    id: 'your-rights',
    title: '8. Your rights',
    paragraphs: [
      `Depending on where you live, you may have the right to access, correct, delete or receive a copy of your personal information, or to object to or restrict how we use it. To make a request, email ${CONTACT_EMAIL}. We will respond within a reasonable time and may need to verify your identity first.`,
    ],
  },
  {
    id: 'client-projects',
    title: '9. Data in client projects',
    paragraphs: [
      'When we build software for a client, any personal data inside that project belongs to the client, and we handle it on their instructions under our project agreement. Specific regulatory requirements (for example GDPR or HIPAA) are scoped with each client at the start of a project. NDAs are available on request.',
    ],
  },
  {
    id: 'children',
    title: "10. Children's privacy",
    paragraphs: ['This website is intended for businesses and is not directed at children. We do not knowingly collect information from children.'],
  },
  {
    id: 'changes',
    title: '11. Changes to this policy',
    paragraphs: [
      'We may update this policy when our services or the law change. The "Last updated" date at the top shows the latest version.',
    ],
  },
];

export default function PrivacyPolicy() {
  return (
    <>
      <Helmet>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={URL} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={URL} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:image" content={`${SITE_URL}/companylogo-social.webp`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content={`${SITE_URL}/companylogo-social.webp`} />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
              { '@type': 'ListItem', position: 2, name: 'Privacy Policy', item: URL },
            ],
          })}
        </script>
      </Helmet>

      <PageHero
        compact
        eyebrow="Legal"
        title="Privacy"
        highlight="Policy"
        description="This policy explains what personal information we collect through this website, why, and the choices you have."
        figure={<PrivacyFigure />}
      >
        <p className="-mt-6 text-sm text-slate-400">
          Last updated: <time dateTime="2026-10-02">2 October 2026</time>
        </p>
      </PageHero>

      <section className="relative z-10 bg-background px-6 pb-24 pt-16 md:pt-20">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[220px_1fr]">
          <nav aria-label="Privacy policy sections" className="hidden lg:block">
            <ul className="sticky top-32 space-y-2 border-l border-white/10 pl-4 text-[13px] light:border-slate-200">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="text-slate-400 transition-colors hover:text-white light:hover:text-slate-900">
                    {s.title.replace(/^\d+\.\s*/, '')}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <article className="max-w-3xl">
            <div className="space-y-10">
              {SECTIONS.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-28 space-y-3">
                  <h2 className="text-xl font-bold tracking-tight text-white light:text-slate-900">{section.title}</h2>
                  {section.paragraphs?.map((p) => (
                    <p key={p} className="text-[15px] leading-relaxed text-[#C7D2E4] light:text-slate-600">{p}</p>
                  ))}
                  {section.items && (
                    <ul className="space-y-2 pl-1">
                      {section.items.map((item) => (
                        <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-[#C7D2E4] light:text-slate-600">
                          <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {section.after?.map((p) => (
                      <p key={p} className="text-[15px] leading-relaxed text-[#C7D2E4] light:text-slate-600">{p}</p>
                    ))}
                  {section.id === 'security' && (
                    <Link to="/security" className="inline-block text-sm font-semibold text-accent hover:underline">
                      Read our Security &amp; Privacy practices →
                    </Link>
                  )}
                </section>
              ))}
            </div>

            <div className="mt-14 rounded-2xl border border-white/10 bg-white/[0.03] p-6 light:border-slate-200 light:bg-white">
              <h2 className="mb-2 text-lg font-bold text-white light:text-slate-900">Questions about your data?</h2>
              <p className="text-[15px] text-[#C7D2E4] light:text-slate-600">
                Email us at{' '}
                <a href={`mailto:${CONTACT_EMAIL}`} data-track-location="privacy-policy" className="font-semibold text-accent hover:underline">
                  {CONTACT_EMAIL}
                </a>{' '}
                and we&apos;ll get back to you.
              </p>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
