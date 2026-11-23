import { Suspense, lazy, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import GlobalHero from '../components/sections/GlobalHero';
import { SITE_URL } from '../config/site';
import { audiences, faqAnswerText, globalFaqs, type AudienceId } from '../data/globalSolutions';

const GlobalAudiences = lazy(() => import('../components/sections/GlobalAudiences'));
const GlobalMarkets = lazy(() => import('../components/sections/GlobalMarkets'));
const GlobalServices = lazy(() => import('../components/sections/GlobalServices'));
const GlobalIndustries = lazy(() => import('../components/sections/GlobalIndustries'));
const GlobalWhy = lazy(() => import('../components/sections/GlobalWhy'));
const GlobalProcess = lazy(() => import('../components/sections/GlobalProcess'));
const GlobalEngagement = lazy(() => import('../components/sections/GlobalEngagement'));
const GlobalWork = lazy(() => import('../components/sections/GlobalWork'));
const GlobalForm = lazy(() => import('../components/sections/GlobalForm'));
const GlobalFAQ = lazy(() => import('../components/sections/GlobalFAQ'));

const PAGE_URL = `${SITE_URL}/global-solutions`;
const TITLE = 'Global Software Development Partner | OrbitDevStudio';
const DESCRIPTION =
  'OrbitDevStudio helps startups, small businesses and enterprises worldwide build websites, custom software, web applications and AI-powered digital solutions.';

function Sections() {
  const [prefill, setPrefill] = useState<{ businessType?: string; engagement?: string }>({});
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 150);
    return () => clearTimeout(t);
  }, []);
  if (!show) return null;

  const chooseAudience = (id: AudienceId) => {
    const a = audiences.find((x) => x.id === id);
    if (a) setPrefill((p) => ({ ...p, businessType: a.businessType }));
  };

  return (
    <Suspense fallback={null}>
      <GlobalAudiences onChoose={chooseAudience} />
      <GlobalMarkets />
      <GlobalServices />
      <GlobalIndustries />
      <GlobalWhy />
      <GlobalProcess />
      <GlobalEngagement onChoose={(engagement) => setPrefill((p) => ({ ...p, engagement }))} />
      <GlobalWork />
      <GlobalForm businessType={prefill.businessType} engagement={prefill.engagement} />
      <GlobalFAQ />
    </Suspense>
  );
}

export default function GlobalSolutions() {
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
        <meta property="og:image" content={`${SITE_URL}/companylogo-social.webp`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={PAGE_URL} />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content={`${SITE_URL}/companylogo-social.webp`} />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'BreadcrumbList',
                itemListElement: [
                  { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
                  { '@type': 'ListItem', position: 2, name: 'Global Solutions', item: PAGE_URL },
                ],
              },
              {
                '@type': 'FAQPage',
                mainEntity: globalFaqs.map((f) => ({
                  '@type': 'Question',
                  name: f.question,
                  acceptedAnswer: { '@type': 'Answer', text: faqAnswerText(f.answer) },
                })),
              },
            ],
          })}
        </script>
      </Helmet>

      <div className="relative min-h-screen bg-navy">
        <GlobalHero />
        <Sections />
      </div>
    </>
  );
}
