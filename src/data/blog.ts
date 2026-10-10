/**
 * Blog content + helpers.
 *
 * Article bodies are stored as typed content blocks (no markdown library).
 * Inline text inside blocks supports two tiny syntaxes, rendered as React
 * elements by `src/components/blog/InlineText.tsx`:
 *   **bold**            -> <strong>
 *   [label](/path)      -> internal <Link> (or external <a> for http URLs)
 */

export const BLOG_CATEGORIES = [
  'Web Development',
  'UI/UX',
  'Business',
  'E-commerce',
  'Technology',
  'Website Optimization',
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export type CalloutTone = 'info' | 'tip' | 'warning';

export type ContentBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'quote'; text: string; cite?: string }
  | { type: 'callout'; text: string; title?: string; tone?: CalloutTone };

export interface BlogAuthor {
  name: string;
  role: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  category: BlogCategory;
  tags: string[];
  author: BlogAuthor;
  /** ISO date, e.g. 2026-06-01 */
  publishDate: string;
  /** ISO date, only when the article was meaningfully revised */
  updatedDate?: string;
  blocks: ContentBlock[];
}

export const BLOG_AUTHOR: BlogAuthor = {
  name: 'Orbit Dev Studios Team',
  role: 'Editorial',
};

/* ------------------------------------------------------------------ */
/* Posts                                                               */
/* ------------------------------------------------------------------ */

