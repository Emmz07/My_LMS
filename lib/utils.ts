import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, parseISO } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCourseDate(dateString: string): string {
  const date = parseISO(dateString);
  return format(date, 'MMMM yyyy');
}