"use client";

import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

interface MoodStressSectionProps {
  mood: number;
  stressLevel: number;
  onMoodChange: (value: number) => void;
  onStressChange: (value: number) => void;
  errors?: {
    mood?: string;
    stressLevel?: string;
  };
}

export function MoodStressSection({
  mood,
  stressLevel,
  onMoodChange,
  onStressChange,
  errors,
}: MoodStressSectionProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label>How would you rate your mood over the past week? (1-10)</Label>
        <div className="space-y-2">
          <Slider
            value={[mood]}
            onValueChange={([value]) => onMoodChange(value)}
            min={1}
            max={10}
            step={1}
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Very Low</span>
            <span>Very High</span>
          </div>
          {errors?.mood && (
            <p className="text-sm text-destructive">{errors.mood}</p>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <Label>How would you rate your stress level? (1-10)</Label>
        <div className="space-y-2">
          <Slider
            value={[stressLevel]}
            onValueChange={([value]) => onStressChange(value)}
            min={1}
            max={10}
            step={1}
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Low Stress</span>
            <span>High Stress</span>
          </div>
          {errors?.stressLevel && (
            <p className="text-sm text-destructive">{errors.stressLevel}</p>
          )}
        </div>
      </div>
    </div>
  );
}