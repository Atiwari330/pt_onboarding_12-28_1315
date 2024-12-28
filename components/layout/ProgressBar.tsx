"use client";

import React from 'react';
import { useOnboarding } from '@/lib/context/OnboardingContext';
import { Progress } from '@/components/ui/progress';

export function ProgressBar() {
  const { state } = useOnboarding();
  const progress = (state.currentStep / state.totalSteps) * 100;

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>Step {state.currentStep} of {state.totalSteps}</span>
        <span>{Math.round(progress)}% Complete</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
}