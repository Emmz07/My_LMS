import { CourseCard } from '@/components/courses/CourseCard';
import { Course } from '@/lib/types';

interface CourseGridProps {
  courses: Course[];
  emptyMessage?: string;
}

export function CourseGrid({ courses, emptyMessage = "No courses found." }: CourseGridProps) {
  if (courses.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}