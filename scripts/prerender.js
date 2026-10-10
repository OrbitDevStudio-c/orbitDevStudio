import fs from 'fs';
import path from 'path';

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

const siteUrlMatch = read('src/config/site.ts').match(/export const SITE_URL = '([^']+)';/);
const SITE_URL = siteUrlMatch ? siteUrlMatch[1] : 'https://orbit-dev-studio.vercel.app';
const TODAY = new Date().toISOString().slice(0, 10);

const staticRoutes = [
  {
    path: '',
    title: 'Orbit Dev Studios | Websites, Web Apps & E-commerce Built for Growth',
    description: 'Orbit Dev Studios designs and builds fast, conversion-focused websites, web applications, UI/UX and e-commerce platforms for growing businesses.',
    priority: '1.0',
    changefreq: 'weekly',
  },
  { path: 'services', title: 'Services | Orbit Dev Studios', description: 'Website development, web applications, UI/UX design, e-commerce, custom software and website redesign, delivered by one focused team.' },
  { path: 'portfolio', title: 'Our Work | Orbit Dev Studios', description: 'Websites, e-commerce stores, healthcare platforms and AI products designed and built by Orbit Dev Studios, with a case study for each project.' },
  { path: 'pricing', title: 'Pricing | Orbit Dev Studios', description: 'Websites, e-commerce, web apps and custom software priced to your requirements. Get an instant AI estimate, compare Starter, Professional and Enterprise scope, then a free quote.' },
  { path: 'about', title: 'About Us | Orbit Dev Studios', description: 'Our story, mission, values, seven-step process and the team behind Orbit Dev Studios.' },
  { path: 'blog', title: 'Blog | Orbit Dev Studios', description: 'Practical guides on website design, web development, performance and lead generation from the Orbit Dev Studios team.', changefreq: 'weekly' },
  { path: 'faq', title: 'FAQ | Orbit Dev Studios', description: 'Answers to common questions about working with Orbit Dev Studios: cost, timelines, process, technologies, launch and maintenance.' },
  { path: 'free-audit', title: 'Free Website Audit | Orbit Dev Studios', description: 'Request a free website audit covering UI/UX, mobile responsiveness, performance, SEO fundamentals and conversion opportunities.' },
  { path: 'security', title: 'Security & Privacy | Orbit Dev Studios', description: 'How Orbit Dev Studios approaches security and privacy: HTTPS, minimal data collection, least-privilege access, confidentiality and NDAs.' },
  { path: 'industries', title: 'Industries | Orbit Dev Studios', description: 'Digital products for healthcare, e-commerce, architecture, interior design, travel, restaurants and personal brands.' },
  { path: 'tech', title: 'Technologies | Orbit Dev Studios', description: 'The modern, proven technology stack we use to build fast, scalable websites and applications.' },
  { path: 'hire', title: "Start Your Project | Orbit Dev Studios", description: 'Tell us about your project or hire dedicated developers on full-time, part-time or hourly engagement models.' },
  { path: 'careers', title: 'Careers | Orbit Dev Studios', description: 'Join Orbit Dev Studios and help build great digital products. Explore our open roles and benefits.' },
  { path: 'privacy-policy', title: 'Privacy Policy | Orbit Dev Studios', description: 'How Orbit Dev Studios collects, uses and protects personal information submitted through our website, forms and AI assistant.', priority: '0.3', changefreq: 'yearly' },
  { path: 'terms', title: 'Terms & Conditions | Orbit Dev Studios', description: 'The terms of service for working with Orbit Dev Studios and using this website.', priority: '0.3', changefreq: 'yearly' },
];

// Matches a single-, double- or backtick-quoted string literal and captures its contents.
const STR = String.raw`(?:'((?:\\.|[^'\\])*)'|"((?:\\.|[^"\\])*)"|` + '`' + String.raw`((?:\\.|[^` + '`' + String.raw`\\])*)` + '`)';
const unquote = (m, i) => (m[i] ?? m[i + 1] ?? m[i + 2] ?? '').replace(/\\(.)/g, '$1');

function blogRoutes() {
  const re = new RegExp(String.raw`slug:\s*${STR}[\s\S]*?metaTitle:\s*${STR}[\s\S]*?metaDescription:\s*${STR}[\s\S]*?publishDate:\s*${STR}`, 'g');
  return [...read('src/data/blog.ts').matchAll(re)].map((m) => ({
    path: `blog/${unquote(m, 1)}`,
    title: unquote(m, 4),
    description: unquote(m, 7),
    lastmod: unquote(m, 10).slice(0, 10),
    priority: '0.6',
  }));
}

