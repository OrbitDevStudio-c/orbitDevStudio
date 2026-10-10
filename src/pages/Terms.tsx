import { Helmet } from 'react-helmet-async';
import PageHero from '../components/sections/PageHero';
import TermsFigure from '../components/hero-figures/TermsFigure';

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
        <title>Terms & Conditions | Orbit Dev Studios</title>
        <meta name="description" content="Read the terms of service and agreement rules for partnering with Orbit Dev Studio." />
        <link rel="canonical" href="https://orbit-dev-studio.vercel.app/terms" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://orbit-dev-studio.vercel.app/terms" />
        <meta property="og:title" content="Terms & Conditions | Orbit Dev Studios" />
        <meta property="og:description" content="Read the terms of service and agreement rules for partnering with Orbit Dev Studio." />
        <meta property="og:image" content="https://orbit-dev-studio.vercel.app/companylogo-social.webp" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://orbit-dev-studio.vercel.app/terms" />
        <meta name="twitter:title" content="Terms & Conditions | Orbit Dev Studios" />
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
      <PageHero
        compact
        eyebrow="Legal Agreement"
        title="Terms of"
        highlight="Service"
        description="These Terms of Service govern your relationship and agreements with Orbit Dev Studio."
        figure={<TermsFigure />}
      >
        <p className="-mt-6 text-sm text-slate-400">Last updated: October 2026</p>
      </PageHero>

      <section className="relative z-10 bg-background px-6 pb-24 pt-16 text-white md:px-12 md:pt-20 lg:px-24 light:text-slate-900">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-10">
            {sections.map((section, idx) => (
              <div key={idx} className="space-y-3">
                <h2 className="text-xl font-bold text-white light:text-slate-900 tracking-tight">{section.title}</h2>
                <p className="text-slate-400 text-[14px] leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