const posts: BlogPost[] = [
  {
    slug: 'signs-your-business-website-needs-a-redesign',
    title: '10 Signs Your Business Website Needs a Redesign',
    metaTitle: '10 Signs Your Business Website Needs a Redesign | Orbit Dev Studios',
    metaDescription:
      'Slow pages, a poor mobile experience, unclear messaging and no clear next step: ten signs your business website needs a redesign, and how to approach it.',
    excerpt:
      'Websites age quietly. Here are ten practical signs that your site has started working against your business, and how to plan a redesign that fixes the root causes.',
    category: 'UI/UX',
    tags: ['Redesign', 'UX', 'Conversion', 'Mobile', 'Branding'],
    author: BLOG_AUTHOR,
    publishDate: '2026-06-01',
    blocks: [
      {
        type: 'p',
        text: 'Websites age quietly. Nothing breaks on a particular day. Instead, small frictions pile up until the site that once felt modern starts working against you. Because you see it every day, it is easy to miss. Visitors do not have that familiarity: they judge your site in seconds, and they judge your business along with it.',
      },
      {
        type: 'p',
        text: 'Below are ten signs that it is time to stop patching and start planning a redesign. If several of them sound familiar, a rebuild will often cost less in the long run than continuing to work around the problems.',
      },
      { type: 'h2', text: '1. It is awkward to use on a phone' },
      {
        type: 'p',
        text: 'A large share of business traffic now arrives on mobile devices. If visitors have to pinch, zoom or hunt for a tap target, many will leave before they ever read your offer. Check your own site on a small phone: can you find the phone number, the main service and the contact form within a few seconds?',
      },
      { type: 'h2', text: '2. It loads slowly' },
      {
        type: 'p',
        text: 'Slow pages frustrate visitors and can hold back your search visibility. Heavy images, bloated themes and stacks of plugins are the usual culprits. Sometimes a focused performance pass is enough. When the slowness comes from the platform itself, a redesign is the cleaner fix. Our guide on [how to improve website performance](/blog/how-to-improve-website-performance) covers the quick wins.',
      },
      { type: 'h2', text: '3. Your brand has moved on, but your site has not' },
      {
        type: 'p',
        text: 'If your logo, services, pricing or positioning have changed and the website still reflects the old version of your company, prospects get mixed messages. A site that describes the business you were three years ago undermines trust in the business you are now.',
      },
      { type: 'h2', text: '4. Visitors cannot tell what you do' },
      {
        type: 'p',
        text: 'Read your homepage headline aloud. Does it say clearly who you help and what you deliver? Vague slogans like "Innovative solutions for tomorrow" force visitors to work out your offer for themselves. Most will not bother.',
      },
      { type: 'h2', text: '5. There is no obvious next step' },
      {
        type: 'p',
        text: 'Every key page should guide visitors toward one primary action: a call, a quote request, a booking. If your contact details are buried in the footer, or your forms ask for too much, interested visitors fall through the cracks.',
      },
      { type: 'h2', text: '6. You cannot update it without help' },
      {
        type: 'p',
        text: 'When changing a phone number or adding a new project requires a developer, content goes stale. A modern site should let your team edit everyday content safely while keeping the design consistent.',
      },
      { type: 'h2', text: '7. It looks dated next to competitors' },
      {
        type: 'p',
        text: 'Prospects often compare several providers in one sitting. If your competitors’ sites look cleaner and more credible, you start that comparison at a disadvantage, even if your actual work is better.',
      },
      { type: 'h2', text: '8. It shows security or maintenance warnings' },
      {
        type: 'p',
        text: 'Outdated plugins, an unsupported CMS version, or browser warnings about an insecure connection are more than technical debt. They are a risk to your data and your reputation, and they tell visitors the site is not being looked after.',
      },
      { type: 'h2', text: '9. It does not show up for what you sell' },
      {
        type: 'p',
        text: 'If you appear in search for your own company name but not for the services you offer, the site’s structure and content may be the problem. Clear service pages, sensible headings, fast load times and clean code give search engines something to work with.',
      },
      { type: 'h2', text: '10. You cannot measure what is working' },
      {
        type: 'p',
        text: 'Without analytics and conversion tracking, you cannot tell which pages bring in enquiries and which lose them. A redesign is a good moment to set up measurement properly, so future decisions are based on evidence rather than guesswork.',
      },
      {
        type: 'callout',
        tone: 'tip',
        title: 'Redesign or refresh?',
        text: 'If your issues are mostly about content and visuals, a refresh may be enough. If they involve speed, mobile usability, editing or security, the problems usually sit in the foundation, and a rebuild is the more reliable path.',
      },
      { type: 'h2', text: 'How to approach a redesign' },
      {
        type: 'p',
        text: 'A good redesign starts with goals, not colours. Before anyone opens a design tool, agree on the following:',
      },
      {
        type: 'ul',
        items: [
          '**Who the site is for** and what they need to know before they get in touch.',
          '**What a successful visit looks like**: a call, a form submission, a booking or a purchase.',
          '**What to keep.** Pages that already rank or convert should be preserved, or redirected carefully to their new addresses.',
          '**How you will measure results** after launch, so you can tell whether the new site is doing its job.',
        ],
      },
      {
        type: 'p',
        text: 'From there, the work moves through content planning, wireframes, visual design, development and testing. You can see how we run each stage on our [services page](/services), and examples of finished work in our [portfolio](/portfolio).',
      },
      { type: 'h2', text: 'Not sure where your site stands?' },
      {
        type: 'p',
        text: 'If you recognised your website in a few of these signs but are not sure what to prioritise, start with an outside view. Our [free website audit](/free-audit) reviews your site’s speed, mobile experience, clarity and conversion path, and gives you a plain-language list of what to fix first.',
      },
    ],
  },

  {
    slug: 'how-a-better-website-can-generate-more-leads',
    title: 'How a Better Website Can Generate More Leads',
    metaTitle: 'How a Better Website Can Generate More Leads | Orbit Dev Studios',
    metaDescription:
      'Clear messaging, simple forms, visible trust signals and fast mobile pages: a practical guide to turning your website into a dependable source of leads.',
    excerpt:
      'Most business websites are built as brochures. Here is how clarity, trust, speed and a frictionless next step turn the same traffic into more conversations.',
    category: 'Business',
    tags: ['Lead Generation', 'Conversion', 'Copywriting', 'Forms', 'Local SEO'],
    author: BLOG_AUTHOR,
    publishDate: '2026-06-18',
    blocks: [
      {
        type: 'p',
        text: 'For most service businesses, a website has one main job: turning interested visitors into conversations. Yet many sites are built as digital brochures. They are pleasant to look at, but offer no clear path from "this looks interesting" to "let’s talk". The good news is that the changes that generate more leads are rarely mysterious. They come down to clarity, trust, speed and making it easy to get in touch.',
      },
      { type: 'h2', text: 'Start with a clear promise' },
      {
        type: 'p',
        text: 'Visitors decide quickly whether they are in the right place. Your headline should answer three questions: what you do, who it is for, and why it is worth their time. "Commercial roof repairs for property managers, with a written quote after every inspection" does far more work than "Quality you can trust".',
      },
      {
        type: 'p',
        text: 'Support the headline with a short line that addresses the visitor’s main concern, whether that is price, speed, reliability or expertise, and a primary button that says exactly what happens next.',
      },
      { type: 'h2', text: 'Make the next step obvious' },
      {
        type: 'p',
        text: 'Every important page should have one primary call to action. Secondary options are fine, but they should not compete with it. A few practical rules:',
      },
      {
        type: 'ul',
        items: [
          'Place the main call to action near the top of the page and repeat it after key sections.',
          'Use specific labels such as "Request a Quote" or "Book a Free Consultation" instead of "Submit".',
          'Show a tap-to-call phone number on mobile, where many visitors would rather ring than type.',
          'Keep the contact page simple, with the form at the top rather than below a large map.',
        ],
      },
      { type: 'h2', text: 'Reduce friction in your forms' },
      {
        type: 'p',
        text: 'Forms are where leads are won or lost, and every extra field is another reason to give up. Ask only for what you need to start the conversation: usually a name, contact details and a short description of the project. You can qualify the lead further on the call.',
      },
      {
        type: 'p',
        text: 'A few details make a real difference. Tell people what happens after they submit and how soon you will respond. Show clear, friendly error messages. Make sure the form works on every device, and test it yourself regularly. Broken forms are more common than most owners realise, and they fail silently.',
      },
      { type: 'h2', text: 'Build trust before you ask for it' },
      {
        type: 'p',
        text: 'People contact businesses they believe will do a good job. Your website should show evidence rather than simply making claims:',
      },
      {
        type: 'ul',
        items: [
          '**Real work:** project photos, case studies and before-and-after examples.',
          '**Real reviews:** testimonials with names and context, ideally linked to a public review platform.',
          '**Credentials:** licences, insurance, certifications and memberships relevant to your industry.',
          '**A human face:** a short section introducing your team or founder.',
        ],
      },
      {
        type: 'p',
        text: 'Our [case studies](/case-studies) page is an example of how project stories can do this work for you, explaining the problem, the approach and the result in plain language.',
      },
      { type: 'h2', text: 'Be fast and work well on mobile' },
      {
        type: 'p',
        text: 'A slow or clumsy mobile experience quietly costs leads, because visitors rarely complain. They simply leave. Compress your images, limit heavy scripts, and test your key pages on a mid-range phone over mobile data rather than on office Wi-Fi.',
      },
      { type: 'h2', text: 'Create pages that match what people search for' },
      {
        type: 'p',
        text: 'A single "Services" page that lists everything you do is hard for both visitors and search engines to understand. Dedicated pages for each core service, and for each area you serve where that is relevant, let you answer specific questions and appear for specific searches. Each page should explain the service, show relevant examples, answer common questions and finish with a clear call to action.',
      },
      { type: 'h2', text: 'Capture visitors who are not ready yet' },
      {
        type: 'p',
        text: 'Not everyone is ready to talk on their first visit. Give them a lower-commitment option, such as a free checklist, a cost guide, a newsletter or an audit. These offers keep the relationship going and give you a respectful way to follow up later.',
      },
      { type: 'h2', text: 'Measure, then improve' },
      {
        type: 'p',
        text: 'Lead generation improves fastest when you can see what is happening. Set up analytics events for form submissions, phone clicks and email clicks so you know which pages and channels produce enquiries. Then make one change at a time and watch the results before moving on to the next.',
      },
      {
        type: 'callout',
        tone: 'info',
        title: 'What "better" really means',
        text: 'A better website is not necessarily a bigger or flashier one. It is the one that gives the right visitor the right information and an easy next step, with as little friction as possible.',
      },
      { type: 'h2', text: 'Where to start' },
      {
        type: 'p',
        text: 'If you are unsure which of these changes would make the biggest difference for your site, a [free website audit](/free-audit) is a practical first step. If you already know you need a new site built around lead generation, see how we approach it on our [services page](/services), or [start your project](/hire) with us.',
      },
    ],
  },

  {
    slug: 'website-vs-web-application',
    title: 'Website vs Web Application: What’s the Difference?',
    metaTitle: 'Website vs Web Application: What’s the Difference? | Orbit Dev Studios',
    metaDescription:
      'Websites present information; web applications let users log in, manage data and complete tasks. Learn the differences in scope, cost, security and maintenance.',
    excerpt:
      'The two terms are used interchangeably, but they describe very different projects. Here is how to tell which one you need before you brief a developer.',
    category: 'Web Development',
    tags: ['Web Apps', 'Websites', 'Planning', 'Architecture', 'Budgeting'],
    author: BLOG_AUTHOR,
    publishDate: '2026-07-06',
    blocks: [
      {
        type: 'p',
        text: '"Website" and "web application" are often used interchangeably, but they describe different kinds of projects with different costs, timelines and skills. Knowing which one you need, or whether you need both, makes it much easier to brief a developer, compare quotes and plan your budget.',
      },
      { type: 'h2', text: 'The short answer' },
      {
        type: 'p',
        text: 'A **website** primarily presents information. Visitors read, browse and contact you. A **web application** primarily lets users do things: log in, create and manage data, complete transactions and see results that are specific to them.',
      },
      {
        type: 'p',
        text: 'In practice it is a spectrum rather than a strict divide. A marketing site with a booking form has a little application logic, and most software products have a marketing website in front of them.',
      },
      { type: 'h2', text: 'What a website typically includes' },
      {
        type: 'ul',
        items: [
          'Pages that describe your business, services, team and previous work',
          'Contact forms, maps and tap-to-call links',
          'A blog or news section managed through a content management system',
          'Search engine optimisation and analytics',
          'Largely the same content for every visitor',
        ],
      },
      {
        type: 'p',
        text: 'The main concerns are clarity, design, speed, search visibility and conversion. Most content can be prepared in advance and served quickly, which keeps hosting simple and affordable.',
      },
      { type: 'h2', text: 'What a web application typically includes' },
      {
        type: 'ul',
        items: [
          'User accounts, authentication and permissions',
          'A database that stores and updates user data',
          'Business logic such as calculations, workflows, approvals and notifications',
          'Dashboards, reports and admin tools',
          'Integrations with payment providers, CRMs or other systems through APIs',
        ],
      },
      {
        type: 'p',
        text: 'Here the main concerns shift to data modelling, security, reliability and how the system behaves as more people use it. Common examples include customer portals, booking and scheduling systems, internal tools, marketplaces and subscription software.',
      },
      { type: 'h2', text: 'The key differences' },
      { type: 'h3', text: 'Interaction' },
      {
        type: 'p',
        text: 'Websites are mostly read; applications are mostly used. If your users need to come back, sign in and complete tasks, you are in application territory.',
      },
      { type: 'h3', text: 'Content versus data' },
      {
        type: 'p',
        text: 'Website content is written by your team and changes occasionally. Application data is created by users and changes constantly, which calls for a proper back end and careful database design.',
      },
      { type: 'h3', text: 'Complexity and cost' },
      {
        type: 'p',
        text: 'Applications involve more moving parts, including authentication, permissions, automated testing, error handling and infrastructure. As a result they generally take longer to build and cost more to maintain than a content website of similar visual scope. Our [pricing page](/pricing) outlines how we scope both types of project.',
      },
      { type: 'h3', text: 'Security' },
      {
        type: 'p',
        text: 'Every site needs basic security, but an application that stores personal or financial information needs careful attention to access control, data protection and regular updates.',
      },
      { type: 'h3', text: 'Maintenance' },
      {
        type: 'p',
        text: 'A well-built website can run for long periods with light upkeep. An application is closer to a living product: it needs monitoring, bug fixes, dependency updates and new features as your users’ needs change.',
      },
      { type: 'h2', text: 'How to decide what you need' },
      { type: 'p', text: 'Ask yourself a few questions:' },
      {
        type: 'ol',
        items: [
          'Do users need to log in to see or do something specific to them?',
          'Will users create, edit or store their own data?',
          'Do you need to automate a process that currently runs on spreadsheets, email or paper?',
          'Will the system need to take payments or connect to other business software?',
        ],
      },
      {
        type: 'p',
        text: 'If you answered "no" to all of these, you most likely need a website. If you answered "yes" to one or more, you probably need some application functionality, either as a full web application or as specific features added to a website.',
      },
      {
        type: 'callout',
        tone: 'tip',
        title: 'Start small where you can',
        text: 'Many successful products begin as a focused website plus one application feature, such as an online booking flow or a simple client portal, and grow from there once real users show what they need.',
      },
      { type: 'h2', text: 'Can one project be both?' },
      {
        type: 'p',
        text: 'Yes, and many are. A common pattern is a fast, search-friendly marketing website that handles discovery and lead generation, connected to a separate application that customers sign in to. Keeping the two distinct lets each be built with the right tools: the marketing site can be optimised for speed and search, while the application focuses on functionality and security.',
      },
      { type: 'h2', text: 'Getting the brief right' },
      {
        type: 'p',
        text: 'Whichever you need, a clear brief saves time and money. Describe your users, the tasks they need to complete, the information you need to store and the systems you already rely on. A good development partner will help you separate must-have features from nice-to-haves and suggest a sensible first release.',
      },
      {
        type: 'p',
        text: 'Explore the kinds of websites and applications we build on our [services page](/services), browse finished projects in our [portfolio](/portfolio), or read our [FAQ](/faq) for common questions about timelines and process. When you are ready, [tell us about your project](/hire).',
      },
    ],
  },

  {
    slug: 'how-to-improve-website-performance',
    title: 'How to Improve Website Performance',
    metaTitle: 'How to Improve Website Performance | Orbit Dev Studios',
    metaDescription:
      'A prioritised guide to faster websites: measure first, understand Core Web Vitals, optimise images, trim JavaScript and keep your site fast after launch.',
    excerpt:
      'Most slow websites share the same handful of causes. A prioritised, practical approach to measuring and fixing performance, from images and scripts to hosting.',
    category: 'Website Optimization',
    tags: ['Performance', 'Core Web Vitals', 'Images', 'SEO', 'Hosting'],
    author: BLOG_AUTHOR,
    publishDate: '2026-07-23',
    updatedDate: '2026-09-10',
    blocks: [
      {
        type: 'p',
        text: 'A fast website feels trustworthy. Pages appear immediately, buttons respond when tapped and nothing jumps around while it loads. A slow one feels broken, even when it technically works. Performance also matters for search: Google uses page experience signals, including Core Web Vitals, as part of how it evaluates pages.',
      },
      {
        type: 'p',
        text: 'Most performance problems come from a handful of common causes. Here is a practical, prioritised way to tackle them.',
      },
      { type: 'h2', text: 'Measure before you change anything' },
      {
        type: 'p',
        text: 'Start with a baseline so you know whether your changes actually help. Useful free tools include:',
      },
      {
        type: 'ul',
        items: [
          '**PageSpeed Insights** combines lab tests with real-user data from Chrome, where enough data is available.',
          '**Lighthouse**, built into Chrome DevTools, runs a detailed lab audit with specific recommendations.',
          '**The Network panel** in DevTools shows exactly what loads, in what order and how large each file is.',
        ],
      },
      {
        type: 'p',
        text: 'Test your most important pages, usually the homepage, key service pages and the contact page, using mobile settings, since that is where problems are most visible.',
      },
      { type: 'h2', text: 'Understand the Core Web Vitals' },
      { type: 'p', text: 'Google’s Core Web Vitals focus on three aspects of the user experience:' },
      {
        type: 'ul',
        items: [
          '**Largest Contentful Paint (LCP):** how quickly the main content appears.',
          '**Interaction to Next Paint (INP):** how quickly the page responds to taps, clicks and key presses.',
          '**Cumulative Layout Shift (CLS):** how much the layout moves unexpectedly while the page loads.',
        ],
      },
      {
        type: 'p',
        text: 'You do not need to memorise the thresholds. The tools above flag which metrics need attention and which elements on the page are responsible.',
      },
      { type: 'h2', text: 'Fix images first' },
      {
        type: 'p',
        text: 'Images are often the largest files on a page, so they are usually the quickest win:',
      },
      {
        type: 'ul',
        items: [
          'Serve modern formats such as WebP or AVIF.',
          'Resize images to the size they are actually displayed at, and use responsive image sizes so phones do not download desktop-sized files.',
          'Lazy-load images further down the page, but load the main hero image straight away.',
          'Always set a width and height, or an aspect ratio, so the browser reserves space and the layout does not jump.',
        ],
      },
      { type: 'h2', text: 'Reduce and defer JavaScript' },
      {
        type: 'p',
        text: 'JavaScript is expensive. It has to be downloaded, parsed and executed, and heavy scripts are a common cause of sluggish interactions.',
      },
      {
        type: 'ul',
        items: [
          'Remove plugins, widgets and libraries you no longer use.',
          'Split your code so each page loads only what it needs.',
          'Defer non-critical scripts, such as chat widgets, until the main content is visible.',
          'Audit third-party tags regularly. Each one adds weight and runs code you do not control.',
        ],
      },
      { type: 'h2', text: 'Load fonts carefully' },
      {
        type: 'p',
        text: 'Custom fonts can delay text from appearing. Limit the number of font families and weights, self-host or preload the files you genuinely need, and use font-display: swap so text is readable immediately in a fallback font.',
      },
      { type: 'h2', text: 'Use caching and a CDN' },
      {
        type: 'p',
        text: 'A content delivery network serves your files from locations closer to your visitors, and sensible caching rules mean returning visitors do not download the same files twice. Many modern hosting platforms include both by default; older shared hosting often does not.',
      },
      { type: 'h2', text: 'Pre-render pages where possible' },
      {
        type: 'p',
        text: 'Pages generated in advance as static or pre-rendered HTML can be delivered almost instantly, because the server does not need to build them for every request. For marketing sites, this is often the single biggest structural improvement. Our article on [React vs Next.js](/blog/react-vs-nextjs-for-modern-web-development) explains how rendering choices affect speed.',
      },
      { type: 'h2', text: 'Prevent layout shifts' },
      {
        type: 'p',
        text: 'Unexpected movement is frustrating, especially when it makes someone tap the wrong button. Reserve space for images, embeds and ads; avoid inserting banners above existing content after the page has loaded; and check that web fonts do not drastically change the size of text when they swap in.',
      },
      {
        type: 'callout',
        tone: 'warning',
        title: 'Do not chase a perfect score',
        text: 'Lab scores are a diagnostic tool, not the goal. Prioritise improvements your real visitors will notice, such as faster main content, responsive buttons and a stable layout, over shaving the last few points off a test result.',
      },
      { type: 'h2', text: 'Keep it fast after launch' },
      {
        type: 'p',
        text: 'Performance tends to degrade over time as new images, plugins and tracking scripts are added. Build in a few habits:',
      },
      {
        type: 'ol',
        items: [
          'Re-test key pages after every significant change.',
          'Agree on an image size and format standard for anyone who uploads content.',
          'Review third-party scripts every few months and remove what you no longer use.',
          'Keep your platform, framework and dependencies up to date.',
        ],
      },
      { type: 'h2', text: 'When optimisation is not enough' },
      {
        type: 'p',
        text: 'Sometimes the platform itself is the bottleneck: a heavy theme, an outdated CMS or a page builder that generates bloated code. In those cases targeted fixes only go so far, and rebuilding on a leaner foundation is often the more cost-effective option.',
      },
      {
        type: 'p',
        text: 'If you would like to know where your site stands, our [free website audit](/free-audit) includes a performance review with prioritised recommendations. You can also see how we build fast sites on our [services page](/services).',
      },
    ],
  },

  {
    slug: 'what-makes-a-high-converting-business-website',
    title: 'What Makes a High-Converting Business Website?',
    metaTitle: 'What Makes a High-Converting Business Website? | Orbit Dev Studios',
    metaDescription:
      'One clear goal, an obvious message, real proof, low friction and continuous measurement. The ten qualities that high-converting business websites share.',
    excerpt:
      'High-converting websites are not defined by a colour scheme or a trend. They share a set of underlying qualities, from a single clear goal to proof that earns trust.',
    category: 'UI/UX',
    tags: ['Conversion', 'UX', 'Copywriting', 'Trust', 'Design'],
    author: BLOG_AUTHOR,
    publishDate: '2026-08-11',
    blocks: [
      {
        type: 'p',
        text: 'A high-converting website is not defined by a particular colour scheme or a fashionable layout. It is defined by results: a meaningful share of the right visitors take the action you want, whether that is calling, booking, requesting a quote or buying. The sites that do this well tend to share the same underlying qualities.',
      },
      { type: 'h2', text: '1. It is built around one clear goal' },
      {
        type: 'p',
        text: 'Before design starts, decide what a successful visit looks like. For a contractor it might be a quote request. For a consultancy, a booked discovery call. For a software company, a free trial sign-up. Once that goal is defined, every page can be structured to move visitors toward it.',
      },
      { type: 'h2', text: '2. The message is obvious within seconds' },
      {
        type: 'p',
        text: 'Visitors arrive with a question: "Can this business solve my problem?" The top of your page should answer it directly:',
      },
      {
        type: 'ul',
        items: [
          'A headline that states what you do and who it is for.',
          'A supporting line that addresses the visitor’s biggest concern.',
          'A primary call to action with a specific, descriptive label.',
          'A trust cue nearby, such as a review rating, a recognisable client or a relevant credential.',
        ],
      },
      {
        type: 'p',
        text: 'Clever wordplay rarely beats plain clarity. If a visitor has to guess what you sell, the page is working against you.',
      },
      { type: 'h2', text: '3. It speaks to the customer, not about the company' },
      {
        type: 'p',
        text: 'Many business sites describe their history, values and processes before they mention what the customer actually gets. Flip that order. Lead with the outcomes your customers care about, such as fewer problems, time saved or a finished project they are proud of, and then explain how you deliver them.',
      },
      { type: 'h2', text: '4. It earns trust with evidence' },
      {
        type: 'p',
        text: 'Trust is the bridge between interest and action. High-converting sites show proof instead of simply asserting it:',
      },
      {
        type: 'ul',
        items: [
          'Case studies that explain the problem, the approach and the outcome.',
          'Testimonials attributed to real, named customers.',
          'Photos of real work and real people rather than generic stock imagery.',
          'Clear information about guarantees, your process and what happens after someone gets in touch.',
        ],
      },
      { type: 'h2', text: '5. It removes friction at every step' },
      {
        type: 'p',
        text: 'Small obstacles add up. Common ones include slow pages, confusing navigation, long forms, pop-ups that appear too early and buttons that are hard to tap on a phone. Walk through your site as a first-time visitor on a mobile device and note every moment of hesitation. Each one is a candidate for improvement.',
      },
      { type: 'h2', text: '6. The design guides attention' },
      {
        type: 'p',
        text: 'Good conversion design is about hierarchy. The most important element in each section should be the most visually prominent. Use contrast to make the primary button stand out, whitespace to separate ideas and consistent styling so visitors quickly learn what is clickable. Decorative elements should support the message, never compete with it.',
      },
      { type: 'h2', text: '7. It answers objections before they are raised' },
      {
        type: 'p',
        text: 'Visitors hesitate for predictable reasons: price, timing, risk and uncertainty about the process. Address these on the page with clear pricing guidance or ranges, a simple step-by-step explanation of how you work, and a section of frequently asked questions. Our own [FAQ](/faq) and [pricing](/pricing) pages exist for exactly this reason.',
      },
      { type: 'h2', text: '8. It offers options for different levels of readiness' },
      {
        type: 'p',
        text: 'Some visitors are ready to buy today; others are just researching. Offer a strong primary action for the first group and a lower-commitment option for the second, such as a guide, a checklist, a free consultation or an audit. This keeps undecided visitors engaged rather than losing them entirely.',
      },
      { type: 'h2', text: '9. It is fast and accessible' },
      {
        type: 'p',
        text: 'Speed and accessibility are conversion features. Pages that load quickly and have readable text, sufficient colour contrast, keyboard-friendly navigation and descriptive labels work better for everyone, including visitors on older devices, slow connections or assistive technology.',
      },
      { type: 'h2', text: '10. It is measured and improved over time' },
      {
        type: 'p',
        text: 'Conversion work is never finished. Track the actions that matter, such as form submissions, calls and bookings, and review the data regularly. Test one change at a time, for example a new headline or a shorter form, so you know what made the difference.',
      },
      {
        type: 'quote',
        text: 'The goal is not to persuade everyone. It is to make the decision easy for the visitors who are already a good fit.',
      },
      { type: 'h2', text: 'Putting it together' },
      {
        type: 'p',
        text: 'None of these principles requires a huge budget, but they do require deliberate decisions about structure, content and design. That is why we start every project by defining goals and audience before we think about visuals.',
      },
      {
        type: 'p',
        text: 'See how this plays out in our [portfolio](/portfolio) and [case studies](/case-studies), or request a [free audit](/free-audit) of your current site’s conversion path.',
      },
    ],
  },

  {
    slug: 'react-vs-nextjs-for-modern-web-development',
    title: 'React vs Next.js for Modern Web Development',
    metaTitle: 'React vs Next.js for Modern Web Development | Orbit Dev Studios',
    metaDescription:
      'React is a UI library; Next.js is a framework built on it. Compare rendering, SEO, performance, hosting and complexity to choose the right fit for your project.',
    excerpt:
      'Next.js is built on React, so the real question is whether your project needs React on its own or inside a full framework. A practical comparison.',
    category: 'Technology',
    tags: ['React', 'Next.js', 'JavaScript', 'SEO', 'Performance', 'Architecture'],
    author: BLOG_AUTHOR,
    publishDate: '2026-08-28',
    blocks: [
      {
        type: 'p',
        text: 'React and Next.js come up in almost every conversation about modern web development, and they are often presented as competitors. They are not, exactly. Next.js is built on top of React. The real question is whether your project needs React on its own, paired with a lightweight build tool, or React inside a full framework that also handles routing, rendering and more.',
      },
      { type: 'h2', text: 'What React is' },
      {
        type: 'p',
        text: 'React is a JavaScript library for building user interfaces from reusable components. It handles how the interface is described and how it updates as data changes. It deliberately leaves many decisions, such as routing, data fetching and how pages are rendered, to you or to other tools.',
      },
      {
        type: 'p',
        text: 'A common setup pairs React with a build tool such as Vite and a router such as React Router. By default, this produces a client-rendered application: the browser downloads JavaScript, which then builds the page.',
      },
      { type: 'h2', text: 'What Next.js is' },
      {
        type: 'p',
        text: 'Next.js is a framework built on React. It adds conventions and features that many projects would otherwise need to assemble themselves:',
      },
      {
        type: 'ul',
        items: [
          '**File-based routing:** folders and files define your URLs.',
          '**Multiple rendering strategies:** server-side rendering, static generation and incremental regeneration, chosen per page.',
          '**React Server Components:** components that run on the server, reducing the JavaScript sent to the browser.',
          '**Built-in optimisations** for images, fonts and scripts.',
          '**Server-side endpoints** for forms, webhooks and small APIs.',
          '**Metadata tools** for page titles, descriptions and social sharing tags.',
        ],
      },
      { type: 'h2', text: 'Where the difference matters most' },
      { type: 'h3', text: 'Rendering and SEO' },
      {
        type: 'p',
        text: 'With a purely client-rendered React app, the initial HTML is mostly empty until JavaScript runs. Search engines can render JavaScript, but relying on it adds risk and can slow down indexing and social previews. Next.js can send fully formed HTML from the start, which is generally better for content that needs to be found and shared.',
      },
      {
        type: 'p',
        text: 'That said, a React and Vite setup can also pre-render pages at build time. This site, for example, is built with React and Vite and pre-renders its public pages so they arrive as complete HTML.',
      },
      { type: 'h3', text: 'Performance' },
      {
        type: 'p',
        text: 'Next.js gives you more built-in tools to reduce the JavaScript users download and to deliver content before scripts finish loading. A plain React app can be very fast too, but you make more of those optimisation decisions yourself.',
      },
      { type: 'h3', text: 'Flexibility and simplicity' },
      {
        type: 'p',
        text: 'React with Vite is lean and unopinionated. There are fewer concepts to learn, builds are quick and you can deploy the output to almost any static host. Next.js brings more structure, which speeds up larger projects but adds concepts that teams need to understand, such as server versus client components, caching behaviour and rendering modes.',
      },
      { type: 'h3', text: 'Hosting' },
      {
        type: 'p',
        text: 'A client-rendered or pre-rendered React app can be served as static files from practically anywhere. Next.js features such as server rendering need a hosting platform that supports them. Several platforms do, and Next.js can also be self-hosted, but it is a factor in running costs and day-to-day operations.',
      },
      { type: 'h2', text: 'When React with Vite is a good fit' },
      {
        type: 'ul',
        items: [
          'Dashboards, internal tools and apps behind a login, where search visibility does not matter.',
          'Single-page applications with highly interactive interfaces.',
          'Projects that need to deploy as static files or embed inside an existing system.',
          'Smaller marketing sites where build-time pre-rendering covers the SEO requirements.',
        ],
      },
      { type: 'h2', text: 'When Next.js is a good fit' },
      {
        type: 'ul',
        items: [
          'Content-heavy sites, such as blogs, documentation and e-commerce catalogues, that rely on search traffic.',
          'Pages that combine personalised data with fast first loads.',
          'Projects that need a front end and light back-end endpoints in one codebase.',
          'Larger sites where shared conventions help a growing team stay consistent.',
        ],
      },
      {
        type: 'callout',
        tone: 'info',
        title: 'It is not a permanent choice',
        text: 'React components are largely portable. Teams regularly start with React and Vite and move to Next.js as their SEO or rendering needs grow, reusing much of their component code along the way.',
      },
      { type: 'h2', text: 'Questions to ask before choosing' },
      {
        type: 'ol',
        items: [
          'How important are organic search and social sharing for this project?',
          'How much of the content is public, and how much sits behind a login?',
          'Where will the project be hosted, and who will maintain it?',
          'How large is the team, and how familiar are they with each approach?',
          'Does the project need its own server-side logic, or will it talk to an existing API?',
        ],
      },
      { type: 'h2', text: 'Our take' },
      {
        type: 'p',
        text: 'There is no universally better option. For public, content-led sites where search visibility matters, Next.js is often the more convenient path. For app-like products, internal tools and focused sites where static hosting and simplicity are priorities, React with Vite is frequently the leaner choice. What matters most is matching the tool to the project’s goals rather than picking whatever is currently popular.',
      },
      {
        type: 'p',
        text: 'If you are planning a build and want a recommendation for your specific situation, see the [services we offer](/services), read our [FAQ](/faq), or [start a conversation about your project](/hire).',
      },
    ],
  },

  {
    slug: 'why-roofing-companies-lose-leads-because-of-their-website',
    title: 'Why Roofing Companies Lose Leads Because of Their Website',
    metaTitle: 'Why Roofing Websites Lose Leads (and How to Fix It) | Orbit Dev Studios',
    metaDescription:
      'Hidden phone numbers, slow mobile pages, vague service areas, no proof of quality: the website problems that cost roofers leads, and how to fix them.',
    excerpt:
      'Homeowners with a leaking roof compare a few local contractors on their phone and call the one that feels most reliable. Here is where roofing websites lose that job.',
    category: 'Business',
    tags: ['Roofing', 'Lead Generation', 'Local SEO', 'Mobile', 'Home Services'],
    author: BLOG_AUTHOR,
    publishDate: '2026-09-25',
    blocks: [
      {
        type: 'p',
        text: 'Roofing is a high-trust, often urgent purchase. When a homeowner spots a leak or storm damage, they usually search on their phone, look at a few local companies and contact the one that seems most reliable and easiest to reach. Your website is often the deciding factor in that short comparison, and many roofing websites lose the job before anyone picks up the phone.',
      },
      { type: 'p', text: 'Here are the most common reasons, and what to do about each one.' },
      { type: 'h2', text: 'The phone number is hard to find or tap' },
      {
        type: 'p',
        text: 'For urgent jobs, many homeowners would rather call than fill in a form. If your number is buried in the footer, shown as an image or not clickable on mobile, you are making your most motivated visitors work hard. Put a tap-to-call number in the header of every page, and consider a sticky call button on mobile.',
      },
      { type: 'h2', text: 'The site is slow on mobile data' },
      {
        type: 'p',
        text: 'Homeowners checking storm damage are often standing outside on a phone with patchy signal. Oversized project photos, autoplay videos and heavy page builders can make a site painfully slow in those conditions. Compress your images, keep the homepage lean and test on a real phone away from Wi-Fi. Our guide on [improving website performance](/blog/how-to-improve-website-performance) explains the most effective fixes.',
      },
      { type: 'h2', text: 'It does not say where you work' },
      {
        type: 'p',
        text: '"Serving the tri-county area" means little to someone who has just moved in. List the towns and neighbourhoods you cover, ideally with dedicated service area pages. This helps visitors confirm you serve them, and helps search engines show your business in local results.',
      },
      { type: 'h2', text: 'All the services are lumped together' },
      {
        type: 'p',
        text: 'Roof repair, full replacement, flat roofing, gutters, storm damage and inspections are different needs, and people search for them in different ways. A single page listing everything is hard to read and hard to rank. Give each core service its own page that explains the problem, your approach, the materials you use and what the homeowner should expect.',
      },
      { type: 'h2', text: 'There is no proof of quality' },
      {
        type: 'p',
        text: 'Homeowners worry about being overcharged, poor workmanship and contractors who disappear when problems surface later. Your website should address those fears directly:',
      },
      {
        type: 'ul',
        items: [
          'Before-and-after photos of real local projects.',
          'Reviews with names and locations, plus links to your public review profiles.',
          'The licences, insurance and manufacturer certifications you actually hold.',
          'Clear information about warranties on both workmanship and materials.',
        ],
      },
      {
        type: 'callout',
        tone: 'warning',
        title: 'Use only real evidence',
        text: 'Never present stock photos as your own work, or publish testimonials you cannot verify. Homeowners are increasingly good at spotting generic imagery, and misleading claims damage trust far more than a smaller portfolio ever will.',
      },
      { type: 'h2', text: 'The quote process is unclear' },
      {
        type: 'p',
        text: 'Visitors want to know what happens after they get in touch. Is the inspection free? How soon will someone visit? Will they receive a written quote? A short "How it works" section that walks through contact, inspection, written quote and scheduled work removes uncertainty and makes the first step feel low-risk.',
      },
      { type: 'h2', text: 'The forms ask for too much' },
      {
        type: 'p',
        text: 'Long forms that ask for budget, roof pitch and material preferences before any conversation discourage enquiries. Keep the first form short: name, phone number, address or postcode and a brief description of the problem. Optional photo uploads can help you triage jobs, as long as they are not required.',
      },
      { type: 'h2', text: 'Emergency visitors are treated like everyone else' },
      {
        type: 'p',
        text: 'A homeowner with water coming through the ceiling has very different needs from someone planning a replacement next spring. If you offer emergency repairs, say so prominently, explain how you respond and give emergency callers a direct way to reach you.',
      },
      { type: 'h2', text: 'Nobody is tracking what works' },
      {
        type: 'p',
        text: 'Many roofing companies cannot say how many enquiries their website produced last month. Track calls from the website, form submissions and quote requests, and note where each lead came from. Even simple tracking quickly reveals which pages and campaigns are worth investing in.',
      },
      { type: 'h2', text: 'The site looks abandoned' },
      {
        type: 'p',
        text: 'An outdated copyright year, old project photos, broken links or a "latest news" post from years ago all suggest the business may not be active. Homeowners comparing contractors notice these details. Keep content current, and remove anything you are not able to maintain.',
      },
      { type: 'h2', text: 'A practical checklist' },
      {
        type: 'ul',
        items: [
          'A tap-to-call number in the header of every page',
          'Fast loading on mobile data',
          'A clear list of service areas, with dedicated pages where relevant',
          'A separate page for each core service',
          'Real project photos, reviews and credentials',
          'A simple explanation of the quote process',
          'A short, mobile-friendly enquiry form',
          'Clear emergency contact information',
          'Call and form tracking set up and reviewed',
        ],
      },
      { type: 'h2', text: 'How we can help' },
      {
        type: 'p',
        text: 'We build websites for trade and home-service businesses around how homeowners actually choose a contractor: fast on mobile, clear about services and areas, and focused on getting the phone to ring. To see where your current site is losing leads, request a [free website audit](/free-audit), or explore our [services](/services).',
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const byDateDesc = (a: BlogPost, b: BlogPost) => b.publishDate.localeCompare(a.publishDate);

/** All posts, newest first. */
export const BLOG_POSTS: readonly BlogPost[] = [...posts].sort(byDateDesc);

export function getAllPosts(): readonly BlogPost[] {
  return BLOG_POSTS;
}

export function getPostBySlug(slug: string | undefined): BlogPost | undefined {
  if (!slug) return undefined;
  return BLOG_POSTS.find((p) => p.slug === slug);
}

/** Same category first, then by number of shared tags, then newest. */
export function getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  const tagSet = new Set(post.tags.map((t) => t.toLowerCase()));
  return BLOG_POSTS.filter((p) => p.slug !== post.slug)
    .map((p) => ({
      post: p,
      sameCategory: p.category === post.category ? 1 : 0,
      overlap: p.tags.filter((t) => tagSet.has(t.toLowerCase())).length,
    }))
    .sort(
      (a, b) =>
        b.sameCategory - a.sameCategory ||
        b.overlap - a.overlap ||
        byDateDesc(a.post, b.post),
    )
    .slice(0, limit)
    .map((r) => r.post);
}

/** Strips the inline `**bold**` / `[label](url)` syntax down to plain text. */
export function toPlainText(text: string): string {
  return text.replace(/\*\*(.+?)\*\*/g, '$1').replace(/\[([^\]]+)\]\([^)\s]+\)/g, '$1');
}

function blockText(block: ContentBlock): string {
  switch (block.type) {
    case 'ul':
    case 'ol':
      return block.items.join(' ');
    case 'quote':
      return block.cite ? `${block.text} ${block.cite}` : block.text;
    case 'callout':
      return block.title ? `${block.title} ${block.text}` : block.text;
    default:
      return block.text;
  }
}

export function getWordCount(post: BlogPost): number {
  return post.blocks.reduce((sum, block) => {
    const words = toPlainText(blockText(block)).trim().split(/\s+/).filter(Boolean);
    return sum + words.length;
  }, 0);
}

const WORDS_PER_MINUTE = 225;

/** Estimated reading time in whole minutes (minimum 1). */
export function readingTime(post: BlogPost): number {
  return Math.max(1, Math.round(getWordCount(post) / WORDS_PER_MINUTE));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function categorySlug(category: BlogCategory): string {
  return slugify(category);
}

export function categoryFromSlug(slug: string | null | undefined): BlogCategory | undefined {
  if (!slug) return undefined;
  return BLOG_CATEGORIES.find((c) => categorySlug(c) === slug);
}

/** Number of posts per category (categories with zero posts are included). */
export function getCategoryCounts(): Record<BlogCategory, number> {
  const counts = Object.fromEntries(BLOG_CATEGORIES.map((c) => [c, 0])) as Record<BlogCategory, number>;
  for (const p of BLOG_POSTS) counts[p.category] += 1;
  return counts;
}

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC',
});

/** Formats an ISO date (YYYY-MM-DD) deterministically, independent of the visitor's timezone. */
export function formatPostDate(iso: string): string {
  return dateFormatter.format(new Date(`${iso}T00:00:00Z`));
}
