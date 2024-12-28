"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Save, LogOut } from 'lucide-react';
import { useOnboarding } from '@/lib/context/OnboardingContext';
import { HelpButton } from './HelpButton';

export function SaveProgress() {
  const { state } = useOnboarding();

  const handleSave = () => {
    console.log('Saving progress...', state.savedData);
  };

  const handleSaveAndExit = () => {
    console.log('Saving and exiting...', state.savedData);
  };

  return (
    <div className="fixed bottom-6 right-6 flex gap-3">
      <HelpButton />
      <Button
        variant="outline"
        onClick={handleSave}
        className="flex items-center gap-2"
      >
        <Save className="h-4 w-4" />
        Save Progress
      </Button>
      <Button
        variant="secondary"
        onClick={handleSaveAndExit}
        className="flex items-center gap-2"
      >
        <LogOut className="h-4 w-4" />
        Save & Exit
      </Button>
    </div>
  );
}