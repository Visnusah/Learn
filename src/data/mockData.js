/**
 * @typedef {Object} Course
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string} instructor
 * @property {string} instructorAvatar
 * @property {string} category
 * @property {'Beginner'|'Intermediate'|'Advanced'} level
 * @property {string} duration
 * @property {number} rating
 * @property {number} studentsCount
 * @property {string} image
 * @property {number} price
 * @property {Array<{id: string, title: string, duration: string, isCompleted?: boolean}>} curriculum
 * @property {string[]} requirements
 * @property {string[]} whatYouLearn
 * @property {boolean} [isFeatured]
 * @property {boolean} [hasDetailedContent]
 */

export const mockCourses = [
  {
    id: '1',
    title: 'Complete Web Development Bootcamp',
    description: 'Learn full-stack web development from scratch. Build real projects and master modern technologies including HTML, CSS, JavaScript, React, and Node.js.',
    instructor: 'Dr. Angela Yu',
    instructorAvatar: 'https://images.pexels.com/photos/3771788/pexels-photo-3771788.jpeg?auto=compress&cs=tinysrgb&w=150',
    category: 'Web Development',
    level: 'Beginner',
    duration: '54 hours',
    rating: 4.8,
    studentsCount: 12543,
    image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 0,
    curriculum: [
      { id: '1-1', title: 'Introduction to HTML', duration: '45 min' },
      { id: '1-2', title: 'CSS Fundamentals', duration: '1.5 hours' },
      { id: '1-3', title: 'JavaScript Basics', duration: '2 hours' },
      { id: '1-4', title: 'React.js Introduction', duration: '3 hours' },
      { id: '1-5', title: 'Node.js Backend', duration: '2.5 hours' },
      { id: '1-6', title: 'Database Integration', duration: '2 hours' },
      { id: '1-7', title: 'Deployment & Hosting', duration: '1.5 hours' }
    ],
    requirements: ['No prior experience needed', 'Computer with internet connection', 'Text editor (VS Code recommended)'],
    whatYouLearn: [
      'Build responsive websites with HTML, CSS, and JavaScript',
      'Master React.js for modern web applications',
      'Learn Node.js and Express for backend development',
      'Work with databases and APIs',
      'Deploy applications to the cloud',
      'Understand version control with Git',
      'Build a complete full-stack project portfolio'
    ],
    isFeatured: true,
    hasDetailedContent: true
  },
  {
    id: '2',
    title: 'Data Science with Python',
    description: 'Master data science techniques using Python. Learn machine learning, data visualization, and statistical analysis with real-world projects.',
    instructor: 'Prof. Michael Chen',
    instructorAvatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150',
    category: 'Data Science',
    level: 'Intermediate',
    duration: '42 hours',
    rating: 4.9,
    studentsCount: 8765,
    image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 0,
    curriculum: [
      { id: '2-1', title: 'Python for Data Science', duration: '3 hours' },
      { id: '2-2', title: 'Data Manipulation with Pandas', duration: '4 hours' },
      { id: '2-3', title: 'Data Visualization', duration: '3 hours' },
      { id: '2-4', title: 'Machine Learning Basics', duration: '5 hours' },
      { id: '2-5', title: 'Statistical Analysis', duration: '3 hours' },
      { id: '2-6', title: 'Deep Learning Introduction', duration: '4 hours' }
    ],
    requirements: ['Basic Python knowledge', 'Mathematics fundamentals', 'Statistics basics'],
    whatYouLearn: [
      'Data manipulation and cleaning with Pandas',
      'Statistical analysis and hypothesis testing',
      'Data visualization with Matplotlib and Seaborn',
      'Machine learning algorithms and implementation',
      'Deep learning fundamentals with TensorFlow',
      'Real-world data science projects and case studies'
    ],
    isFeatured: true,
    hasDetailedContent: true
  },
  {
    id: '3',
    title: 'UI/UX Design Masterclass',
    description: 'Create stunning user interfaces and exceptional user experiences. Learn design principles, user research, and industry-standard tools.',
    instructor: 'Sarah Johnson',
    instructorAvatar: 'https://images.pexels.com/photos/3184419/pexels-photo-3184419.jpeg?auto=compress&cs=tinysrgb&w=150',
    category: 'Design',
    level: 'Beginner',
    duration: '36 hours',
    rating: 4.7,
    studentsCount: 15432,
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 0,
    curriculum: [
      { id: '3-1', title: 'Design Principles', duration: '2 hours' },
      { id: '3-2', title: 'User Research Methods', duration: '3 hours' },
      { id: '3-3', title: 'Wireframing and Prototyping', duration: '4 hours' },
      { id: '3-4', title: 'Visual Design', duration: '3 hours' },
      { id: '3-5', title: 'Interaction Design', duration: '2.5 hours' },
      { id: '3-6', title: 'Usability Testing', duration: '2 hours' }
    ],
    requirements: ['No design experience needed', 'Access to design software (Figma recommended)', 'Creative mindset'],
    whatYouLearn: [
      'Design thinking and user-centered design',
      'Create wireframes and interactive prototypes',
      'Visual design and typography principles',
      'Color theory and composition',
      'Usability testing and iteration',
      'Industry-standard design tools (Figma, Adobe XD)'
    ],
    hasDetailedContent: true
  },
  {
    id: '4',
    title: 'Digital Marketing Strategy',
    description: 'Build comprehensive digital marketing campaigns. Master SEO, social media, content marketing, and analytics to grow any business online.',
    instructor: 'Mark Thompson',
    instructorAvatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150',
    category: 'Marketing',
    level: 'Intermediate',
    duration: '28 hours',
    rating: 4.6,
    studentsCount: 9876,
    image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 0,
    curriculum: [
      { id: '4-1', title: 'Digital Marketing Fundamentals', duration: '2 hours' },
      { id: '4-2', title: 'SEO and Content Strategy', duration: '4 hours' },
      { id: '4-3', title: 'Social Media Marketing', duration: '3 hours' },
      { id: '4-4', title: 'Analytics and Optimization', duration: '2 hours' },
      { id: '4-5', title: 'Paid Advertising', duration: '3 hours' },
      { id: '4-6', title: 'Email Marketing', duration: '2 hours' }
    ],
    requirements: ['Basic understanding of marketing concepts', 'Access to social media platforms', 'Google Analytics account'],
    whatYouLearn: [
      'Develop comprehensive marketing strategies',
      'SEO optimization and content marketing',
      'Social media marketing tactics and automation',
      'Google Ads and Facebook advertising',
      'Email marketing automation and segmentation',
      'Measure and analyze campaign performance with analytics'
    ],
    hasDetailedContent: true
  },
  {
    id: '5',
    title: 'Mobile App Development with React Native',
    description: 'Build cross-platform mobile applications using React Native. Learn to create iOS and Android apps with a single codebase.',
    instructor: 'James Wilson',
    instructorAvatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
    category: 'Mobile Development',
    level: 'Intermediate',
    duration: '38 hours',
    rating: 4.8,
    studentsCount: 7234,
    image: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 0,
    curriculum: [
      { id: '5-1', title: 'React Native Fundamentals', duration: '3 hours' },
      { id: '5-2', title: 'Navigation and Routing', duration: '2.5 hours' },
      { id: '5-3', title: 'State Management', duration: '3 hours' },
      { id: '5-4', title: 'Native Device Features', duration: '4 hours' },
      { id: '5-5', title: 'API Integration', duration: '2 hours' },
      { id: '5-6', title: 'App Store Deployment', duration: '2.5 hours' }
    ],
    requirements: ['JavaScript knowledge', 'React.js basics', 'Node.js environment setup'],
    whatYouLearn: [
      'Build native mobile apps with React Native',
      'Implement navigation and user authentication',
      'Access device features like camera and GPS',
      'Integrate with REST APIs and databases',
      'Deploy apps to App Store and Google Play',
      'Optimize performance for mobile devices'
    ],
    isFeatured: true,
    hasDetailedContent: true
  },
  {
    id: '6',
    title: 'Cybersecurity Fundamentals',
    description: 'Learn essential cybersecurity concepts, ethical hacking techniques, and how to protect systems from cyber threats.',
    instructor: 'Dr. Lisa Chen',
    instructorAvatar: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=150',
    category: 'Cybersecurity',
    level: 'Beginner',
    duration: '32 hours',
    rating: 4.9,
    studentsCount: 5678,
    image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 0,
    curriculum: [
      { id: '6-1', title: 'Introduction to Cybersecurity', duration: '2 hours' },
      { id: '6-2', title: 'Network Security', duration: '4 hours' },
      { id: '6-3', title: 'Ethical Hacking Basics', duration: '3 hours' },
      { id: '6-4', title: 'Cryptography and Encryption', duration: '3 hours' },
      { id: '6-5', title: 'Incident Response', duration: '2.5 hours' },
      { id: '6-6', title: 'Security Compliance', duration: '2 hours' }
    ],
    requirements: ['Basic computer knowledge', 'Understanding of networks', 'Linux basics helpful'],
    whatYouLearn: [
      'Identify and assess security vulnerabilities',
      'Implement network security measures',
      'Understand ethical hacking methodologies',
      'Apply cryptography and encryption techniques',
      'Develop incident response procedures',
      'Ensure compliance with security standards'
    ],
    hasDetailedContent: true
  }
];

