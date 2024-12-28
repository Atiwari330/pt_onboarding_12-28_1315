"use client";

import { Medication } from '@/lib/types/medication-management';
import { FormField } from '../FormField';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Trash2 } from 'lucide-react';

interface MedicationEntryProps {
  medication: Medication;
  onChange: (updated: Medication) => void;
  onRemove: () => void;
  errors?: {
    name?: string;
    dosage?: string;
    frequency?: string;
  };
}

export function MedicationEntry({
  medication,
  onChange,
  onRemove,
  errors,
}: MedicationEntryProps) {
  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <div className="flex justify-between items-center">
        <h4 className="font-medium">Medication Details</h4>
        <Button
          variant="ghost"
          size="icon"
          onClick={onRemove}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-4">
        <FormField
          label="Medication Name"
          value={medication.name}
          onChange={(value) => onChange({ ...medication, name: value })}
          error={errors?.name}
          required
        />

        <div className="grid sm:grid-cols-2 gap-4">
          <FormField
            label="Dosage"
            value={medication.dosage}
            onChange={(value) => onChange({ ...medication, dosage: value })}
            error={errors?.dosage}
            required
            placeholder="e.g., 10mg"
          />

          <FormField
            label="Frequency"
            value={medication.frequency}
            onChange={(value) => onChange({ ...medication, frequency: value })}
            error={errors?.frequency}
            required
            placeholder="e.g., Once daily"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Side Effects or Concerns</label>
          <Textarea
            value={medication.sideEffects}
            onChange={(e) => onChange({ ...medication, sideEffects: e.target.value })}
            placeholder="Describe any side effects you've experienced..."
          />
        </div>
      </div>
    </div>
  );
}