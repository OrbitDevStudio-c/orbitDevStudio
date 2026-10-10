export interface NavItem {
  label: string;
  path: string;
}

export interface FooterLink {
  label: string;
  path: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  label: string;
}

export const navItems: NavItem[] = [
  { label: 'Services', path: '/services' },
  { label: 'Work', path: '/portfolio' },
  { label: 'Pricing', path: '/pricing' },
  { label: 'About Us', path: '/about' },
  { label: 'Blog', path: '/blog' },
];

export const quickLinks: FooterLink[] = [
  { label: 'About Us', path: '/about' },
  { label: 'Our Work', path: '/portfolio' },
  { label: 'Pricing', path: '/pricing' },
  { label: 'Careers', path: '/careers' },
  { label: "Let's Talk", path: '/hire' },
];

export const serviceLinks: FooterLink[] = [
  { label: 'Services', path: '/services' },
  { label: 'Industries', path: '/industries' },
  { label: 'Technologies', path: '/tech' },
  { label: 'Blog', path: '/blog' },
  { label: 'Free Website Audit', path: '/free-audit' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Security & Privacy', path: '/security' },
];

export const socialLinks: SocialLink[] = [
  { platform: 'email', url: 'mailto:orbitdevstudios@gmail.com', label: 'orbitdevstudios@gmail.com' },
  { platform: 'instagram', url: 'https://instagram.com/orbitdevstudio', label: '@orbitdevstudio' },
  { platform: 'linkedin', url: 'https://www.linkedin.com/company/orbitdevstudio-tech', label: 'orbitdevstudio-c' },
];
