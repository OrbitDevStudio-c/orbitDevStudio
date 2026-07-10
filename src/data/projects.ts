export interface Project {
  id: number;
  title: string;
  industry: string;
  category: string;
  tagline: string;
  description: string;
  technologies: string[];
  services: string[];
  liveUrl: string;
  screenshot: string;
  gridSpan: string;
  featured: boolean;
}

export const categories = ['All', 'Architecture', 'Healthcare', 'Corporate', 'E-commerce', 'Personal', 'Industrial'];

export const projects: Project[] = [
  {
    id: 1,
    title: 'Aura Design Studio',
    industry: 'Interior Design',
    category: 'Architecture',
    tagline: 'Modern spaces, beautifully presented.',
    description: 'We engineered a highly performant portfolio platform for a premium interior design firm. The architecture emphasizes high-resolution media delivery without compromising load times, utilizing modern frontend frameworks to craft smooth, hardware-accelerated transitions that mirror the elegance of their physical spaces.',
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
    services: ['Frontend Development', 'UI/UX Design', 'Performance Optimization'],
    liveUrl: 'https://auradesignstudio.netlify.app/',
    screenshot: '/projects/aura.webp',
    gridSpan: 'md:col-span-1 lg:col-span-7',
    featured: true,
  },
  {
    id: 2,
    title: 'Designerss Creative',
    industry: 'Architecture & Interior',
    category: 'Architecture',
    tagline: 'Architectural vision meets digital precision.',
    description: 'A sophisticated digital catalog for a boutique architectural firm. Our engineering team developed a robust frontend that allows the client to seamlessly manage complex project portfolios while maintaining a sleek, fast, and accessible user interface.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS'],
    services: ['Frontend Development', 'Responsive Design'],
    liveUrl: 'https://designerss.netlify.app/',
    screenshot: '/projects/designerss.webp',
    gridSpan: 'md:col-span-1 lg:col-span-5',
    featured: false,
  },
  {
    id: 3,
    title: 'PharmaCare Platform',
    industry: 'Healthcare & Pharma',
    category: 'Healthcare',
    tagline: 'Secure, scalable healthcare technology.',
    description: 'A robust demonstration platform showcasing pharmaceutical product management. We architected a scalable frontend capable of handling complex data tables and state management, ensuring medical professionals can securely and efficiently access critical product documentation.',
    technologies: ['React', 'Node.js', 'Tailwind CSS'],
    services: ['Full-stack Development', 'Data Visualization'],
    liveUrl: 'https://pharmaceutical-demo.vercel.app/',
    screenshot: '/projects/pharmacare.webp',
    gridSpan: 'md:col-span-1 lg:col-span-5',
    featured: true,
  },
  {
    id: 4,
    title: 'Elegant Wedding',
    industry: 'Personal Branding',
    category: 'Personal',
    tagline: 'A seamless digital celebration.',
    description: 'A bespoke personal branding and digital invitation platform. Our focus was on engineering a deeply personalized, immersive experience utilizing complex CSS animations and state-driven storytelling, wrapped in a lightweight web application.',
    technologies: ['React', 'Framer Motion', 'Tailwind CSS'],
    services: ['UI/UX Design', 'Frontend Development'],
    liveUrl: 'https://wedding-portfolio-lilac.vercel.app/',
    screenshot: '/projects/wedding.webp',
    gridSpan: 'md:col-span-1 lg:col-span-7',
    featured: true,
  },
  {
    id: 5,
    title: 'Navnidhi Trading',
    industry: 'Corporate & Industrial',
    category: 'Corporate',
    tagline: 'Modernizing industrial supply chains.',
    description: 'A comprehensive corporate portal for an industrial trading enterprise. We delivered a highly performant, SEO-optimized platform that serves as a digital storefront for B2B clients, integrating robust product categorization and streamlined inquiry workflows.',
    technologies: ['Next.js', 'React', 'Tailwind CSS'],
    services: ['Frontend Development', 'SEO Optimization'],
    liveUrl: 'https://navnidhitrading.netlify.app/',
    screenshot: '/projects/navnidhi.webp',
    gridSpan: 'md:col-span-1 lg:col-span-7',
    featured: true,
  },
  {
    id: 7,
    title: 'ShivedLife Medicare',
    industry: 'Healthcare',
    category: 'Healthcare',
    tagline: 'Connecting patients with care.',
    description: 'A secure, accessible platform designed for a regional healthcare provider. Our team engineered a compliant, mobile-first interface that facilitates seamless patient navigation and critical information retrieval under strict performance budgets.',
    technologies: ['React', 'Next.js', 'TypeScript'],
    services: ['Frontend Development', 'Accessibility'],
    liveUrl: 'https://shivedlifemedicare.vercel.app/',
    screenshot: '/projects/shivedlife.webp',
    gridSpan: 'md:col-span-1 lg:col-span-5',
    featured: false,
  },
  {
    id: 8,
    title: 'BookVerse',
    industry: 'E-Commerce & Education',
    category: 'E-commerce',
    tagline: 'A scalable marketplace for knowledge.',
    description: 'A robust e-commerce backend and frontend integration for a digital bookstore. We architected a scalable microservices-oriented backend utilizing Node.js and MongoDB to handle secure user authentication and seamless transactional workflows.',
    technologies: ['Node.js', 'Express', 'React', 'MongoDB'],
    services: ['Backend Development', 'API Integration'],
    liveUrl: 'https://online-book-store-backend-psi.vercel.app/',
    screenshot: '/projects/bookverse.webp',
    gridSpan: 'md:col-span-2 lg:col-span-12',
    featured: false,
  }
];
