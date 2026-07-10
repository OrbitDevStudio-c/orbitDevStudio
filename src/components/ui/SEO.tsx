import { Helmet } from 'react-helmet-async';
import { SITE_URL, SITE_NAME, SOCIAL_IMAGE } from '../../config/routes';

interface SEOProps {
  title: string;
  description: string;
  path: string;
  jsonLd?: Record<string, any>;
  noIndex?: boolean;
}

export default function SEO({ title, description, path, jsonLd, noIndex }: SEOProps) {
  const canonicalUrl = `${SITE_URL}${path === '/' ? '' : path}`;
  
  // Build breadcrumb JSON-LD for sub-pages
  const breadcrumbLd = path !== '/' && path !== '*' ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: title.split(' | ')[0],
        item: canonicalUrl
      }
    ]
  } : null;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {!noIndex && <link rel="canonical" href={canonicalUrl} />}
      {noIndex && <meta name="robots" content="noindex, follow" />}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={SOCIAL_IMAGE} />
      <meta property="og:site_name" content={SITE_NAME} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={SOCIAL_IMAGE} />

      {/* JSON-LD: page-specific */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}

      {/* JSON-LD: breadcrumb */}
      {breadcrumbLd && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbLd)}
        </script>
      )}
    </Helmet>
  );
}
