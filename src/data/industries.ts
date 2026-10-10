import type { LucideIcon } from 'lucide-react';
import { Building2, Cloud, Factory, HeartPulse, Landmark, ShoppingCart, Truck } from 'lucide-react';

export interface IndustryChallenge {
  title: string;
  problem: string;
  solution: string;
}

export interface Industry {
  slug: string;
  label: string;
  /** One-liner shown in the navbar dropdown. */
  navDesc: string;
  icon: LucideIcon;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  intro: string;
  /** Each problem is paired with the solution we offer for it. */
  challenges: IndustryChallenge[];
  /** What we typically build for this industry. */
  builds: string[];
  /** Case study slugs from `projects.ts` relevant to this industry. */
  related?: string[];
}

export const industries: Industry[] = [
  {
    slug: 'real-estate',
    label: 'Real Estate',
    navDesc: 'CRMs, portals and AI assistants for property businesses.',
    icon: Building2,
    metaTitle: 'Real Estate Software Development | Orbit Dev Studios',
    metaDescription: 'Real estate CRMs, listing portals and AI enquiry assistants that help agencies, brokers and developers follow up faster and close more deals.',
    headline: 'Software that keeps property deals moving',
    intro: 'Agencies, brokers and developers lose buyers to slow follow-up and scattered listings. We build the CRMs, portals and AI assistants that keep every enquiry, listing and deal in one place.',
    challenges: [
      {
        title: 'Leads go cold',
        problem: 'Enquiries arrive from portals, WhatsApp, calls and your website, and slip through the cracks before anyone follows up.',
        solution: 'A property CRM that pulls every enquiry into one pipeline, assigns it to an agent and reminds them to follow up.',
      },
      {
        title: 'Listings fall out of date',
        problem: 'Listings are updated by hand across the website and portals, so buyers keep seeing sold or wrongly priced properties.',
        solution: 'A listings portal with one source of truth: update a property once and it changes everywhere, with search and filters buyers actually use.',
      },
      {
        title: 'Agents answer the same questions',
        problem: 'Agents spend hours repeating details on price, location, availability and site visits.',
        solution: 'An AI assistant trained on your listings that answers buyers around the clock, qualifies them and books site visits into the agent’s calendar.',
      },
    ],
    builds: ['Property CRM', 'Listing websites & portals', 'AI enquiry assistant', 'Site-visit booking', 'Tenant & owner portals', 'Lead-source analytics'],
  },
  {
    slug: 'healthcare',
    label: 'Healthcare',
    navDesc: 'Patient portals, scheduling and clinical knowledge tools.',
    icon: HeartPulse,
    metaTitle: 'Healthcare Software Development | Orbit Dev Studios',
    metaDescription: 'Patient portals, online scheduling and clinical knowledge tools for clinics, hospitals and pharmacies, built with data protection in mind from day one.',
    headline: 'Digital care that’s easier for patients and staff',
    intro: 'Clinics and hospitals juggle phone bookings, paper records and staff who can’t find the right protocol fast. We build patient portals, scheduling and clinical knowledge tools with data protection designed in from the start.',
    challenges: [
      {
        title: 'Booking happens by phone',
        problem: 'Front desks are tied up on calls all day, and no-shows leave gaps in the schedule.',
        solution: 'Online scheduling with real-time availability, automated reminders and easy rescheduling to cut no-shows.',
      },
      {
        title: 'Patients chase their own records',
        problem: 'Patients call and email to get reports, prescriptions and bills.',
        solution: 'A secure, mobile-first patient portal for appointments, reports, prescriptions and payments.',
      },
      {
        title: 'Knowledge is hard to find',
        problem: 'Staff lose time searching PDFs and binders for protocols and drug information.',
        solution: 'A clinical knowledge assistant that searches your approved documents and answers with sources, so staff get the right answer fast.',
      },
    ],
    builds: ['Patient portals', 'Appointment scheduling', 'Telemedicine', 'Clinical knowledge search', 'Pharmacy & e-prescriptions', 'Role-based admin dashboards'],
    related: ['shivedlife-medicare', 'pharmacare-platform'],
  },
  {
    slug: 'manufacturing',
    label: 'Manufacturing',
    navDesc: 'ERP, IoT monitoring and predictive maintenance.',
    icon: Factory,
    metaTitle: 'Manufacturing Software Development | Orbit Dev Studios',
    metaDescription: 'Custom ERP, IoT machine monitoring and predictive maintenance software that gives manufacturers a live view of orders, stock and production.',
    headline: 'Connected systems for the factory floor',
    intro: 'Many manufacturers still run on spreadsheets, paper job cards and machines nobody can see remotely. We build ERP, IoT monitoring and maintenance tools that give you a live view of production.',
    challenges: [
      {
        title: 'Data lives in silos',
        problem: 'Orders, inventory and production sit in separate spreadsheets, so nobody knows true stock or order status.',
        solution: 'A custom ERP that links orders, inventory, purchasing and production in one system, built around how your plant actually works.',
      },
      {
        title: 'Machines are a black box',
        problem: 'You only find out a machine is down or underperforming when someone walks past it.',
        solution: 'IoT dashboards that stream machine data in real time and alert the right person when readings drift out of range.',
      },
      {
        title: 'Breakdowns stop the line',
        problem: 'Maintenance is reactive, so failures halt production without warning.',
        solution: 'Predictive maintenance that tracks machine history and sensor trends to schedule servicing before parts fail.',
      },
    ],
    builds: ['Custom ERP', 'IoT monitoring dashboards', 'Predictive maintenance', 'Inventory & procurement', 'Production planning', 'Quality & batch tracking'],
    related: ['probuild-erp', 'navnidhi-trading'],
  },
  {
    slug: 'finance',
    label: 'Finance',
    navDesc: 'Secure portals, automation and compliance workflows.',
    icon: Landmark,
    metaTitle: 'Finance Software Development | Orbit Dev Studios',
    metaDescription: 'Secure client portals, document automation and compliance workflows for lenders, advisory firms and finance teams.',
    headline: 'Secure, automated finance operations',
    intro: 'Lenders, advisory firms and finance teams handle sensitive data, manual paperwork and constant compliance checks. We build secure portals and automation that cut the busywork without cutting corners.',
    challenges: [
      {
        title: 'Documents arrive over email',
        problem: 'Clients send KYC documents and statements over email and WhatsApp, which is slow and insecure.',
        solution: 'A secure client portal with encrypted document upload, e-signatures and a clear status for every application.',
      },
      {
        title: 'Teams re-key the same data',
        problem: 'Staff copy data from forms and PDFs into several systems, causing delays and errors.',
        solution: 'Workflow automation that extracts data from documents, validates it and pushes it into your core systems.',
      },
      {
        title: 'Audits mean digging through inboxes',
        problem: 'Approvals and evidence are scattered, so every audit turns into a scramble.',
        solution: 'Compliance workflows with role-based approvals, full audit trails and reports ready when auditors ask.',
      },
    ],
    builds: ['Client & investor portals', 'KYC & onboarding', 'Loan & application workflows', 'Document automation', 'Audit trails & reporting', 'Financial dashboards'],
  },
  {
    slug: 'ecommerce-retail',
    label: 'E-commerce & Retail',
    navDesc: 'Storefronts, inventory sync and AI customer support.',
    icon: ShoppingCart,
    metaTitle: 'E-commerce & Retail Development | Orbit Dev Studios',
    metaDescription: 'Fast storefronts, inventory sync across channels and AI customer support that help online and retail brands sell more with less manual work.',
    headline: 'Stores that sell more and run smoother',
    intro: 'Online and retail brands lose sales to slow pages, overselling and support queues that never shrink. We build fast storefronts and the back-office tools that keep orders, stock and customers in sync.',
    challenges: [
      {
        title: 'Shoppers drop off',
        problem: 'Slow pages and a clunky checkout lose customers, especially on mobile.',
        solution: 'Fast, mobile-first storefronts with a short checkout and the payment methods your customers expect.',
      },
      {
        title: 'Stock is out of sync',
        problem: 'Stock is tracked separately for your website, marketplaces and shop, leading to overselling.',
        solution: 'Inventory sync that keeps stock levels accurate across your website, marketplaces and POS in real time.',
      },
      {
        title: 'Support never stops',
        problem: 'Your team answers the same “where is my order?” and sizing questions all day.',
        solution: 'AI customer support that answers order, product and return questions instantly and hands complex cases to your team.',
      },
    ],
    builds: ['Custom storefronts', 'Shopify & headless commerce', 'Inventory & order sync', 'AI support assistant', 'Payments & checkout', 'Admin & sales analytics'],
    related: ['orbit-food', 'bookverse'],
  },
  {
    slug: 'saas',
    label: 'SaaS',
    navDesc: 'Multi-tenant products built to scale from day one.',
    icon: Cloud,
    metaTitle: 'SaaS Product Development | Orbit Dev Studios',
    metaDescription: 'Multi-tenant SaaS products with authentication, roles, subscription billing and analytics built in, so founders can launch fast and scale without a rewrite.',
    headline: 'SaaS products built to scale from day one',
    intro: 'Founders need to launch quickly without building on foundations that crack at the first hundred customers. We build multi-tenant SaaS products with billing, roles and analytics built in.',
    challenges: [
      {
        title: 'The MVP can’t scale',
        problem: 'A rushed MVP works for the first few customers, then needs a costly rewrite.',
        solution: 'Multi-tenant architecture from the start, with clean data separation per customer so you can grow without rebuilding.',
      },
      {
        title: 'Months lost on the basics',
        problem: 'Auth, roles, billing and onboarding eat months before a single core feature ships.',
        solution: 'Proven building blocks for sign-up, team roles, subscription billing and onboarding, so your budget goes into the product.',
      },
      {
        title: 'No view of usage or churn',
        problem: 'You can’t see which features customers use or why they leave.',
        solution: 'Product analytics and admin dashboards that show usage, revenue and churn signals for every account.',
      },
    ],
    builds: ['Multi-tenant platforms', 'Subscription billing', 'Roles & permissions', 'Admin dashboards', 'AI features', 'Public APIs & integrations'],
    related: ['recruitiq', 'knowledgevoice'],
  },
  {
    slug: 'logistics',
    label: 'Logistics',
    navDesc: 'Fleet tracking, route planning and warehouse systems.',
    icon: Truck,
    metaTitle: 'Logistics Software Development | Orbit Dev Studios',
    metaDescription: 'Fleet tracking, route planning and warehouse management software that gives logistics companies real-time visibility of vehicles, stock and deliveries.',
    headline: 'Real-time visibility across your supply chain',
    intro: 'Logistics teams run on phone calls, spreadsheets and guesswork about where vehicles and stock are. We build fleet tracking, route planning and warehouse systems that show what’s happening right now.',
    challenges: [
      {
        title: '“Where’s the truck?”',
        problem: 'Dispatchers call drivers for updates, and customers call dispatchers for ETAs.',
        solution: 'Live fleet tracking with GPS, trip status and automatic ETA updates for your team and your customers.',
      },
      {
        title: 'Routes waste time and fuel',
        problem: 'Routes are planned by hand, burning fuel and driver hours.',
        solution: 'Route planning that optimizes stops by distance, delivery windows and vehicle capacity.',
      },
      {
        title: 'Warehouse mistakes',
        problem: 'Paper pick lists and manual counts lead to wrong shipments and lost stock.',
        solution: 'A warehouse system with barcode scanning, guided pick-and-pack and live stock levels.',
      },
    ],
    builds: ['Fleet tracking', 'Route optimization', 'Warehouse management', 'Driver mobile apps', 'Proof of delivery', 'Customer tracking pages'],
  },
];

export const industryPath = (slug: string) => `/industries/${slug}`;

export function getIndustryBySlug(slug: string | undefined): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}
