import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { EnrolledCourse, User, UserNote } from './types';
import { courses } from '@/data/courses';

type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
};

type CourseState = {
  enrolledCourses: EnrolledCourse[];
  enrollInCourse: (courseId: string) => void;
  updateProgress: (courseId: string, lessonId: string) => void;
  getCourseProgress: (courseId: string) => number;
  getLastLesson: (courseId: string) => string | null;
};

type NoteState = {
  notes: UserNote[];
  addNote: (courseId: string, lessonId: string, content: string) => void;
  updateNote: (noteId: string, content: string) => void;
  deleteNote: (noteId: string) => void;
  getLessonNotes: (courseId: string, lessonId: string) => UserNote[];
};

interface StoreState extends AuthState, CourseState, NoteState {}

// Mock user for demo purposes
const mockUser: User = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
  enrolledCourses: [
    {
      courseId: '1',
      progress: 25,
      lastLessonId: '1-2',
      timeSpent: 45,
      completedLessons: ['1-1'],
      enrolledAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ],
  notes: [
    {
      id: '1',
      lessonId: '1-1',
      courseId: '1',
      content: 'Important concepts covered in this lesson: component lifecycle and hooks.',
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ],
};

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Auth state
      isAuthenticated: true, // Pre-authenticated for demo
      user: mockUser,
      login: (_email, _password) => {
        set({ isAuthenticated: true, user: mockUser });
      },
      logout: () => {
        set({ isAuthenticated: false, user: null });
      },

      // Course state
      enrolledCourses: mockUser.enrolledCourses,
      enrollInCourse: (courseId) => {
        if (!get().user) return;
        
        const isEnrolled = get().user?.enrolledCourses.some(course => course.courseId === courseId);
        if (isEnrolled) return;

        const newEnrollment: EnrolledCourse = {
          courseId,
          progress: 0,
          lastLessonId: '', // Initially empty
          timeSpent: 0,
          completedLessons: [],
          enrolledAt: new Date().toISOString(),
        };

        set((state) => ({
          user: state.user ? {
            ...state.user,
            enrolledCourses: [...state.user.enrolledCourses, newEnrollment]
          } : null,
          enrolledCourses: [...state.enrolledCourses, newEnrollment]
        }));
      },
      updateProgress: (courseId, lessonId) => {
        if (!get().user) return;
        
        const course = courses.find(c => c.id === courseId);
        if (!course) return;
        
        const lessons = course.lessons;
        const lessonIndex = lessons.findIndex(l => l.id === lessonId);
        if (lessonIndex === -1) return;
        
        set((state) => {
          const updatedEnrolledCourses = state.enrolledCourses.map(ec => {
            if (ec.courseId !== courseId) return ec;
            
            // Add lesson to completed if not already
            const completedLessons = ec.completedLessons.includes(lessonId) 
              ? ec.completedLessons 
              : [...ec.completedLessons, lessonId];
            
            // Calculate new progress
            const progress = Math.round((completedLessons.length / lessons.length) * 100);
            
            return {
              ...ec,
              progress,
              completedLessons,
              lastLessonId: lessonId,
              timeSpent: ec.timeSpent + 5, // Add 5 minutes per lesson completion
            };
          });
          
          return {
            enrolledCourses: updatedEnrolledCourses,
            user: state.user ? {
              ...state.user,
              enrolledCourses: updatedEnrolledCourses
            } : null
          };
        });
      },
      getCourseProgress: (courseId) => {
        const enrolledCourse = get().enrolledCourses.find(ec => ec.courseId === courseId);
        return enrolledCourse?.progress || 0;
      },
      getLastLesson: (courseId) => {
        const enrolledCourse = get().enrolledCourses.find(ec => ec.courseId === courseId);
        return enrolledCourse?.lastLessonId || null;
      },

      // Notes state
      notes: mockUser.notes,
      addNote: (courseId, lessonId, content) => {
        if (!get().user) return;
        
        const newNote: UserNote = {
          id: `note-${Date.now()}`,
          lessonId,
          courseId,
          content,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        
        set((state) => ({
          notes: [...state.notes, newNote],
          user: state.user ? {
            ...state.user,
            notes: [...state.user.notes, newNote]
          } : null
        }));
      },
      updateNote: (noteId, content) => {
        set((state) => {
          const updatedNotes = state.notes.map(note => 
            note.id === noteId 
              ? { ...note, content, updatedAt: new Date().toISOString() } 
              : note
          );
          
          return {
            notes: updatedNotes,
            user: state.user ? {
              ...state.user,
              notes: updatedNotes
            } : null
          };
        });
      },
      deleteNote: (noteId) => {
        set((state) => {
          const filteredNotes = state.notes.filter(note => note.id !== noteId);
          
          return {
            notes: filteredNotes,
            user: state.user ? {
              ...state.user,
              notes: filteredNotes
            } : null
          };
        });
      },
      getLessonNotes: (courseId, lessonId) => {
        return get().notes.filter(note => note.courseId === courseId && note.lessonId === lessonId);
      },
    }),
    {
      name: 'lms-storage',
    }
  )
);