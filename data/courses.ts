import { Course } from '@/lib/types';

export const courses: Course[] = [
  {
    id: '1',
    title: 'Modern React Development with TypeScript',
    description: 'Master React 18 with TypeScript, hooks, and modern patterns for building scalable web applications.',
    longDescription: 'In this comprehensive course, you will learn how to build professional, scalable web applications using React 18 and TypeScript. We\'ll cover essential React concepts including functional components, hooks, context API, and Suspense. You\'ll also master TypeScript integration for type-safe development, state management with modern solutions, performance optimization techniques, and testing strategies. By the end of this course, you\'ll be able to confidently architect and implement complex React applications with best practices.',
    author: {
      id: '1',
      name: 'Sarah Mitchell',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
    thumbnail: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.8,
    totalRatings: 1254,
    enrollments: 4732,
    categories: ['web-dev'],
    syllabus: `
      # Course Syllabus

      ## Module 1: React and TypeScript Fundamentals
      - React 18 new features
      - TypeScript essentials for React
      - Setting up a React+TS project
      
      ## Module 2: Modern Component Patterns
      - Functional components
      - Custom hooks
      - Higher-order components
      
      ## Module 3: State Management
      - useState, useReducer
      - Context API
      - External state management (Redux Toolkit, Zustand)
      
      ## Module 4: Performance Optimization
      - React.memo, useMemo, useCallback
      - Code splitting and lazy loading
      - Suspense and Error Boundaries
      
      ## Module 5: Testing and Deployment
      - Testing with React Testing Library
      - CI/CD integration
      - Deployment strategies
    `,
    lessons: [
      {
        id: '1-1',
        title: 'Getting Started with React 18',
        description: 'Learn about the newest features in React 18 and set up your development environment.',
        videoUrl: 'https://www.youtube.com/embed/CRoujRWrILI',
        duration: 15,
        order: 1,
      },
      {
        id: '1-2',
        title: 'TypeScript Integration in React',
        description: 'How to leverage TypeScript for type-safe React development.',
        videoUrl: 'https://www.youtube.com/embed/30LWjhZzg50',
        duration: 22,
        order: 2,
      },
    ],
    createdAt: '2023-05-15T08:00:00.000Z',
    updatedAt: '2024-03-10T10:15:00.000Z',
  },
  {
    id: '3',
    title: 'Data Science Fundamentals with Python',
    description: 'Learn essential data science skills with Python, from data analysis to visualization and machine learning.',
    longDescription: 'This comprehensive data science course teaches you how to work with data using Python and its powerful ecosystem of libraries. You\'ll start with the fundamentals of Python programming before diving into data manipulation with Pandas, visualization with Matplotlib and Seaborn, and statistical analysis. The course then introduces machine learning concepts using scikit-learn, covering both supervised and unsupervised learning techniques. Through hands-on projects, you\'ll apply these skills to real-world datasets and develop a portfolio that demonstrates your data science capabilities.',
    author: {
      id: '3',
      name: 'Emily Rodriguez',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
    thumbnail: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.9,
    totalRatings: 1876,
    enrollments: 6542,
    categories: ['data-science', 'ai-ml'],
    syllabus: `
      # Course Syllabus

      ## Module 1: Python for Data Science
      - Python basics for data science
      - NumPy for numerical computing
      - Data structures and algorithms
      
      ## Module 2: Data Analysis with Pandas
      - Data manipulation and cleaning
      - Exploratory data analysis
      - Working with different data formats
      
      ## Module 3: Data Visualization
      - Matplotlib and Seaborn
      - Interactive visualizations
      - Storytelling with data
      
      ## Module 4: Statistical Analysis
      - Descriptive statistics
      - Inferential statistics
      - Hypothesis testing
      
      ## Module 5: Introduction to Machine Learning
      - Supervised learning algorithms
      - Unsupervised learning
      - Model evaluation and validation
    `,
    lessons: [
      {
        id: '3-1',
        title: 'Introduction to Python for Data Science',
        description: 'Get started with Python and its data science libraries.',
        videoUrl: 'https://www.youtube.com/embed/LHBE6Q9XlzI',
        duration: 24,
        order: 1,
      },
      {
        id: '3-2',
        title: 'Data Manipulation with Pandas',
        description: 'Learn how to clean, transform, and analyze data with Pandas.',
        videoUrl: 'https://www.youtube.com/embed/vmEHCJofslg',
        duration: 35,
        order: 2,
      },
      {
        id: '3-3',
        title: 'Data Visualization Best Practices',
        description: 'Create effective visualizations to communicate insights from data.',
        videoUrl: 'https://www.youtube.com/embed/UO98lJQ3QGI',
        duration: 28,
        order: 3,
      },
      {
        id: '3-4',
        title: 'Introduction to Machine Learning Algorithms',
        description: 'Understand the basics of machine learning and implement your first models.',
        videoUrl: 'https://www.youtube.com/embed/q7K_BgK-6Go',
        duration: 40,
        order: 4,
      },
    ],
    createdAt: '2023-09-05T11:45:00.000Z',
    updatedAt: '2024-01-18T16:30:00.000Z',
  },
  {
    id: '4',
    title: 'Full-Stack JavaScript Development',
    description: 'Build complete web applications with modern JavaScript, Node.js, Express, and MongoDB.',
    longDescription: 'This full-stack JavaScript course covers everything you need to build modern web applications from front to back. Starting with core JavaScript concepts, you\'ll progress to building responsive frontends with HTML, CSS, and modern JavaScript frameworks. On the backend, you\'ll learn Node.js and Express to create robust APIs, connecting to MongoDB for data persistence. The course emphasizes real-world development practices including authentication, deployment, and performance optimization. By completing this comprehensive course, you\'ll be able to independently develop and deploy full-stack JavaScript applications.',
    author: {
      id: '4',
      name: 'David Williams',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
    thumbnail: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.6,
    totalRatings: 1432,
    enrollments: 5128,
    categories: ['web-dev'],
    syllabus: `
      # Course Syllabus

      ## Module 1: Modern JavaScript
      - ES6+ features
      - Asynchronous JavaScript
      - JavaScript modules
      
      ## Module 2: Frontend Development
      - HTML5 and CSS3
      - Responsive design
      - Frontend frameworks
      
      ## Module 3: Backend with Node.js
      - Node.js fundamentals
      - Express.js framework
      - RESTful API design
      
      ## Module 4: Database Integration
      - MongoDB fundamentals
      - Mongoose ODM
      - Data modeling
      
      ## Module 5: Authentication and Deployment
      - JWT authentication
      - Security best practices
      - Deployment to cloud platforms
    `,
    lessons: [
      {
        id: '4-1',
        title: 'Modern JavaScript Essentials',
        description: 'Master essential JavaScript features for full-stack development.',
        videoUrl: 'https://www.youtube.com/embed/hdI2bqOjy3c',
        duration: 22,
        order: 1,
      },
      {
        id: '4-2',
        title: 'Building APIs with Node.js and Express',
        description: 'Learn how to create robust backends with Node.js and Express.',
        videoUrl: 'https://www.youtube.com/embed/lY6icfhap2o',
        duration: 30,
        order: 2,
      },
      {
        id: '4-3',
        title: 'MongoDB and Mongoose for Data Persistence',
        description: 'Store and manipulate data using MongoDB and Mongoose ODM.',
        videoUrl: 'https://www.youtube.com/embed/DZBGEVgL2eE',
        duration: 28,
        order: 3,
      },
      {
        id: '4-4',
        title: 'Authentication and Authorization',
        description: 'Implement secure user authentication in your applications.',
        videoUrl: 'https://www.youtube.com/embed/mbsmsi7l3r4',
        duration: 35,
        order: 4,
      },
    ],
    createdAt: '2023-06-10T13:20:00.000Z',
    updatedAt: '2024-03-05T09:50:00.000Z',
  },
  {
    id: '5',
    title: 'iOS App Development with Swift',
    description: 'Create native iOS applications using Swift and the latest Apple frameworks.',
    longDescription: 'This comprehensive iOS development course teaches you how to build professional applications for Apple\'s ecosystem using Swift and modern development principles. Starting with Swift language fundamentals, you\'ll progress through iOS architecture, UI development with UIKit and SwiftUI, and data persistence solutions. You\'ll learn how to implement common app features like networking, authentication, and push notifications. The course emphasizes Apple design guidelines and best practices for creating intuitive user experiences. By completion, you\'ll be able to design, develop, and publish your own iOS applications to the App Store.',
    author: {
      id: '5',
      name: 'Jennifer Kim',
      avatar: 'https://images.pexels.com/photos/1520760/pexels-photo-1520760.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
    thumbnail: 'https://images.pexels.com/photos/92904/pexels-photo-92904.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.7,
    totalRatings: 986,
    enrollments: 3214,
    categories: ['mobile-dev'],
    syllabus: `
      # Course Syllabus

      ## Module 1: Swift Fundamentals
      - Swift syntax and language features
      - Object-oriented programming in Swift
      - Protocol-oriented programming
      
      ## Module 2: iOS UI Development
      - UIKit fundamentals
      - SwiftUI introduction
      - Responsive layouts
      
      ## Module 3: iOS Architecture
      - MVC, MVVM patterns
      - Navigation and app lifecycle
      - Memory management
      
      ## Module 4: Data and Networking
      - Core Data
      - RESTful API integration
      - JSON parsing
      
      ## Module 5: Advanced iOS Features
      - Authentication and security
      - Push notifications
      - App publishing process
    `,
    lessons: [
      {
        id: '5-1',
        title: 'Introduction to Swift Programming',
        description: 'Learn the fundamentals of Swift programming language.',
        videoUrl: 'https://www.youtube.com/embed/comQ1-x2a1Q',
        duration: 20,
        order: 1,
      },
      {
        id: '5-2',
        title: 'Building User Interfaces with UIKit',
        description: 'Create responsive and attractive user interfaces with UIKit.',
        videoUrl: 'https://www.youtube.com/embed/iqpAP7s3b-8',
        duration: 32,
        order: 2,
      },
      {
        id: '5-3',
        title: 'SwiftUI Essentials',
        description: 'Learn the new declarative UI framework for Apple platforms.',
        videoUrl: 'https://www.youtube.com/embed/bqu6BquVi2M',
        duration: 28,
        order: 3,
      },
      {
        id: '5-4',
        title: 'Networking and API Integration',
        description: 'Connect your iOS apps to backend services and APIs.',
        videoUrl: 'https://www.youtube.com/embed/Tc4op4tQSgg',
        duration: 25,
        order: 4,
      },
    ],
    createdAt: '2023-08-15T10:10:00.000Z',
    updatedAt: '2024-02-28T15:40:00.000Z',
  },
  {
    id: '6',
    title: 'AWS Cloud Architect Certification',
    description: 'Master AWS services and architecture patterns to design scalable cloud solutions.',
    longDescription: 'This comprehensive AWS certification course prepares you for the AWS Certified Solutions Architect examination while teaching practical cloud architecture skills. You\'ll gain in-depth knowledge of core AWS services including compute, storage, databases, and networking, along with best practices for designing secure, reliable, and cost-effective cloud solutions. Through hands-on labs and real-world scenarios, you\'ll learn how to architect applications on AWS, implement security controls, and optimize for performance and cost. By the end of this course, you\'ll be ready to pass the certification exam and apply your knowledge in professional cloud environments.',
    author: {
      id: '6',
      name: 'Robert Johnson',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
    thumbnail: 'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.8,
    totalRatings: 1532,
    enrollments: 4865,
    categories: ['cloud'],
    syllabus: `
      # Course Syllabus

      ## Module 1: AWS Fundamentals
      - AWS global infrastructure
      - AWS service categories
      - Account management and security
      
      ## Module 2: Compute and Networking
      - EC2, Lambda, ECS
      - VPC design
      - Load balancing and DNS
      
      ## Module 3: Storage and Databases
      - S3, EBS, EFS
      - RDS, DynamoDB, Aurora
      - Data migration strategies
      
      ## Module 4: Security and Compliance
      - IAM best practices
      - Security services
      - Compliance frameworks
      
      ## Module 5: Architecture Best Practices
      - High availability
      - Cost optimization
      - Operational excellence
    `,
    lessons: [
      {
        id: '6-1',
        title: 'AWS Services Overview',
        description: 'Get familiar with the core AWS services and their use cases.',
        videoUrl: 'https://www.youtube.com/embed/JIbIYCM48to',
        duration: 25,
        order: 1,
      },
      {
        id: '6-2',
        title: 'Designing Highly Available Architectures',
        description: 'Learn principles for building resilient systems on AWS.',
        videoUrl: 'https://www.youtube.com/embed/CTPdoPRwC-I',
        duration: 35,
        order: 2,
      },
      {
        id: '6-3',
        title: 'Security Best Practices in AWS',
        description: 'Implement robust security controls in your AWS environments.',
        videoUrl: 'https://www.youtube.com/embed/9TwkMMogojY',
        duration: 30,
        order: 3,
      },
      {
        id: '6-4',
        title: 'Cost Optimization Strategies',
        description: 'Optimize your AWS spending without compromising performance.',
        videoUrl: 'https://www.youtube.com/embed/yD8zbuML8p4',
        duration: 28,
        order: 4,
      },
    ],
    createdAt: '2023-04-20T14:15:00.000Z',
    updatedAt: '2024-01-30T11:25:00.000Z',
  },
];