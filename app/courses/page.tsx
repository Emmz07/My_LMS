import { Suspense } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { SearchBar } from '@/components/courses/SearchBar';
import { CoursesContent } from './CoursesContent'; // Imported here

export default function CoursesPage() {
  return (
    <MainLayout>
      <div className="bg-muted/30 py-8">
        <div className="container px-4 mx-auto">
          <h1 className="text-3xl font-bold mb-4">Courses</h1>
          <SearchBar />
        </div>
      </div>

      <Suspense fallback={<div>Loading courses...</div>}>
        <CoursesContent />
      </Suspense>
    </MainLayout>
  );
}
