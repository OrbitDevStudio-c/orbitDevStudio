import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

export default function Terms() {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: "By accessing or using the services provided by Orbit Dev Studio, you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not access our services, request project scopes, or engage our engineering teams."
    },
    {
      title: "2. Scope of Services",
      content: "Orbit Dev Studio provides custom frontend engineering, UI/UX design, full-stack software development, and DevOps consultation services. The specific scope, deliverables, timeline, and budget for any engagement will be explicitly outlined in a separate Statement of Work (SOW)."
    },
    {
      title: "3. Intellectual Property Ownership",
      content: "Upon receipt of full and final payment for services rendered, the client owns all custom source code, assets, and design files produced specifically for their project. Orbit Dev Studio retains ownership of any pre-existing templates, proprietary libraries, or open-source tools utilized during development."
    },
    {
      title: "4. Client Obligations",
      content: "Clients are responsible for providing clear specifications, necessary assets, access credentials, and timely feedback during milestones. Delays in feedback or assets may result in schedule adjustments and resource reallocation fees."
    },
    {
      title: "5. Billing & Payment Terms",
      content: "Engagement costs are billed according to project milestones detailed in the Statement of Work. Invoices are payable within 15 days of issuance unless otherwise agreed in writing. Late payments may result in suspension of engineering services and product deployment."
    },
    {
      title: "6. Limitation of Liability",
      content: "To the maximum extent permitted by law, Orbit Dev Studio shall not be liable for any indirect, incidental, special, or consequential damages (including loss of profits, data, or business interruption) arising out of the use or inability to use our deliverables."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Terms & Conditions | Orbit Dev Studio</title>
        <meta name="description" content="Read the terms of service and agreement rules for partnering with Orbit Dev Studio." />
        <link rel="canonical" href="https://orbit-dev-studio.vercel.app/terms" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://orbit-dev-studio.vercel.app/terms" />
        <meta property="og:title" content="Terms & Conditions | Orbit Dev Studio" />
        <meta property="og:description" content="Read the terms of service and agreement rules for partnering with Orbit Dev Studio." />
        <meta property="og:image" content="https://orbit-dev-studio.vercel.app/companylogo-social.webp" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://orbit-dev-studio.vercel.app/terms" />
        <meta name="twitter:title" content="Terms & Conditions | Orbit Dev Studio" />
        <meta name="twitter:description" content="Read the terms of service and agreement rules for partnering with Orbit Dev Studio." />
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
                "name": "Terms of Service",
                "item": "https://orbit-dev-studio.vercel.app/terms"
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
          <span className="text-xs font-semibold text-accent uppercase tracking-[0.2em] block mb-3">LEGAL AGREEMENT</span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">Terms of Service</h1>
          <p className="text-slate-400 text-sm leading-relaxed mb-12 border-b border-white/10 pb-8">
            Last updated: October 2026. These Terms of Service govern your relationship and agreements with Orbit Dev Studio.
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
