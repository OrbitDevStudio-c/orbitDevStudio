const fs = require('fs');
const path = require('path');

const pagePathMap = {
  'About.tsx': '/about',
  'Blog.tsx': '/blog',
  'Careers.tsx': '/careers',
  'CaseStudies.tsx': '/case-studies',
  'Contact.tsx': '/contact',
  'HireUs.tsx': '/hire',
  'Industries.tsx': '/industries',
  'NotFound.tsx': '*',
  'Portfolio.tsx': '/portfolio',
  'PrivacyPolicy.tsx': '/privacy-policy',
  'Process.tsx': '/process',
  'Services.tsx': '/services',
  'TechStack.tsx': '/tech',
  'Terms.tsx': '/terms'
};

const pagesDir = path.join(__dirname, '../src/pages');

Object.entries(pagePathMap).forEach(([filename, routePath]) => {
  const filePath = path.join(pagesDir, filename);
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Remove Helmet import
  content = content.replace(/import\s+\{\s*Helmet\s*\}\s+from\s+['"]react-helmet-async['"];?\r?\n?/g, '');

  // Add SEO imports if not present
  if (!content.includes("import SEO from '../components/ui/SEO'")) {
    content = "import SEO from '../components/ui/SEO';\nimport { getRouteMeta } from '../config/routes';\n" + content;
  }

  // Add const meta definition before export default function
  const functionRegex = /export\s+default\s+function\s+\w+/;
  if (functionRegex.test(content) && !content.includes(`const meta = getRouteMeta('${routePath}')`)) {
    content = content.replace(functionRegex, (match) => {
      return `const meta = getRouteMeta('${routePath}')!;\n\n${match}`;
    });
  }

  // Replace <Helmet>...</Helmet> with <SEO {...meta} />
  const helmetRegex = /<Helmet>([\s\S]*?)<\/Helmet>/i;
  if (helmetRegex.test(content)) {
    content = content.replace(helmetRegex, '<SEO {...meta} />');
    console.log(`Updated Helmet in ${filename}`);
  } else {
    console.log(`No Helmet tag found in ${filename}`);
  }

  fs.writeFileSync(filePath, content, 'utf8');
});

console.log('Finished refactoring pages for SEO component!');
