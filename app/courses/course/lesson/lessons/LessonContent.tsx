// File: components/lessons/LessonContent.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { VideoPlayer } from '@/components/lessons/VideoPlayer';
import { LessonSidebar } from '@/components/lessons/LessonSidebar';
import { NoteEditor } from '@/components/lessons/NoteEditor';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { courses } from '@/data/courses';
import { Course, Lesson } from '@/lib/types';
import { useStore } from '@/lib/store';

export default function LessonContent() {
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

    const foundCourse = courses.find((c) => c.id === courseId);
    if (foundCourse) {
      setCourse(foundCourse);

      const foundLesson = foundCourse.lessons.find((l) => l.id === lessonId);
      if (foundLesson) {
        setLesson(foundLesson);

        const idx = foundCourse.lessons.findIndex((l) => l.id === lessonId);
        setPrevLesson(idx > 0 ? foundCourse.lessons[idx - 1] : null);
        setNextLesson(idx < foundCourse.lessons.length - 1 ? foundCourse.lessons[idx + 1] : null);
      }

      const enrolled = enrolledCourses.some((ec) => ec.courseId === foundCourse.id);
      setIsEnrolled(enrolled);
    }
  }, [courseId, lessonId, enrolledCourses]);

  if (!course || !lesson) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Lesson not found</h1>
          <p className="mt-4 text-muted-foreground">
            The lesson you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
          <Button className="mt-6" asChild>
            <Link href="/courses">Back to Courses</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !isEnrolled) {
    router.push(`/courses/${courseId}`);
    return null;
  }

  return (
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
              <div />
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
  );
}
