"use client";

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface SleepSectionProps {
  hoursPerNight: number;
  quality: string;
  difficulties: string;
  onHoursChange: (hours: number) => void;
  onQualityChange: (quality: string) => void;
  onDifficultiesChange: (difficulties: string) => void;
  errors?: {
    hoursPerNight?: string;
    quality?: string;
  };
}

export function SleepSection({
  hoursPerNight,
  quality,
  difficulties,
  onHoursChange,
  onQualityChange,
  onDifficultiesChange,
  errors,
}: SleepSectionProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>How many hours do you typically sleep per night?</Label>
        <Input
          type="number"
          min={0}
          max={24}
          value={hoursPerNight}
          onChange={(e) => onHoursChange(Number(e.target.value))}
          className="max-w-[120px]"
        />
        {errors?.hoursPerNight && (
          <p className="text-sm text-destructive">{errors.hoursPerNight}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>How would you rate your sleep quality?</Label>
        <Select value={quality} onValueChange={onQualityChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select sleep quality" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="poor">Poor</SelectItem>
            <SelectItem value="fair">Fair</SelectItem>
            <SelectItem value="good">Good</SelectItem>
            <SelectItem value="excellent">Excellent</SelectItem>
          </SelectContent>
        </Select>
        {errors?.quality && (
          <p className="text-sm text-destructive">{errors.quality}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Do you experience any sleep difficulties?</Label>
        <Textarea
          value={difficulties}
          onChange={(e) => onDifficultiesChange(e.target.value)}
          placeholder="E.g., trouble falling asleep, waking up frequently..."
        />
      </div>
    </div>
  );
}