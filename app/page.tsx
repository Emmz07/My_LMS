'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { MainLayout } from '@/components/layout/MainLayout';
import { CourseGrid } from '@/components/courses/CourseGrid';
import { SearchBar } from '@/components/courses/SearchBar';
import { Button } from '@/components/ui/button';
import { ChevronRight, BarChart, ArrowRight } from 'lucide-react';
import { courses } from '@/data/courses';
import { categories } from '@/data/categories';
import { Badge } from '@/components/ui/badge';

export default function Home() {
  // Get featured courses (top rated)
  const featuredCourses = [...courses]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  // Get newest courses
  const newestCourses = [...courses]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  // Framer Motion Variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const liquidEffect = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.8, ease: 'easeInOut' },
    },
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <motion.section
        className="relative bg-gradient-to-b from-primary/5 to-background pt-20 pb-16 md:pt-24 md:pb-24 md:px-12 lg:px-16"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div variants={fadeIn}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
                Elevate Your Skills with Expert-Led Courses
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-md">
                Discover courses taught by industry experts and transform your career with hands-on learning experiences.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/courses">
                    Explore Courses
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/dashboard">View Dashboard</Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              className="hidden md:block relative"
              variants={liquidEffect}
            >
              <img
                src="https://images.pexels.com/photos/4492126/pexels-photo-4492126.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Online learning"
                className="rounded-xl shadow-xl w-full"
              />
              <div className="absolute -bottom-8 -left-8 bg-card rounded-lg shadow-lg p-4 flex items-center space-x-3">
                <div className="bg-green-500/10 rounded-full p-2">
                  <BarChart className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Course Completion</p>
                  <p className="text-2xl font-bold">92%</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Search Section */}
      <motion.section
        className="py-12 bg-muted/30 md:px-12 lg:px-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <motion.h2 className="text-3xl font-bold mb-4" variants={fadeIn}>
              Find your perfect course
            </motion.h2>
            <motion.p
              className="text-muted-foreground max-w-2xl mx-auto"
              variants={fadeIn}
            >
              Search through our extensive library of courses spanning multiple disciplines.
            </motion.p>
          </div>

          <SearchBar />

          <motion.div
            className="mt-6 flex flex-wrap justify-center gap-2"
            variants={staggerContainer}
          >
            {categories.map((category) => (
              <motion.div key={category.id} variants={fadeIn}>
                <Link href={`/courses?category=${category.slug}`}>
                  <Badge
                    className={`${category.color} text-white cursor-pointer px-3 py-1`}
                  >
                    {category.name}
                  </Badge>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Courses */}
      <motion.section
        className="py-16 md:px-12 lg:px-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <div className="container mx-auto">
          <div className="flex justify-between items-end mb-10">
            <motion.div variants={fadeIn}>
              <h2 className="text-3xl font-bold mb-2">Featured Courses</h2>
              <p className="text-muted-foreground">Our highest-rated courses</p>
            </motion.div>
            <motion.div variants={fadeIn}>
              <Button variant="ghost" asChild>
                <Link href="/courses" className="flex items-center">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>

          <CourseGrid courses={featuredCourses} />
        </div>
      </motion.section>

      {/* Categories Section */}
      <motion.section
        className="py-16 bg-muted/30 md:px-12 lg:px-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <motion.h2 className="text-3xl font-bold mb-4" variants={fadeIn}>
              Browse Categories
            </motion.h2>
            <motion.p
              className="text-muted-foreground max-w-2xl mx-auto"
              variants={fadeIn}
            >
              Explore our diverse range of course categories
            </motion.p>
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
            variants={staggerContainer}
          >
            {categories.slice(0, 6).map((category) => (
              <motion.div key={category.id} variants={fadeIn}>
                <Link href={`/courses?category=${category.slug}`} className="group">
                  <div className="bg-card rounded-lg p-6 border hover:shadow-md transition-all h-full flex flex-col">
                    <div
                      className={`${category.color} rounded-full p-3 w-14 h-14 flex items-center justify-center mb-4`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-white"
                      >
                        <path d="M12 2v6.5"></path>
                        <path d="M18.4 6.5 13.5 9"></path>
                        <path d="M3 13c0 5.8 2.2 7 9 7 6.8 0 9-1.2 9-7s-2.2-7-9-7c-6.8 0-9 1.2-9 7Z"></path>
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {
                        courses.filter((course) =>
                          course.categories.includes(category.id)
                        ).length
                      }{' '}
                      courses
                    </p>
                    <div className="mt-auto flex items-center font-medium text-sm group-hover:text-primary transition-colors">
                      Explore Category
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Newest Courses */}
      <motion.section
        className="py-16 md:px-12 lg:px-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <div className="container mx-auto">
          <div className="flex justify-between items-end mb-10">
            <motion.div variants={fadeIn}>
              <h2 className="text-3xl font-bold mb-2">Newest Courses</h2>
              <p className="text-muted-foreground">Recently added to our platform</p>
            </motion.div>
            <motion.div variants={fadeIn}>
              <Button variant="ghost" asChild>
                <Link href="/courses" className="flex items-center">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>

          <CourseGrid courses={newestCourses} />
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-16 bg-primary text-primary-foreground md:px-12 lg:px-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div variants={fadeIn}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to start your learning journey?
              </h2>
              <p className="text-primary-foreground/80 mb-6">
                Join thousands of students already learning on our platform. Get unlimited access to all courses.
              </p>
              <Button size="lg" variant="secondary" asChild>
                <Link href="/courses">Get Started Today</Link>
              </Button>
            </motion.div>
            <motion.div
              className="relative hidden md:block"
              variants={liquidEffect}
            >
              <img
                src="https://images.pexels.com/photos/4145153/pexels-photo-4145153.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Students learning"
                className="rounded-lg shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>
    </MainLayout>
  );
}