function caseStudyRoutes() {
  const re = new RegExp(String.raw`slug:\s*${STR}[\s\S]*?title:\s*${STR}[\s\S]*?summary:\s*${STR}`, 'g');
  return [...read('src/data/projects.ts').matchAll(re)].map((m) => ({
    path: `case-studies/${unquote(m, 1)}`,
    title: `${unquote(m, 4)} Case Study | Orbit Dev Studios`,
    description: unquote(m, 7),
    priority: '0.6',
  }));
}

function techStackRoutes() {
  const re = new RegExp(String.raw`slug:\s*${STR}[\s\S]*?metaTitle:\s*${STR}[\s\S]*?metaDescription:\s*${STR}`, 'g');
  return [...read('src/data/techStacks.ts').matchAll(re)].map((m) => ({
    path: `tech/${unquote(m, 1)}`,
    title: unquote(m, 4),
    description: unquote(m, 7),
    priority: '0.7',
  }));
}

function industryRoutes() {
  const re = new RegExp(String.raw`slug:\s*${STR}[\s\S]*?metaTitle:\s*${STR}[\s\S]*?metaDescription:\s*${STR}`, 'g');
  return [...read('src/data/industries.ts').matchAll(re)].map((m) => ({
    path: `industries/${unquote(m, 1)}`,
    title: unquote(m, 4),
    description: unquote(m, 7),
    priority: '0.7',
  }));
}

const escapeHtml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function writeSitemap(distDir, routes) {
  const urls = routes
    .map((r) => {
      const loc = r.path ? `${SITE_URL}/${r.path}` : `${SITE_URL}/`;
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${r.lastmod || TODAY}</lastmod>\n    <changefreq>${r.changefreq || 'monthly'}</changefreq>\n    <priority>${r.priority || '0.8'}</priority>\n  </url>`;
    })
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), xml, 'utf8');
  console.log(`Sitemap: ${routes.length} URLs -> dist/sitemap.xml`);
}

function prerender() {
  const distDir = path.join(root, 'dist');
  const indexHtmlPath = path.join(distDir, 'index.html');

  if (!fs.existsSync(indexHtmlPath)) {
    console.error('Error: dist/index.html not found! Run npm run build first.');
    process.exit(1);
  }

  const blog = blogRoutes();
  const caseStudies = caseStudyRoutes();
  const techStacks = techStackRoutes();
  const industryPages = industryRoutes();
  if (!blog.length || !caseStudies.length || !techStacks.length || !industryPages.length) {
    console.error('Error: could not read blog posts, case studies, tech stack or industry pages from src/data. Check the data file format.');
    process.exit(1);
  }

  const routes = [...staticRoutes, ...techStacks, ...industryPages, ...blog, ...caseStudies];
  const baseHtml = fs.readFileSync(indexHtmlPath, 'utf8');

  for (const route of routes) {
    const routeDir = path.join(distDir, route.path);
    fs.mkdirSync(routeDir, { recursive: true });

    const routeUrl = route.path ? `${SITE_URL}/${route.path}` : `${SITE_URL}/`;
    const title = escapeHtml(route.title);
    const description = escapeHtml(route.description);
    const ogType = route.path.startsWith('blog/') ? 'article' : 'website';

    const metaTags = `
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <link rel="canonical" href="${routeUrl}" />
    <meta property="og:type" content="${ogType}" />
    <meta property="og:url" content="${routeUrl}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${SITE_URL}/companylogo-social.webp" />
    <meta property="og:site_name" content="Orbit Dev Studios" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="${routeUrl}" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${SITE_URL}/companylogo-social.webp" />
    `;

    let html = baseHtml.replace(/<title>.*?<\/title>/g, '');
    html = html.replace('</head>', `${metaTags}\n</head>`);

    // Static content inside #root for crawlers; React replaces it on load.
    const staticBody = `
      <div id="initial-loader" style="display:none;"></div>
      <div style="padding: 50px; font-family: sans-serif; max-width: 800px; margin: 0 auto; color: #FFFFFF; background-color: #060B1A; min-height: 100vh;">
        <h1>${escapeHtml(route.title.split(' | ')[0])}</h1>
        <p>${description}</p>
      </div>
    `;
    html = html.replace(/<div id="root">[\s\S]*?<\/div>(\s*<\/body>)/, `<div id="root">${staticBody}</div>$1`);

    fs.writeFileSync(path.join(routeDir, 'index.html'), html, 'utf8');
  }

  console.log(`Prerendered ${routes.length} routes (${techStacks.length} tech stack pages, ${industryPages.length} industry pages, ${blog.length} blog posts, ${caseStudies.length} case studies).`);
  writeSitemap(distDir, routes);
}

prerender();
