export interface IndustryItem {
  id: string;
  iconName: string;
  iconClassName?: string;
  title: string;
  desc: string;
  className: string;
  tech: string[];
  stats?: { label: string; value: string };
  bgImage?: string;
}

export const industries: IndustryItem[] = [
  {
    id: "healthcare",
    iconName: "HeartPulse",
    iconClassName: "text-white",
    title: "Healthcare & Medical",
    desc: "Secure, HIPAA-compliant patient portals, telemedicine platforms, and scalable clinical management systems engineered for uncompromising data integrity.",
    className: "col-span-1 md:col-span-2 lg:col-span-2 row-span-2",
    tech: ["React", "Node.js", "AWS", "PostgreSQL"],
    stats: { label: "Uptime", value: "99.99%" },
    bgImage: "/healthcare.webp"
  },
  {
    id: "ecommerce",
    iconName: "ShoppingCart",
    iconClassName: "text-[#4F8CFF]",
    title: "E-Commerce",
    desc: "High-converting, globally scalable storefronts featuring lightning-fast checkouts and headless architecture.",
    className: "col-span-1 md:col-span-2 lg:col-span-2 row-span-1",
    tech: ["Next.js", "Shopify Plus", "Stripe"]
  },
  {
    id: "architecture",
    iconName: "Building2",
    title: "Architecture",
    desc: "Robust firm websites showcasing high-res blueprints and project timelines.",
    className: "col-span-1 md:col-span-1 lg:col-span-1 row-span-1",
    tech: ["Three.js", "WebGL"]
  },
  {
    id: "interior",
    iconName: "Palette",
    title: "Interior Design",
    desc: "Immersive 3D visualization galleries that close premium clients.",
    className: "col-span-1 md:col-span-1 lg:col-span-1 row-span-1",
    tech: ["React", "Framer"]
  },
  {
    id: "portfolio",
    iconName: "Briefcase",
    title: "Custom Portfolios",
    desc: "Bespoke digital resumes, creative showcases, and interactive wedding portals that tell your unique story beautifully.",
    className: "col-span-1 md:col-span-2 lg:col-span-2 row-span-1",
    tech: ["Gatsby", "Tailwind"]
  },
  {
    id: "travel",
    iconName: "Plane",
    title: "Travel Agencies",
    desc: "Dynamic booking engines and automated ticketing systems.",
    className: "col-span-1 md:col-span-1 lg:col-span-1 row-span-1",
    tech: ["GraphQL", "Redis"]
  },
  {
    id: "cafe",
    iconName: "Coffee",
    title: "Restaurant",
    desc: "QR menu systems and real-time reservations.",
    className: "col-span-1 md:col-span-1 lg:col-span-1 row-span-1",
    tech: ["React Native"]
  }
];
