"use client";

import React from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { FormField } from '../FormField';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { Treatment } from '@/lib/types/medical-history';
import { Switch } from '@/components/ui/switch';

interface TreatmentsSectionProps {
  hasPreviousTreatments: boolean;
  treatments: Treatment[];
  onHasTreatmentsChange: (value: boolean) => void;
  onTreatmentsChange: (treatments: Treatment[]) => void;
  errors?: { type?: string; provider?: string; startDate?: string }[];
}

export function TreatmentsSection({
  hasPreviousTreatments,
  treatments,
  onHasTreatmentsChange,
  onTreatmentsChange,
  errors = [],
}: TreatmentsSectionProps) {
  const addTreatment = () => {
    onTreatmentsChange([
      ...treatments,
      { type: '', provider: '', startDate: '', endDate: '', ongoing: false },
    ]);
  };

  const removeTreatment = (index: number) => {
    onTreatmentsChange(
      treatments.filter((_, i) => i !== index)
    );
  };

  const updateTreatment = (index: number, field: keyof Treatment, value: string | boolean) => {
    const updated = treatments.map((t, i) =>
      i === index ? { ...t, [field]: value } : t
    );
    onTreatmentsChange(updated);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Have you received any previous mental health treatments?</Label>
        <RadioGroup
          value={hasPreviousTreatments ? 'yes' : 'no'}
          onValueChange={(value) => onHasTreatmentsChange(value === 'yes')}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="yes-treat" />
            <Label htmlFor="yes-treat">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="no-treat" />
            <Label htmlFor="no-treat">No</Label>
          </div>
        </RadioGroup>
      </div>

      {hasPreviousTreatments && (
        <div className="space-y-4">
          {treatments.map((treatment, index) => (
            <div key={index} className="space-y-4 p-4 border rounded-lg">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Treatment {index + 1}</h4>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeTreatment(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid gap-4">
                <FormField
                  label="Type of Treatment"
                  value={treatment.type}
                  onChange={(value) => updateTreatment(index, 'type', value)}
                  error={errors[index]?.type}
                  required
                />
                <FormField
                  label="Provider Name"
                  value={treatment.provider}
                  onChange={(value) => updateTreatment(index, 'provider', value)}
                  error={errors[index]?.provider}
                  required
                />
                <FormField
                  label="Start Date"
                  type="date"
                  value={treatment.startDate}
                  onChange={(value) => updateTreatment(index, 'startDate', value)}
                  error={errors[index]?.startDate}
                  required
                />
                <div className="flex items-center space-x-2">
                  <Switch
                    id={`ongoing-${index}`}
                    checked={treatment.ongoing}
                    onCheckedChange={(checked) => updateTreatment(index, 'ongoing', checked)}
                  />
                  <Label htmlFor={`ongoing-${index}`}>Currently ongoing</Label>
                </div>
                {!treatment.ongoing && (
                  <FormField
                    label="End Date"
                    type="date"
                    value={treatment.endDate}
                    onChange={(value) => updateTreatment(index, 'endDate', value)}
                  />
                )}
              </div>
            </div>
          ))}
          <Button
            variant="outline"
            onClick={addTreatment}
            className="w-full flex items-center gap-2"
          >
            <Plus className="h-4 w-4" /> Add Treatment
          </Button>
        </div>
      )}
    </div>
  );
}