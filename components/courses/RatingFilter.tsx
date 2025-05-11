'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

export function RatingFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [rating, setRating] = useState(searchParams.get('rating') || '');

  useEffect(() => {
    // Update rating when URL param changes
    setRating(searchParams.get('rating') || '');
  }, [searchParams]);

  const handleRatingChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    
    if (value) {
      params.set('rating', value);
    } else {
      params.delete('rating');
    }
    
    router.push(`/courses?${params.toString()}`);
    setRating(value);
  };

  return (
    <div className="w-48">
      <Select value={rating} onValueChange={handleRatingChange}>
        <SelectTrigger>
          <SelectValue placeholder="Filter by rating" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">All Ratings</SelectItem>
          {[4, 3, 2, 1].map((value) => (
            <SelectItem key={value} value={value.toString()}>
              <span className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 mr-0.5 text-amber-500"
                    fill={i < value ? "currentColor" : "none"}
                  />
                ))}
                <span className="ml-1">& Up</span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}