"use client";

import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { WeekDay, TimePreference } from '@/lib/types/scheduling-preferences';

interface TimePreferencesSectionProps {
  selectedDays: WeekDay[];
  selectedTimes: TimePreference[];
  onDaysChange: (days: WeekDay[]) => void;
  onTimesChange: (times: TimePreference[]) => void;
  errors?: {
    preferredDays?: string;
    preferredTimes?: string;
  };
}

const DAYS: { value: WeekDay; label: string }[] = [
  { value: 'monday', label: 'Monday' },
  { value: 'tuesday', label: 'Tuesday' },
  { value: 'wednesday', label: 'Wednesday' },
  { value: 'thursday', label: 'Thursday' },
  { value: 'friday', label: 'Friday' },
];

const TIMES: { value: TimePreference; label: string }[] = [
  { value: 'morning', label: 'Morning (9AM-12PM)' },
  { value: 'afternoon', label: 'Afternoon (12PM-4PM)' },
  { value: 'evening', label: 'Evening (4PM-7PM)' },
];

export function TimePreferencesSection({
  selectedDays,
  selectedTimes,
  onDaysChange,
  onTimesChange,
  errors,
}: TimePreferencesSectionProps) {
  const handleDayToggle = (day: WeekDay) => {
    const updated = selectedDays.includes(day)
      ? selectedDays.filter((d) => d !== day)
      : [...selectedDays, day];
    onDaysChange(updated);
  };

  const handleTimeToggle = (time: TimePreference) => {
    const updated = selectedTimes.includes(time)
      ? selectedTimes.filter((t) => t !== time)
      : [...selectedTimes, time];
    onTimesChange(updated);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label>Which days work best for you?</Label>
        <div className="grid sm:grid-cols-3 gap-4">
          {DAYS.map((day) => (
            <div key={day.value} className="flex items-center space-x-2">
              <Checkbox
                id={day.value}
                checked={selectedDays.includes(day.value)}
                onCheckedChange={() => handleDayToggle(day.value)}
              />
              <Label htmlFor={day.value} className="font-normal">
                {day.label}
              </Label>
            </div>
          ))}
        </div>
        {errors?.preferredDays && (
          <p className="text-sm text-destructive">{errors.preferredDays}</p>
        )}
      </div>

      <div className="space-y-4">
        <Label>What times of day work best?</Label>
        <div className="grid sm:grid-cols-3 gap-4">
          {TIMES.map((time) => (
            <div key={time.value} className="flex items-center space-x-2">
              <Checkbox
                id={time.value}
                checked={selectedTimes.includes(time.value)}
                onCheckedChange={() => handleTimeToggle(time.value)}
              />
              <Label htmlFor={time.value} className="font-normal">
                {time.label}
              </Label>
            </div>
          ))}
        </div>
        {errors?.preferredTimes && (
          <p className="text-sm text-destructive">{errors.preferredTimes}</p>
        )}
      </div>
    </div>
  );
}