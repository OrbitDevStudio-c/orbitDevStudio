import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
  const sections = [
    {
      title: "1. Information We Collect",
      content: "We collect information you provide directly to us, such as when you submit a project inquiry, fill out our contact form, sign up for newsletters, or communicate with our engineering teams. This information typically includes your name, company name, email address, phone number, and any project briefs or documentation you provide."
    },
    {
      title: "2. How We Use Your Information",
      content: "We use the information we collect to deliver custom software development services, respond to project inquiries, manage client accounts, optimize our website user experience, and send updates regarding our services. We do not sell or trade your personal data to third parties."
    },
    {
      title: "3. Data Security & Storage",
      content: "At Orbit Dev Studio, data security is paramount. We implement industry-standard encryption protocols (including SSL/TLS) both in transit and at rest. Access to project directories and client databases is strictly restricted to authorized development and systems engineers under strict NDA protocols."
    },
    {
      title: "4. GDPR & HIPAA Compliance",
      content: "For clients in the European Union and healthcare sectors, we adhere strictly to General Data Protection Regulation (GDPR) standards and Health Insurance Portability and Accountability Act (HIPAA) guidelines. You have the right to request access to, correction of, or erasure of your personal data stored on our servers."
    },
    {
      title: "5. Cookies & Site Analytics",
      content: "We utilize cookies and third-party analytics systems (like Google Analytics) to measure site traffic and understand user behavior. This data is collected anonymously and is used solely to enhance our website performance and improve user journeys."
    },
    {
      title: "6. Changes to This Policy",
      content: "We may update this Privacy Policy from time to time to reflect changes in our operating model or compliance rules. We encourage you to review this page periodically to stay informed about how we protect your personal and project information."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Privacy Policy | Orbit Dev Studio</title>
        <meta name="description" content="Read our privacy policy to understand how we protect your personal and project data at Orbit Dev Studio." />
        <link rel="canonical" href="https://orbit-dev-studio.vercel.app/privacy-policy" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://orbit-dev-studio.vercel.app/privacy-policy" />
        <meta property="og:title" content="Privacy Policy | Orbit Dev Studio" />
        <meta property="og:description" content="Read our privacy policy to understand how we protect your personal and project data at Orbit Dev Studio." />
        <meta property="og:image" content="https://orbit-dev-studio.vercel.app/companylogo-social.webp" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://orbit-dev-studio.vercel.app/privacy-policy" />
        <meta name="twitter:title" content="Privacy Policy | Orbit Dev Studio" />
        <meta name="twitter:description" content="Read our privacy policy to understand how we protect your personal and project data at Orbit Dev Studio." />
        <meta name="twitter:image" content="https://orbit-dev-studio.vercel.app/companylogo-social.webp" />

        {/* JSON-LD Breadcrumbs */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://orbit-dev-studio.vercel.app/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Privacy Policy",
                "item": "https://orbit-dev-studio.vercel.app/privacy-policy"
              }
            ]
          })}
        </script>
      </Helmet>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="min-h-screen pt-32 pb-24 px-6 md:px-12 lg:px-24 bg-background relative z-10 text-white"
      >
        <div className="max-w-4xl mx-auto">
          <span className="text-xs font-semibold text-accent uppercase tracking-[0.2em] block mb-3">LEGAL COMPLIANCE</span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">Privacy Policy</h1>
          <p className="text-slate-400 text-sm leading-relaxed mb-12 border-b border-white/10 pb-8">
            Last updated: October 2026. This Privacy Policy details our commitment to safeguarding the data of our clients, prospective partners, and web users.
          </p>

          <div className="space-y-10">
            {sections.map((section, idx) => (
              <div key={idx} className="space-y-3">
                <h2 className="text-xl font-bold text-white tracking-tight">{section.title}</h2>
                <p className="text-slate-400 text-[14px] leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
}
