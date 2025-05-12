import Link from 'next/link';
import { Star } from 'lucide-react';
import { Course } from '@/lib/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { categories } from '@/data/categories';
import Image from 'next/image';

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  // Find category objects that match the course categories
  const courseCategories = categories.filter(category => 
    course.categories.includes(category.id)
  );

  

  return (
    <Link href={`/courses/${course.id}`} className="block group">
      <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-md flex flex-col">
        <div className="relative aspect-video overflow-hidden">
          <Image 
            width={1260} // Add width
            height={750} // Add height
            
            src={course.thumbnail} 
            alt={course.title}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-black/60 to-transparent">
            <div className="flex flex-wrap gap-1">
              {courseCategories.map(category => (
                <Badge 
                  key={category.id}
                  className={`${category.color} text-white`}
                >
                  {category.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <CardContent className="flex-grow p-4">
          <div className="flex items-center space-x-1 text-amber-500 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="h-4 w-4"
                fill={i < Math.floor(course.rating) ? "currentColor" : "none"}
              />
            ))}
            <span className="text-sm text-muted-foreground ml-1">
              ({course.totalRatings})
            </span>
          </div>
          <h3 className="font-bold text-lg leading-tight mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {course.title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2">
            {course.description}
          </p>
        </CardContent>
        <CardFooter className="px-4 py-3 border-t flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Image 
              width={48} // Add width
              height={48} // Add height
              
              src={course.author.avatar} 
              alt={course.author.name}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-xs text-muted-foreground">
              {course.author.name}
            </span>
          </div>
          <span className="text-xs text-muted-foreground">
            {course.lessons.length} lessons
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}