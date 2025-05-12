
import { Suspense } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { CourseDetailContent } from './CoursesDetail';

export default function CourseDetailPage() {
  return (
    <MainLayout>
      <Suspense fallback={<div className="p-8">Loading course details...</div>}>
        <CourseDetailContent />
      </Suspense>
    </MainLayout>
  );
}
