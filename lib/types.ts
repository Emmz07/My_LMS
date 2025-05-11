export interface Author {
    id: string;
    name: string;
    avatar: string;
  }
  
  export interface Category {
    id: string;
    name: string;
    slug: string;
    color: string;
  }
  
  export interface Lesson {
    id: string;
    title: string;
    description: string;
    videoUrl: string;
    duration: number; // in minutes
    order: number;
    isCompleted?: boolean;
  }
  
  export interface Course {
    id: string;
    title: string;
    description: string;
    longDescription?: string;
    author: Author;
    thumbnail: string;
    rating: number;
    totalRatings: number;
    enrollments: number;
    categories: string[];
    syllabus: string;
    lessons: Lesson[];
    createdAt: string;
    updatedAt: string;
    progress?: number;
  }
  
  export interface UserNote {
    id: string;
    lessonId: string;
    courseId: string;
    content: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface EnrolledCourse {
    courseId: string;
    progress: number;
    lastLessonId: string;
    timeSpent: number; // in minutes
    completedLessons: string[];
    enrolledAt: string;
  }
  
  export interface User {
    id: string;
    name: string;
    email: string;
    avatar: string;
    enrolledCourses: EnrolledCourse[];
    notes: UserNote[];
  }