'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { categories } from '@/data/categories';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get('category');

  const handleCategoryClick = (categorySlug: string) => {
    const params = new URLSearchParams(searchParams);
    
    if (selectedCategory === categorySlug) {
      // Deselect if already selected
      params.delete('category');
    } else {
      // Select new category
      params.set('category', categorySlug);
    }
    
    router.push(`/courses?${params.toString()}`);
  };

  const handleClearAll = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('category');
    router.push(`/courses?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-2 py-4">
      {categories.map((category) => (
        <Badge
          key={category.id}
          variant="outline"
          className={cn(
            'cursor-pointer hover:bg-muted transition-colors py-1.5 px-3',
            selectedCategory === category.slug && `border-transparent ${category.color} text-white`
          )}
          onClick={() => handleCategoryClick(category.slug)}
        >
          {category.name}
        </Badge>
      ))}
      
      {selectedCategory && (
        <Badge
          variant="outline"
          className="cursor-pointer hover:bg-muted transition-colors py-1.5 px-3"
          onClick={handleClearAll}
        >
          Clear All
        </Badge>
      )}
    </div>
  );
}