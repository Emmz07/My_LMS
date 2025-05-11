import { Course } from '@/lib/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlayCircle } from 'lucide-react';

interface ProgressCardProps {
  course: Course;
  progress: number;
  lastLessonId: string | null;
}

export function ProgressCard({ course, progress, lastLessonId }: ProgressCardProps) {
  return (
    <Card className="overflow-hidden flex flex-col hover:shadow-md transition-shadow">
      <div className="relative aspect-video">
        <img 
          src={course.thumbnail} 
          alt={course.title}
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
          <h3 className="font-bold text-white text-lg line-clamp-1">
            {course.title}
          </h3>
          <div className="flex items-center space-x-2">
            <img 
              src={course.author.avatar} 
              alt={course.author.name}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-xs text-white/90">
              {course.author.name}
            </span>
          </div>
        </div>
      </div>
      
      <CardContent className="p-4 flex-grow">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium">Progress</span>
          <span className="text-sm text-muted-foreground">{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
        
        <div className="mt-4 text-sm text-muted-foreground">
          {progress === 0 ? (
            "Not started yet"
          ) : progress === 100 ? (
            "Completed"
          ) : (
            `${Math.ceil((course.lessons.length * progress) / 100)} of ${course.lessons.length} lessons completed`
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 border-t">
        {lastLessonId ? (
          <Button asChild className="w-full">
            <Link href={`/courses/${course.id}/lessons/${lastLessonId}`}>
              <PlayCircle className="mr-2 h-4 w-4" />
              {progress === 0 ? "Start Learning" : "Continue Learning"}
            </Link>
          </Button>
        ) : (
          <Button asChild className="w-full">
            <Link href={`/courses/${course.id}`}>
              <PlayCircle className="mr-2 h-4 w-4" />
              Start Course
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}