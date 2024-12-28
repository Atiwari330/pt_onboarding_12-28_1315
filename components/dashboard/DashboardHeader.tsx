"use client";

import { BrandHeader } from '@/components/layout/BrandHeader';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export function DashboardHeader() {
  const router = useRouter();

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <BrandHeader />
        <Button
          variant="ghost"
          onClick={() => router.push('/')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Onboarding
        </Button>
      </div>
    </header>
  );
}