'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('query') || '';
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  useEffect(() => {
    // Update search query when URL param changes
    setSearchQuery(searchParams.get('query') || '');
  }, [searchParams]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Create new URL with search query
    const params = new URLSearchParams(searchParams);
    if (searchQuery) {
      params.set('query', searchQuery);
    } else {
      params.delete('query');
    }
    
    router.push(`/courses?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-2xl mx-auto">
      <Input
        type="text"
        placeholder="Search for courses..."
        className="pr-10 h-12 pl-4"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Button 
        type="submit" 
        variant="ghost" 
        size="icon" 
        className="absolute right-0 top-0 h-12 w-12 text-muted-foreground hover:text-foreground"
      >
        <Search className="h-5 w-5" />
      </Button>
    </form>
  );
}