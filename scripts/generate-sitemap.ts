import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { routes, SITE_URL } from '../src/config/routes.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function generateSitemap() {
  const publicDir = path.join(__dirname, '../public');
  const sitemapPath = path.join(publicDir, 'sitemap.xml');

  const today = new Date().toISOString().split('T')[0];

  const xmlEntries = routes
    .filter(route => !route.noIndex && route.path !== '*')
    .map(route => {
      // canonical path
      const urlPath = route.path === '/' ? '' : route.path;
      return `  <url>
    <loc>${SITE_URL}${urlPath}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority.toFixed(1)}</priority>
  </url>`;
    });

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlEntries.join('\n')}
</urlset>`;

  fs.writeFileSync(sitemapPath, xmlContent.trim(), 'utf8');
  console.log(`Sitemap generated successfully at ${sitemapPath}`);
}

generateSitemap();
