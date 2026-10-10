import { useEffect, useRef, type MouseEvent } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';
import { SITE_URL } from '../config/site';
import { track } from '../lib/analytics';
import { pricingTiers } from '../data/pricing';
import PricingEstimator from '../components/sections/PricingEstimator';
import { usePricingScrollTo } from '../components/sections/PricingScroll';
import PricingTiers from '../components/sections/PricingTiers';
import PricingComparison from '../components/sections/PricingComparison';
import PricingAddons from '../components/sections/PricingAddons';
import PricingFAQ from '../components/sections/PricingFAQ';
import PricingCTA from '../components/sections/PricingCTA';
import PageHero from '../components/sections/PageHero';
import PricingFigure from '../components/hero-figures/PricingFigure';

const PAGE_URL = `${SITE_URL}/pricing`;
const TITLE = 'Pricing | Orbit Dev Studios';
const DESCRIPTION =
  'Websites, e-commerce, web apps and custom software priced to your requirements. Get an instant AI estimate, compare Starter, Professional and Enterprise scope, then a free quote.';
const OG_IMAGE = `${SITE_URL}/companylogo-social.webp`;

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Website, web application and custom software development',
  serviceType: 'Web development',
  url: PAGE_URL,
  provider: {
    '@type': 'Organization',
    name: 'Orbit Dev Studios',
    url: SITE_URL,
    email: 'orbitdevstudios@gmail.com',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Orbit Dev Studios pricing packages',
    itemListElement: pricingTiers.map((tier) => ({
      '@type': 'Offer',
      name: `${tier.name} package`,
      description: tier.tagline,
      url: `${PAGE_URL}#packages`,
      itemOffered: {
        '@type': 'Service',
        name: `${tier.name} package`,
        description: tier.typicalScope,
      },
    })),
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
    { '@type': 'ListItem', position: 2, name: 'Pricing', item: PAGE_URL },
  ],
};

function PricingHero() {
  return (
    <PageHero
      eyebrow="Pricing"
      title="Clear pricing for"
      highlight="software built to last"
      description="Whether you need a polished marketing website, an online store or a custom web application, start with a transparent estimate in a few clicks, then a tailored quote after a free consultation, with scope and costs agreed before work begins."
      actions={
        <a
          href="#estimate"
          data-track="pricing_estimate_my_project"
          data-track-location="pricing-hero"
          className="btn-primary group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 font-bold text-sm transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--rt-bg)]"
        >
          Estimate My Project
          <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
        </a>
      }
      figure={<PricingFigure />}
    />
  );
}

export default function Pricing() {
  const tracked = useRef(false);
  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;
    track('pricing_view');
  }, []);

  // Deep links such as /pricing#estimate: ScrollToTop resets to the top on navigation,
  // so scroll to the target after it has run.
  const { hash } = useLocation();
  const scrollTo = usePricingScrollTo();
  useEffect(() => {
    const id = decodeURIComponent(hash.replace('#', ''));
    if (!id) return;
    const t = window.setTimeout(() => scrollTo(id), 120);
    return () => window.clearTimeout(t);
  }, [hash, scrollTo]);

  // In-page anchors (#estimate, #packages) go through the same smooth-scroll helper.
  const onAnchorClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const link = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
    const id = link?.getAttribute('href')?.slice(1);
    if (!id || !scrollTo(id)) return;
    e.preventDefault();
    window.history.replaceState(window.history.state, '', `#${id}`);
  };

  return (
    <>
      <Helmet>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={PAGE_URL} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:image" content={OG_IMAGE} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={PAGE_URL} />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content={OG_IMAGE} />

        {/* JSON-LD */}
        <script type="application/ld+json">{JSON.stringify(serviceJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      </Helmet>

      <div className="relative min-h-screen bg-navy" onClick={onAnchorClick}>
        <PricingHero />
        <PricingEstimator />
        <div className="section-white">
          <PricingTiers />
        </div>
        <PricingComparison />
        <div className="section-white">
          <PricingAddons />
        </div>
        <PricingFAQ />
        <PricingCTA />
      </div>
    </>
  );
}
