'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { CourseGrid } from '@/components/courses/CourseGrid';
import { CategoryFilter } from '@/components/courses/CategoryFilter';
import { RatingFilter } from '@/components/courses/RatingFilter';
import { courses } from '@/data/courses';
import { categories } from '@/data/categories';
import { Course } from '@/lib/types';

export function CoursesContent() {
  const searchParams = useSearchParams();
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(courses);

  const searchQuery = searchParams.get('query') || '';
  const categorySlug = searchParams.get('category') || '';
  const minRating = searchParams.get('rating') ? parseInt(searchParams.get('rating') || '0') : 0;

  useEffect(() => {
    let result = [...courses];

    if (searchQuery) {
      result = result.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (categorySlug) {
      const categoryId = categories.find(c => c.slug === categorySlug)?.id;
      if (categoryId) {
        result = result.filter(course => course.categories.includes(categoryId));
      }
    }

    if (minRating > 0) {
      result = result.filter(course => course.rating >= minRating);
    }

    setFilteredCourses(result);
  }, [searchQuery, categorySlug, minRating]);

  return (
    <div className="container px-4 mx-auto py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64 space-y-6">
          <div>
            <h3 className="font-medium mb-2">Categories</h3>
            <CategoryFilter />
          </div>

          <div>
            <h3 className="font-medium mb-2">Ratings</h3>
            <RatingFilter />
          </div>
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              {filteredCourses.length} {filteredCourses.length === 1 ? 'Course' : 'Courses'}
              {searchQuery && ` for "${searchQuery}"`}
              {categorySlug && ` in ${categories.find(c => c.slug === categorySlug)?.name}`}
            </h2>
          </div>

          <CourseGrid
            courses={filteredCourses}
            emptyMessage="No courses match your search criteria. Try adjusting your filters."
          />
        </div>
      </div>
    </div>
  );
}
