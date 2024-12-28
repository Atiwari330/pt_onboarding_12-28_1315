"use client";

import { Button } from '@/components/ui/button';
import { HelpCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function HelpButton() {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      onClick={() => router.push('/support')}
      className="flex items-center gap-2"
    >
      <HelpCircle className="h-4 w-4" />
      Need Help?
    </Button>
  );
}