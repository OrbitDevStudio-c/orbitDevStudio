export interface JobPosition {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
}

export const positions: JobPosition[] = [
  {
    id: 1,
    title: 'SEO Intern',
    department: 'Marketing',
    location: 'Remote',
    type: 'Internship',
    experience: '0-6 months',
    description: 'Learn and execute search engine optimization strategies, conduct keyword research, and optimize content for maximum visibility.'
  },
  {
    id: 2,
    title: 'UI/UX Intern',
    department: 'Design',
    location: 'Remote',
    type: 'Internship',
    experience: '0-6 months',
    description: 'Assist in creating user-centered designs, wireframes, and prototypes while learning modern UI/UX principles and tools.'
  },
  {
    id: 3,
    title: 'MERN Stack Intern',
    department: 'Engineering',
    location: 'Remote',
    type: 'Internship',
    experience: '0-6 months',
    description: 'Work alongside senior engineers building full-stack web applications using MongoDB, Express, React, and Node.js.'
  },
  {
    id: 4,
    title: 'Content Creator Intern',
    department: 'Marketing',
    location: 'Remote',
    type: 'Internship',
    experience: '0-6 months',
    description: 'Help craft engaging written and visual content for social media, blogs, and marketing campaigns to build our brand presence.'
  }
];
