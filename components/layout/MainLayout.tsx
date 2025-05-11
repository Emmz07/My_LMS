'use client';

import { ReactNode } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-16">{children}</main>
        <Footer />
      </div>
      <Toaster />
    </ThemeProvider>
  );
}