export const categories = [
  { name: 'Web Development', count: 142, icon: 'Code' },
  { name: 'Data Science', count: 89, icon: 'BarChart3' },
  { name: 'Design', count: 156, icon: 'Palette' },
  { name: 'Marketing', count: 78, icon: 'Megaphone' },
  { name: 'Business', count: 134, icon: 'Briefcase' },
  { name: 'Mobile Development', count: 67, icon: 'Smartphone' },
  { name: 'Cybersecurity', count: 45, icon: 'Shield' }
];

export const testimonials = [
  {
    id: '1',
    name: 'Alex Rodriguez',
    role: 'Software Developer',
    content: 'This platform transformed my career. The quality of courses and instructors is exceptional.',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 5
  },
  {
    id: '2',
    name: 'Emily Chen',
    role: 'UX Designer',
    content: 'Amazing learning experience! The interactive content and practical projects helped me land my dream job.',
    avatar: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 5
  },
  {
    id: '3',
    name: 'David Park',
    role: 'Data Analyst',
    content: 'The data science courses are incredibly comprehensive. I went from beginner to professional level.',
    avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 5
  }
];

export const instructors = [
  {
    id: '1',
    name: 'Dr. Angela Yu',
    speciality: 'Web Development',
    students: 25000,
    courses: 12,
    rating: 4.9,
    avatar: 'https://images.pexels.com/photos/3771788/pexels-photo-3771788.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    id: '2',
    name: 'Prof. Michael Chen',
    speciality: 'Data Science',
    students: 18000,
    courses: 8,
    rating: 4.8,
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    id: '3',
    name: 'Sarah Johnson',
    speciality: 'UI/UX Design',
    students: 22000,
    courses: 15,
    rating: 4.9,
    avatar: 'https://images.pexels.com/photos/3184419/pexels-photo-3184419.jpeg?auto=compress&cs=tinysrgb&w=200'
  }
];
