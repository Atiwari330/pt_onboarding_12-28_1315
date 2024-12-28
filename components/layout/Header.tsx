"use client";

import { BrandHeader } from './BrandHeader';
import { HelpButton } from './HelpButton';
import { Button } from '@/components/ui/button';
import { LogOut, LayoutDashboard } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function Header() {
  const router = useRouter();

  const handleSaveAndExit = () => {
    console.log('Saving and exiting...');
  };

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <BrandHeader />
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            onClick={() => router.push('/dashboard')}
            className="flex items-center gap-2"
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Button>
          <HelpButton />
          <Button
            variant="secondary"
            onClick={handleSaveAndExit}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Save & Exit
          </Button>
        </div>
      </div>
    </header>
  );
}