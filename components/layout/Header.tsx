'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useStore } from '@/lib/store';
import { LogOut, Menu, Moon, Sun, User, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from 'next-themes';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useStore();
  const { theme, setTheme, resolvedTheme } = useTheme(); // Use `resolvedTheme` for SSR-safe theme detection
  const [mounted, setMounted] = useState(false);

  // Ensure the component is mounted before accessing the theme
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-background/95 backdrop-blur-sm shadow-sm py-2'
          : 'bg-transparent py-4'
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="bg-primary rounded-full p-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 text-primary-foreground"
            >
              <path d="M12 2v6.5" />
              <path d="M18.4 6.5 13.5 9" />
              <path d="M3 13c0 5.8 2.2 7 9 7 6.8 0 9-1.2 9-7s-2.2-7-9-7c-6.8 0-9 1.2-9 7Z" />
            </svg>
          </div>
          <span className="text-xl font-bold">LearnHub</span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="/courses"
            className="text-foreground/80 hover:text-foreground transition-colors"
          >
            Courses
          </Link>
          <Link
            href="/dashboard"
            className="text-foreground/80 hover:text-foreground transition-colors"
          >
            Dashboard
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {/* Render placeholder during SSR */}
            {mounted ? (
              resolvedTheme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )
            ) : (
              <div className="h-5 w-5" />
            )}
          </Button>

          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild>
              <Link href="/login">Sign In</Link>
            </Button>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="mr-2"
          >
            {mounted ? (
              resolvedTheme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )
            ) : (
              <div className="h-5 w-5" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-40 bg-background/95 backdrop-blur-sm">
          <nav className="container mx-auto px-4 py-8 flex flex-col space-y-6">
            <Link
              href="/courses"
              className="text-lg font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Courses
            </Link>
            <Link
              href="/dashboard"
              className="text-lg font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <div className="pt-4 border-t border-border">
              {isAuthenticated && user ? (
                <>
                  <div className="flex items-center space-x-4 py-2">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      asChild
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Link href="/profile">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </Button>
                  </div>
                </>
              ) : (
                <Button className="w-full" asChild onClick={() => setMobileMenuOpen(false)}>
                  <Link href="/login">Sign In</Link>
                </Button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}