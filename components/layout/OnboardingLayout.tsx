"use client";

import React from 'react';
import { OnboardingProvider } from '@/lib/context/OnboardingContext';
import { ProgressBar } from './ProgressBar';
import { Header } from './Header';

export function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <OnboardingProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto space-y-8">
            <ProgressBar />
            <div className="bg-card p-6 rounded-lg shadow-sm min-h-[60vh]">
              {children}
            </div>
          </div>
        </main>
      </div>
    </OnboardingProvider>
  );
}