import fs from 'fs';
import path from 'path';

const routes = [
  {
    path: 'about',
    title: 'About Us | OrbitDevStudio',
    description: 'Learn about OrbitDevStudio, our origin story, and the core values that drive our engineering excellence.',
  },
  {
    path: 'services',
    title: 'Services | OrbitDevStudio',
    description: 'End-to-End Digital Services Engineered for Growth',
  },
  {
    path: 'industries',
    title: 'Industries | OrbitDevStudio',
    description: 'Custom digital solutions tailored for various industries.',
  },
  {
    path: 'portfolio',
    title: 'Portfolio | OrbitDevStudio',
    description: "OrbitDevStudio - Digital excellence in action. Explore our portfolio of premium web experiences.",
  },
  {
    path: 'hire',
    title: 'Hire Dedicated Talent | OrbitDevStudio',
    description: 'Augment your team with elite engineering talent. Flexible hiring models tailored for your project.',
  },
  {
    path: 'case-studies',
    title: 'Case Studies | OrbitDevStudio',
    description: 'Read our detailed case studies showcasing how OrbitDevStudio engineers high-impact software solutions.',
  },
  {
    path: 'process',
    title: 'Process & Engineering | OrbitDevStudio',
    description: 'Discover our stage-by-stage engineering methodology designed to eliminate risk and deliver premium software systems.',
  },
  {
    path: 'tech',
    title: 'Technologies | OrbitDevStudio',
    description: 'The cutting-edge engineering stack we use to build highly scalable digital products.',
  },
  {
    path: 'careers',
    title: 'Careers | OrbitDevStudio',
    description: 'Join OrbitDevStudio and help us build the future of digital products. Explore our open roles and benefits.',
  },
  {
    path: 'blog',
    title: 'Blog | OrbitDevStudio',
    description: 'Insights, engineering stories, and industry updates from the technical minds at OrbitDevStudio.',
  },
  {
    path: 'contact',
    title: 'Contact Us | OrbitDevStudio',
    description: 'Get in touch with OrbitDevStudio to discuss your next big digital product.',
  },
  {
    path: 'privacy-policy',
    title: 'Privacy Policy | OrbitDevStudio',
    description: 'Read our privacy policy to understand how we protect your personal and project data at OrbitDevStudio.',
  },
  {
    path: 'terms',
    title: 'Terms & Conditions | OrbitDevStudio',
    description: 'Read the terms of service and agreement rules for partnering with OrbitDevStudio.',
  }
];

function prerender() {
  const distDir = path.join(process.cwd(), 'dist');
  const indexHtmlPath = path.join(distDir, 'index.html');

  if (!fs.existsSync(indexHtmlPath)) {
    console.error('Error: dist/index.html not found! Run npm run build first.');
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(indexHtmlPath, 'utf8');

  routes.forEach((route) => {
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
    <link rel="canonical" href="https://orbitdevstudios.vercel.app/${route.path}" />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://orbitdevstudios.vercel.app/${route.path}" />
    <meta property="og:title" content="${route.title}" />
    <meta property="og:description" content="${route.description}" />
    <meta property="og:image" content="https://orbitdevstudios.vercel.app/companylogo-social.webp" />
    <meta property="og:site_name" content="OrbitDevStudio" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="https://orbitdevstudios.vercel.app/${route.path}" />
    <meta name="twitter:title" content="${route.title}" />
    <meta name="twitter:description" content="${route.description}" />
    <meta name="twitter:image" content="https://orbitdevstudios.vercel.app/companylogo-social.webp" />
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
