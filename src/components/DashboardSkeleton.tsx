
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const DashboardSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-stravesta-dark relative">
      <div className="absolute inset-0 bg-gradient-to-br from-stravesta-teal/5 via-transparent to-stravesta-navy/20"></div>
      
      <div className="relative z-10">
        {/* Header Skeleton */}
        <header className="bg-stravesta-navy/80 backdrop-blur-sm border-b border-stravesta-teal/20">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <Skeleton className="h-8 w-32 bg-stravesta-darkGray" />
                <Skeleton className="h-6 w-20 bg-stravesta-darkGray" />
              </div>
              <div className="flex items-center space-x-4">
                <Skeleton className="h-6 w-24 bg-stravesta-darkGray" />
                <Skeleton className="h-9 w-20 bg-stravesta-darkGray" />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Skeleton */}
        <main className="container mx-auto px-4 py-12">
          {/* Welcome Section Skeleton */}
          <div className="mb-12">
            <Skeleton className="h-10 w-96 bg-stravesta-darkGray mb-4" />
            <Skeleton className="h-6 w-[600px] bg-stravesta-darkGray" />
          </div>

          {/* Tools Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="bg-stravesta-navy/50 border-stravesta-teal/20 border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <Skeleton className="h-8 w-8 bg-stravesta-darkGray" />
                  <Skeleton className="h-6 w-16 bg-stravesta-darkGray" />
                </div>
                <Skeleton className="h-6 w-32 bg-stravesta-darkGray mb-2" />
                <Skeleton className="h-4 w-full bg-stravesta-darkGray mb-4" />
                <div className="space-y-2 mb-4">
                  {Array.from({ length: 4 }).map((_, idx) => (
                    <Skeleton key={idx} className="h-3 w-full bg-stravesta-darkGray" />
                  ))}
                </div>
                <Skeleton className="h-10 w-full bg-stravesta-darkGray" />
              </div>
            ))}
          </div>

          {/* Beta Notice Skeleton */}
          <div className="bg-stravesta-navy/50 border border-stravesta-teal/20 p-6 rounded-lg">
            <Skeleton className="h-6 w-48 bg-stravesta-darkGray mb-2" />
            <Skeleton className="h-4 w-full bg-stravesta-darkGray mb-4" />
            <div className="flex space-x-4">
              <Skeleton className="h-10 w-32 bg-stravesta-darkGray" />
              <Skeleton className="h-10 w-32 bg-stravesta-darkGray" />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
