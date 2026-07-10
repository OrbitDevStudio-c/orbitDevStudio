export const SITE_URL = 'https://orbitdevstudio.com';
export const SITE_NAME = 'OrbitDevStudio';
export const SOCIAL_IMAGE = `${SITE_URL}/companylogo-social.webp`;

export interface RouteMeta {
  path: string;
  aliases?: string[];
  component: string; // lazy import path relative to pages/
  title: string;
  description: string;
  priority: number;
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly';
  jsonLd?: Record<string, any>;
  noIndex?: boolean;
}

export const routes: RouteMeta[] = [
  {
    path: '/',
    component: 'Home',
    title: 'OrbitDevStudio | Premium Digital Agency & Software Engineering',
    description: 'OrbitDevStudio - Engineering premium software solutions, breathtaking aesthetics, and scalable architectures for tomorrow\'s leading enterprises.',
    priority: 1.0,
    changefreq: 'weekly',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': `${SITE_URL}/#organization`,
          name: SITE_NAME,
          url: SITE_URL,
          logo: `${SITE_URL}/companylogo.webp`,
          sameAs: [
            'https://instagram.com/orbitdevstudio',
            'https://www.linkedin.com/company/orbitdevstudio-tech'
          ]
        },
        {
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          url: SITE_URL,
          name: SITE_NAME,
          publisher: { '@id': `${SITE_URL}/#organization` }
        }
      ]
    }
  },
  {
    path: '/about',
    component: 'About',
    title: 'About Us | OrbitDevStudio',
    description: 'Learn about OrbitDevStudio, our origin story, values, and the engineering team behind premium digital products.',
    priority: 0.8,
    changefreq: 'monthly',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'About OrbitDevStudio',
      description: 'Learn about OrbitDevStudio, our origin story, values, and the engineering team behind premium digital products.',
      url: `${SITE_URL}/about`
    }
  },
  {
    path: '/services',
    component: 'Services',
    title: 'Services | OrbitDevStudio',
    description: 'End-to-End Digital Services Engineered for Growth — Web apps, mobile development, UX/UI design, AI integration, and more.',
    priority: 0.8,
    changefreq: 'monthly',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      provider: { '@id': `${SITE_URL}/#organization` },
      name: 'Digital Engineering Services',
      description: 'End-to-End Digital Services Engineered for Growth',
      url: `${SITE_URL}/services`
    }
  },
  {
    path: '/industries',
    component: 'Industries',
    title: 'Industries | OrbitDevStudio',
    description: 'Custom digital solutions tailored for healthcare, e-commerce, architecture, interior design, corporate, and more.',
    priority: 0.8,
    changefreq: 'monthly'
  },
  {
    path: '/portfolio',
    component: 'Portfolio',
    title: 'Portfolio | OrbitDevStudio',
    description: 'Digital excellence in action. Explore our portfolio of premium web applications, platforms, and digital products.',
    priority: 0.9,
    changefreq: 'weekly'
  },
  {
    path: '/hire',
    aliases: ['/hire-us'],
    component: 'HireUs',
    title: 'Hire Dedicated Talent | OrbitDevStudio',
    description: 'Augment your team with elite engineering talent from OrbitDevStudio. Flexible engagement models for every scale.',
    priority: 0.8,
    changefreq: 'monthly'
  },
  {
    path: '/case-studies',
    component: 'CaseStudies',
    title: 'Case Studies | OrbitDevStudio',
    description: 'Read our detailed case studies showcasing real-world engineering challenges and solutions.',
    priority: 0.9,
    changefreq: 'weekly'
  },
  {
    path: '/process',
    component: 'Process',
    title: 'Process & Engineering | OrbitDevStudio',
    description: 'Discover our stage-by-stage engineering methodology — from discovery and architecture to deployment and optimization.',
    priority: 0.7,
    changefreq: 'monthly'
  },
  {
    path: '/tech',
    aliases: ['/tec', '/technologies'],
    component: 'TechStack',
    title: 'Technologies | OrbitDevStudio',
    description: 'The cutting-edge engineering stack we use — React, Next.js, Node.js, Python, AWS, and more.',
    priority: 0.7,
    changefreq: 'monthly'
  },
  {
    path: '/careers',
    component: 'Careers',
    title: 'Careers | OrbitDevStudio',
    description: 'Join OrbitDevStudio and help us build the future of digital products. View current openings.',
    priority: 0.7,
    changefreq: 'monthly'
  },
  {
    path: '/blog',
    component: 'Blog',
    title: 'Blog | OrbitDevStudio',
    description: 'Insights, engineering stories, and industry updates from the OrbitDevStudio team.',
    priority: 0.8,
    changefreq: 'weekly'
  },
  {
    path: '/contact',
    component: 'Contact',
    title: 'Contact Us | OrbitDevStudio',
    description: 'Get in touch with OrbitDevStudio. Let\'s discuss your next digital product.',
    priority: 0.8,
    changefreq: 'monthly',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Contact OrbitDevStudio',
      url: `${SITE_URL}/contact`
    }
  },
  {
    path: '/privacy-policy',
    component: 'PrivacyPolicy',
    title: 'Privacy Policy | OrbitDevStudio',
    description: 'Read our privacy policy to understand how OrbitDevStudio collects, uses, and protects your information.',
    priority: 0.3,
    changefreq: 'yearly'
  },
  {
    path: '/terms',
    component: 'Terms',
    title: 'Terms & Conditions | OrbitDevStudio',
    description: 'Read the terms of service for OrbitDevStudio.',
    priority: 0.3,
    changefreq: 'yearly'
  },
  {
    path: '*',
    component: 'NotFound',
    title: '404 Page Not Found | OrbitDevStudio',
    description: 'The page you are looking for does not exist.',
    priority: 0,
    changefreq: 'yearly',
    noIndex: true
  }
];

export function getRouteMeta(path: string): RouteMeta | undefined {
  return routes.find(r => r.path === path || r.aliases?.includes(path));
}
