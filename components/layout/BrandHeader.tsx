"use client";

import Image from 'next/image';
import { cn } from '@/lib/utils';

interface BrandHeaderProps {
  className?: string;
}

export function BrandHeader({ className }: BrandHeaderProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <Image
        src="/logo.svg"
        alt="Company Logo"
        width={40}
        height={40}
        className="h-10 w-auto"
      />
      <div className="flex flex-col">
        <span className="font-semibold text-lg">Company Name</span>
        <span className="text-sm text-muted-foreground">Patient Onboarding</span>
      </div>
    </div>
  );
}