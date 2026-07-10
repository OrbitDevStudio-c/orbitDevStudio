export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
  avatar: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Riya Mehta',
    role: 'CTO',
    company: 'Finova Systems',
    text: 'OrbitDevStudio really pulled through for us. We had a pretty aggressive timeline and some initial delays, but the team caught up quickly. Solid frontend work and very communicative.',
    rating: 4,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120&h=120'
  },
  {
    id: 2,
    name: 'James Anderson',
    role: 'Founder',
    company: 'NexGen',
    text: 'Professional, reliable, and highly skilled. They didn’t just write code; they understood our product vision and turned it into a world-class experience. Worth every penny.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120'
  },
  {
    id: 3,
    name: 'Sneha Shah',
    role: 'Product Head',
    company: 'HealthPlus',
    text: 'Overall a decent experience. The initial architecture planning took a bit longer than expected which pushed our timeline, but the final code quality was actually very good.',
    rating: 3,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=120&h=120'
  },
  {
    id: 4,
    name: 'Priya Patel',
    role: 'VP of Engineering',
    company: 'ShopSphere',
    text: 'Their engineering quality elevated our platform to the next level. We saw a noticeable improvement in our app performance. Just minor hiccups in QA, but handled professionally.',
    rating: 4,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120&h=120'
  },
  {
    id: 5,
    name: 'Neha Desai',
    role: 'Director',
    company: 'MedSync',
    text: 'A truly premium agency. They are fast, responsive, and incredibly talented. They practically act like our own in-house team. Highly recommended!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=120&h=120'
  }
];
