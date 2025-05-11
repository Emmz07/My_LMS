'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CheckCircle, CircleIcon, ChevronDown, ChevronUp, PlayCircle } from 'lucide-react';
import { Lesson, Course } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { useStore } from '@/lib/store';
import { cn } from '@/lib/utils';

interface LessonSidebarProps {
  course: Course;
  currentLessonId: string;
}

export function LessonSidebar({ course, currentLessonId }: LessonSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const router = useRouter();
  const { enrolledCourses, updateProgress } = useStore();
  
  const enrolledCourse = enrolledCourses.find((ec: { courseId: string }) => ec.courseId === course.id);
  const completedLessons = enrolledCourse?.completedLessons || [];
  
  const handleMarkComplete = () => {
    updateProgress(course.id, currentLessonId);
  };
  
  // Find next lesson
  const currentLessonIndex = course.lessons.findIndex(lesson => lesson.id === currentLessonId);
  const nextLesson = course.lessons[currentLessonIndex + 1];
  
  const handleNextLesson = () => {
    if (nextLesson) {
      // Mark current as complete and go to next lesson
      updateProgress(course.id, currentLessonId);
      router.push(`/courses/${course.id}/lessons/${nextLesson.id}`);
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden bg-card">
      <div className="p-4 border-b flex justify-between items-center">
        <h3 className="font-medium">Course Content</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0" 
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
        </Button>
      </div>
      
      {!isCollapsed && (
        <div className="p-2">
          <div className="text-xs text-muted-foreground mb-2">
            {course.lessons.length} lessons • {completedLessons.length} completed
          </div>
          
          <div className="space-y-1 max-h-[calc(100vh-250px)] overflow-y-auto">
            {course.lessons.map((lesson) => {
              const isCompleted = completedLessons.includes(lesson.id);
              const isCurrent = lesson.id === currentLessonId;
              
              return (
                <Link 
                  key={lesson.id} 
                  href={`/courses/${course.id}/lessons/${lesson.id}`}
                  className={cn(
                    "flex items-start p-2 rounded-md gap-2 group transition-colors",
                    isCurrent ? "bg-primary/10" : "hover:bg-muted"
                  )}
                >
                  <div className="mt-0.5 text-muted-foreground">
                    {isCompleted ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : isCurrent ? (
                      <PlayCircle className="h-4 w-4 text-primary" />
                    ) : (
                      <CircleIcon className="h-4 w-4" />
                    )}
                  </div>
                  <div className="flex-1 text-sm">
                    <div className={cn(
                      "font-medium",
                      isCurrent ? "text-primary" : isCompleted ? "text-muted-foreground" : ""
                    )}>
                      {lesson.title}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {lesson.duration} min
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          
          <div className="mt-4 pt-4 border-t flex flex-col gap-2">
            {nextLesson ? (
              <Button onClick={handleNextLesson} className="w-full">
                Mark Complete & Continue
              </Button>
            ) : (
              <Button onClick={handleMarkComplete} className="w-full">
                Mark as Complete
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}