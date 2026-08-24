import firstPost from '../posts/building-premium-react-experiences.md?raw';
import secondPost from '../posts/responsive-design-principles.md?raw';
import thirdPost from '../posts/react-performance-checklist.md?raw';
import fourthPost from '../posts/design-to-production-workflow.md?raw';
import fifthPost from '../posts/writing-a-strong-project-brief.md?raw';
import sixthPost from '../posts/accessibility-basics-checklist.md?raw';
import projectImage1 from '../assets/images/project-1.svg';
import projectImage2 from '../assets/images/project-2.svg';
import projectImage3 from '../assets/images/project-3.svg';
import projectImage4 from '../assets/images/project-4.svg';
import aboutImage from '../assets/images/about.svg';
import eventImage from '../assets/images/event.svg';

const posts = [
  {
    slug: 'building-premium-react-experiences',
    title: 'Building Premium React Experiences',
    excerpt: 'A practical look at combining performance, motion and clear visual hierarchy in a modern portfolio.',
    date: '2026-08-12',
    readTime: '4 min read',
    category: 'React',
    icon: 'FaReact',
    image: projectImage1,
    videoUrl: '',
    content: firstPost
  },
  {
    slug: 'react-performance-checklist',
    title: 'A Practical React Performance Checklist',
    excerpt: 'Five repeatable checks — from bundle splitting to memoization — that catch most performance issues before launch.',
    date: '2026-08-05',
    readTime: '5 min read',
    category: 'Performance',
    icon: 'FaBolt',
    image: projectImage2,
    videoUrl: '',
    content: thirdPost
  },
  {
    slug: 'design-to-production-workflow',
    title: 'From Figma to Production: A Handoff Workflow That Works',
    excerpt: 'How design tokens, documented states, and early browser builds keep a design system honest end to end.',
    date: '2026-07-24',
    readTime: '4 min read',
    category: 'Design',
    icon: 'FaPencilRuler',
    image: aboutImage,
    videoUrl: '',
    content: fourthPost
  },
  {
    slug: 'responsive-design-principles',
    title: 'Responsive Design That Feels Intentional',
    excerpt: 'How thoughtful spacing, typography and interaction states make every viewport feel designed.',
    date: '2026-07-28',
    readTime: '3 min read',
    category: 'Design',
    icon: 'FaMobileAlt',
    image: projectImage3,
    videoUrl: '',
    content: secondPost
  },
  {
    slug: 'writing-a-strong-project-brief',
    title: 'Writing a Project Brief That Gets You a Better Quote',
    excerpt: 'The details every client should define before requesting a quote — and why they lead to faster, more accurate estimates.',
    date: '2026-07-10',
    readTime: '3 min read',
    category: 'Freelancing',
    icon: 'FaFileSignature',
    image: eventImage,
    videoUrl: '',
    content: fifthPost
  },
  {
    slug: 'accessibility-basics-checklist',
    title: 'Accessibility Basics Every Web Project Should Ship With',
    excerpt: 'Semantic structure, focus states, contrast and labeling habits that cost nothing to build in from day one.',
    date: '2026-06-30',
    readTime: '4 min read',
    category: 'Accessibility',
    icon: 'FaUniversalAccess',
    image: projectImage4,
    videoUrl: '',
    content: sixthPost
  }
];

export default posts;
