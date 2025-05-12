// File: app/courses/[courseId]/lessons/[lessonId]/page.tsx

import { Suspense } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import LessonContent from './LessonContent';

export default function LessonPageWrapper() {
  return (
    <MainLayout>
      <Suspense fallback={<div className="p-8">Loading lesson...</div>}>
        <LessonContent />
      </Suspense>
    </MainLayout>
  );
}
