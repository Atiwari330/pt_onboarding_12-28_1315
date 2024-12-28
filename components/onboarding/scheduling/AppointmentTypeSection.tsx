"use client";

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { AppointmentType } from '@/lib/types/scheduling-preferences';

interface AppointmentTypeSectionProps {
  value: AppointmentType;
  onChange: (value: AppointmentType) => void;
  error?: string;
}

export function AppointmentTypeSection({
  value,
  onChange,
  error,
}: AppointmentTypeSectionProps) {
  return (
    <div className="space-y-4">
      <Label>Preferred Appointment Type</Label>
      <RadioGroup
        value={value}
        onValueChange={(value) => onChange(value as AppointmentType)}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex items-center space-x-2 rounded-lg border p-4">
            <RadioGroupItem value="in-person" id="in-person" />
            <Label htmlFor="in-person" className="flex-1">
              <div className="font-medium">In-Person</div>
              <div className="text-sm text-muted-foreground">
                Visit our office for face-to-face sessions
              </div>
            </Label>
          </div>
          <div className="flex items-center space-x-2 rounded-lg border p-4">
            <RadioGroupItem value="telehealth" id="telehealth" />
            <Label htmlFor="telehealth" className="flex-1">
              <div className="font-medium">Telehealth</div>
              <div className="text-sm text-muted-foreground">
                Connect remotely via secure video call
              </div>
            </Label>
          </div>
        </div>
      </RadioGroup>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}