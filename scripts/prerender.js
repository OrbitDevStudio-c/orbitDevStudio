import fs from 'fs';
import path from 'path';
import { routes } from '../src/config/routes.ts';

function prerender() {
  const distDir = path.join(process.cwd(), 'dist');
  const indexHtmlPath = path.join(distDir, 'index.html');

  if (!fs.existsSync(indexHtmlPath)) {
    console.error('Error: dist/index.html not found! Run npm run build first.');
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(indexHtmlPath, 'utf8');

  // Build route list for prerendering (sub-routes only, including aliases)
  const prerenderRoutes = [];
  routes.forEach((route) => {
    if (route.path === '*' || route.path === '/') return;

    const canonicalPath = route.path;

    // Add canonical route
    prerenderRoutes.push({
      path: route.path.replace(/^\//, ''),
      canonicalUrl: `https://orbitdevstudio.com${canonicalPath}`,
      title: route.title,
      description: route.description
    });

    // Add alias routes
    if (route.aliases) {
      route.aliases.forEach((alias) => {
        prerenderRoutes.push({
          path: alias.replace(/^\//, ''),
          canonicalUrl: `https://orbitdevstudio.com${canonicalPath}`,
          title: route.title,
          description: route.description
        });
      });
    }
  });

  prerenderRoutes.forEach((route) => {
    const routeDir = path.join(distDir, route.path);
    if (!fs.existsSync(routeDir)) {
      fs.mkdirSync(routeDir, { recursive: true });
    }

    // Replace the default index.html tags with route-specific metadata
    let html = baseHtml;
    
    // Replace Title
    html = html.replace(/<title>.*?<\/title>/g, `<title>${route.title}</title>`);

    // Build meta tags
    const metaTags = `
    <title>${route.title}</title>
    <meta name="description" content="${route.description}" />
    <link rel="canonical" href="${route.canonicalUrl}" />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${route.canonicalUrl}" />
    <meta property="og:title" content="${route.title}" />
    <meta property="og:description" content="${route.description}" />
    <meta property="og:image" content="https://orbitdevstudio.com/companylogo-social.webp" />
    <meta property="og:site_name" content="OrbitDevStudio" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="${route.canonicalUrl}" />
    <meta name="twitter:title" content="${route.title}" />
    <meta name="twitter:description" content="${route.description}" />
    <meta name="twitter:image" content="https://orbitdevstudio.com/companylogo-social.webp" />
    `;

    // Inject meta tags before </head>
    html = html.replace('</head>', `${metaTags}\n</head>`);

    // Inject static body content inside #root for crawlers
    const staticBody = `
      <div id="initial-loader" style="display:none;"></div>
      <div style="padding: 50px; font-family: sans-serif; max-width: 800px; margin: 0 auto; color: #FFFFFF; background-color: #060B1A; min-height: 100vh;">
        <h1>${route.title.split(' | ')[0]}</h1>
        <p>${route.description}</p>
        <p>Loading application content...</p>
      </div>
    `;
    
    // Inject inside <div id="root">...</div>
    html = html.replace(/<div id="root">[\s\S]*?<\/div>/, `<div id="root">${staticBody}</div>`);

    const routeHtmlPath = path.join(routeDir, 'index.html');
    fs.writeFileSync(routeHtmlPath, html, 'utf8');
    console.log(`Prerendered: /${route.path} -> ${routeHtmlPath}`);
  });

  console.log('Static route prerendering complete!');
}

prerender();

