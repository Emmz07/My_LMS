'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { MainLayout } from '@/components/layout/MainLayout';
import { VideoPlayer } from '@/components/lessons/VideoPlayer';
import { LessonSidebar } from '@/components/lessons/LessonSidebar';
import { NoteEditor } from '@/components/lessons/NoteEditor';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { courses } from '@/data/courses';
import { Course, Lesson } from '@/lib/types';
import { useStore } from '@/lib/store';

export default function LessonPage() {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
  const router = useRouter();
  const { isAuthenticated, enrolledCourses } = useStore();

  const [course, setCourse] = useState<Course | null>(null);
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [prevLesson, setPrevLesson] = useState<Lesson | null>(null);
  const [nextLesson, setNextLesson] = useState<Lesson | null>(null);

  useEffect(() => {
    if (!courseId || !lessonId) return;

    // Find course and lesson
    const foundCourse = courses.find((c: Course) => c.id === courseId);
    if (foundCourse) {
      setCourse(foundCourse);

      const foundLesson = foundCourse.lessons.find((l: Lesson) => l.id === lessonId);
      if (foundLesson) {
        setLesson(foundLesson);

        // Find previous and next lessons
        const lessonIndex = foundCourse.lessons.findIndex((l: Lesson) => l.id === lessonId);
        setPrevLesson(lessonIndex > 0 ? foundCourse.lessons[lessonIndex - 1] : null);
        setNextLesson(lessonIndex < foundCourse.lessons.length - 1 ? foundCourse.lessons[lessonIndex + 1] : null);
      } else {
        setLesson(null);
      }

      // Check if user is enrolled
      const enrolled = enrolledCourses?.some((ec: { courseId: string }) => ec.courseId === foundCourse.id) || false;
      setIsEnrolled(enrolled);
    } else {
      setCourse(null);
    }
  }, [courseId, lessonId, enrolledCourses]);

  if (!course || !lesson) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Lesson not found</h1>
            <p className="mt-4 text-muted-foreground">
              The lesson you're looking for doesn't exist or has been removed.
            </p>
            <Button className="mt-6" asChild>
              <Link href="/courses">Back to Courses</Link>
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  // If not authenticated or not enrolled, redirect to course page
  if (!isAuthenticated || !isEnrolled) {
    router.push(`/courses/${courseId}`);
    return null;
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link 
            href={`/courses/${courseId}`}
            className="text-sm text-muted-foreground hover:text-foreground flex items-center"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to course
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <h1 className="text-2xl font-bold">{lesson.title}</h1>
            
            <VideoPlayer videoUrl={lesson.videoUrl} />
            
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <h2 className="text-xl font-semibold mb-2">About this lesson</h2>
              <p>{lesson.description}</p>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t">
              {prevLesson ? (
                <Button variant="outline" asChild>
                  <Link href={`/courses/${courseId}/lessons/${prevLesson.id}`}>
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous Lesson
                  </Link>
                </Button>
              ) : (
                <div></div>
              )}
              
              {nextLesson && (
                <Button asChild>
                  <Link href={`/courses/${courseId}/lessons/${nextLesson.id}`}>
                    Next Lesson
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              )}
            </div>
            
            <div className="pt-6">
              <NoteEditor courseId={courseId} lessonId={lessonId} />
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <LessonSidebar course={course} currentLessonId={lessonId} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}