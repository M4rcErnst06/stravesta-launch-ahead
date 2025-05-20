
import React from 'react';
import EmailSubscribeForm from '@/components/EmailSubscribeForm';
import { Toaster } from '@/components/ui/toaster';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-stravesta-dark bg-tech-pattern relative overflow-hidden">
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-stravesta-dark/90 pointer-events-none"></div>
      
      {/* Decorative glow */}
      <div className="absolute top-40 -left-40 w-80 h-80 bg-stravesta-teal/10 rounded-full blur-[100px] animate-pulse-slow"></div>
      <div className="absolute -top-10 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] animate-pulse-slow"></div>
      
      {/* Header */}
      <header className="relative z-10 pt-8 pb-4 px-4 container">
        {/* Logo has been removed */}
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-grow container px-4 flex flex-col justify-center">
        <div className="max-w-4xl mx-auto text-center py-12">
          {/* Hero Section */}
          <div className="space-y-6 mb-12">
            <div className="inline-block px-4 py-1 rounded-full bg-stravesta-teal/10 text-stravesta-teal text-sm font-medium mb-2 animate-float">
              Launching Soon
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              <span className="text-gradient">Stravesta</span> is Coming
            </h1>
            
            {/* Email subscription form */}
            <div className="mt-10">
              <h2 className="text-xl font-semibold mb-4">
                Want to be the first to know when we go live?
              </h2>
              <EmailSubscribeForm />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 container px-4 py-8 text-center">
        <p className="text-sm text-stravesta-lightGray">
          &copy; {new Date().getFullYear()} Stravesta. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Index;
