'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { MainLayout } from '@/components/layout/MainLayout';
import { CourseGrid } from '@/components/courses/CourseGrid';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  PlayCircle, 
  Star, 
  Users 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { courses } from '@/data/courses';
import { categories } from '@/data/categories';
import { useStore } from '@/lib/store';
import { Course } from '@/lib/types';
import { formatCourseDate } from '@/lib/utils';

export default function CourseDetailPage() {
  const { courseId } = useParams();
  const { isAuthenticated, enrolledCourses, enrollInCourse, getCourseProgress, getLastLesson } = useStore();
  
  const [course, setCourse] = useState<Course | null>(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [lastLessonId, setLastLessonId] = useState<string | null>(null);
  const [relatedCourses, setRelatedCourses] = useState<Course[]>([]);
  
  useEffect(() => {
    // Find course by ID
    const foundCourse = courses.find(c => c.id === courseId);
    if (foundCourse) {
      setCourse(foundCourse);
      
      // Check if user is enrolled in this course
      const enrolled = enrolledCourses.some((ec: { courseId: string }) => ec.courseId === foundCourse.id);
      setIsEnrolled(enrolled);
      
      if (enrolled) {
        // Get course progress
        setProgress(getCourseProgress(foundCourse.id));
        setLastLessonId(getLastLesson(foundCourse.id));
      }
      
      // Find related courses (same categories, excluding current course)
      const related = courses
        .filter(c => 
          c.id !== foundCourse.id && 
          c.categories.some(cat => foundCourse.categories.includes(cat))
        )
        .slice(0, 3);
      
      setRelatedCourses(related);
    }
  }, [courseId, enrolledCourses, getCourseProgress, getLastLesson]);
  
  const handleEnroll = () => {
    if (!course) return;
    
    enrollInCourse(course.id);
    setIsEnrolled(true);
    setProgress(0);
  };
  
  if (!course) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Course not found</h1>
            <p className="mt-4 text-muted-foreground">
              The course you're looking for doesn't exist or has been removed.
            </p>
            <Button className="mt-6" asChild>
              <Link href="/courses">Back to Courses</Link>
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  // Find course categories
  const courseCategories = categories.filter(category => 
    course.categories.includes(category.id)
  );
  
  // First lesson for "Start Course" button
  const firstLesson = course.lessons[0];
  
  // Format total course duration
  const totalDuration = course.lessons.reduce((total, lesson) => total + lesson.duration, 0);
  const hours = Math.floor(totalDuration / 60);
  const minutes = totalDuration % 60;
  const durationText = hours > 0 
    ? `${hours}h ${minutes > 0 ? `${minutes}m` : ''}` 
    : `${minutes}m`;
  
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background pt-12 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {/* Course Header */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {courseCategories.map(category => (
                    <Badge 
                      key={category.id}
                      className={`${category.color} text-white`}
                    >
                      {category.name}
                    </Badge>
                  ))}
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
                
                <p className="text-lg text-muted-foreground mb-6">
                  {course.description}
                </p>
                
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="flex items-center">
                    <div className="flex items-center mr-1 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4"
                          fill={i < Math.floor(course.rating) ? "currentColor" : "none"}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium">{course.rating.toFixed(1)}</span>
                    <span className="text-sm text-muted-foreground ml-1">
                      ({course.totalRatings} ratings)
                    </span>
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="h-4 w-4 mr-1" />
                    {course.enrollments.toLocaleString()} students
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    {durationText}
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    Last updated {formatCourseDate(course.updatedAt)}
                  </div>
                </div>
                
                <div className="flex items-center gap-4 mb-6">
                  <img 
                    src={course.author.avatar} 
                    alt={course.author.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="text-sm font-medium">{course.author.name}</p>
                    <p className="text-xs text-muted-foreground">Instructor</p>
                  </div>
                </div>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="lg:col-span-1"
            >
              {/* Course Card */}
              <Card className="sticky top-20 overflow-hidden">
                <div className="aspect-video relative">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <Button variant="outline" size="icon" className="h-14 w-14 rounded-full bg-white text-primary">
                      <PlayCircle className="h-8 w-8" />
                    </Button>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  {isEnrolled ? (
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Your progress</span>
                          <span className="text-sm">{progress}%</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                      </div>
                      
                      <Button className="w-full" size="lg" asChild>
                        <Link href={lastLessonId 
                          ? `/courses/${course.id}/lessons/${lastLessonId}` 
                          : `/courses/${course.id}/lessons/${firstLesson.id}`
                        }>
                          <PlayCircle className="mr-2 h-5 w-5" />
                          {progress > 0 ? 'Continue Learning' : 'Start Course'}
                        </Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-5 w-5 text-muted-foreground" />
                          <span>{course.lessons.length} lessons</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-5 w-5 text-muted-foreground" />
                          <span>{durationText}</span>
                        </div>
                      </div>
                      
                      <Button 
                        className="w-full" 
                        size="lg"
                        onClick={handleEnroll}
                      >
                        Enroll Now
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Course Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="instructor">Instructor</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <h2 className="text-2xl font-bold mb-4">About this course</h2>
                <p className="whitespace-pre-line">{course.longDescription}</p>
              </div>
              
              <div className="prose prose-slate dark:prose-invert max-w-none mt-8">
                <h2 className="text-2xl font-bold mb-4">What you'll learn</h2>
                <div className="mt-6 whitespace-pre-line">
                  {course.syllabus}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="curriculum">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-4">Course Content</h2>
                <p className="text-muted-foreground">
                  {course.lessons.length} lessons • {durationText} total length
                </p>
              </div>
              
              <div className="space-y-4">
                {course.lessons.map((lesson, index) => (
                  <div key={lesson.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 rounded-full p-2 mt-1">
                          <span className="text-sm font-medium">{index + 1}</span>
                        </div>
                        <div>
                          <h3 className="font-medium">{lesson.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {lesson.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm text-muted-foreground mr-4">
                          {lesson.duration} min
                        </span>
                        
                        {isEnrolled ? (
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/courses/${course.id}/lessons/${lesson.id}`}>
                              <PlayCircle className="h-4 w-4 mr-1" />
                              Watch
                            </Link>
                          </Button>
                        ) : (
                          <Button variant="outline" size="sm" onClick={handleEnroll}>
                            <PlayCircle className="h-4 w-4 mr-1" />
                            Preview
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="instructor">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-4">About the Instructor</h2>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/4">
                  <img 
                    src={course.author.avatar} 
                    alt={course.author.name}
                    className="w-32 h-32 rounded-full mb-4"
                  />
                  <h3 className="text-xl font-semibold">{course.author.name}</h3>
                  <p className="text-muted-foreground mt-1">Course Instructor</p>
                </div>
                
                <div className="md:w-3/4">
                  <p className="text-muted-foreground mb-4">
                    Expert instructor with years of experience in teaching and industry practice.
                    Passionate about sharing knowledge and helping students succeed in their learning journey.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-1">Total Students</h4>
                      <p className="text-2xl font-bold">12,500+</p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-1">Courses</h4>
                      <p className="text-2xl font-bold">8</p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-1">Avg. Rating</h4>
                      <p className="text-2xl font-bold">4.8</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      {/* Related Courses */}
      {relatedCourses.length > 0 && (
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">Related Courses</h2>
            <CourseGrid courses={relatedCourses} />
          </div>
        </section>
      )}
    </MainLayout>
  );
}