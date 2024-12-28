"use client";

import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Frequency } from '@/lib/types/scheduling-preferences';

interface FrequencySectionProps {
  value: Frequency;
  onChange: (value: Frequency) => void;
  error?: string;
}

export function FrequencySection({
  value,
  onChange,
  error,
}: FrequencySectionProps) {
  return (
    <div className="space-y-4">
      <Label>How often would you like to schedule appointments?</Label>
      <Select value={value} onValueChange={(value) => onChange(value as Frequency)}>
        <SelectTrigger>
          <SelectValue placeholder="Select frequency" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="weekly">Weekly</SelectItem>
          <SelectItem value="biweekly">Every Two Weeks</SelectItem>
          <SelectItem value="monthly">Monthly</SelectItem>
        </SelectContent>
      </Select>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}