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
  { label: 'Industries', path: '/industries' },
  { label: 'Technologies', path: '/tech' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Hire Us', path: '/hire' },
];

export const quickLinks: FooterLink[] = [
  { label: 'About Us', path: '/about' },
  { label: 'Our Work', path: '/portfolio' },
  { label: 'Careers', path: '/careers' },
];

export const serviceLinks: FooterLink[] = [
  { label: 'Web Development', path: '/services' },
  { label: 'Mobile Apps', path: '/services' },
  { label: 'AI Solutions', path: '/services' },
  { label: 'Cloud Architecture', path: '/services' },
];

export const socialLinks: SocialLink[] = [
  { platform: 'email', url: 'mailto:orbitdevstudios@gmail.com', label: 'orbitdevstudios@gmail.com' },
  { platform: 'instagram', url: 'https://instagram.com/orbitdevstudio', label: '@orbitdevstudio' },
  { platform: 'linkedin', url: 'https://www.linkedin.com/company/orbitdevstudio-tech', label: 'orbitdevstudio-c' },
];
