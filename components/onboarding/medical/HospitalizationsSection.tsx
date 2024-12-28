"use client";

import React from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { FormField } from '../FormField';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { Hospitalization } from '@/lib/types/medical-history';

interface HospitalizationsSectionProps {
  hasHospitalizations: boolean;
  hospitalizations: Hospitalization[];
  onHasHospitalizationsChange: (value: boolean) => void;
  onHospitalizationsChange: (hospitalizations: Hospitalization[]) => void;
  errors?: { date?: string; reason?: string; duration?: string }[];
}

export function HospitalizationsSection({
  hasHospitalizations,
  hospitalizations,
  onHasHospitalizationsChange,
  onHospitalizationsChange,
  errors = [],
}: HospitalizationsSectionProps) {
  const addHospitalization = () => {
    onHospitalizationsChange([
      ...hospitalizations,
      { date: '', reason: '', duration: '' },
    ]);
  };

  const removeHospitalization = (index: number) => {
    onHospitalizationsChange(
      hospitalizations.filter((_, i) => i !== index)
    );
  };

  const updateHospitalization = (index: number, field: keyof Hospitalization, value: string) => {
    const updated = hospitalizations.map((h, i) =>
      i === index ? { ...h, [field]: value } : h
    );
    onHospitalizationsChange(updated);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Have you had any previous psychiatric hospitalizations?</Label>
        <RadioGroup
          value={hasHospitalizations ? 'yes' : 'no'}
          onValueChange={(value) => onHasHospitalizationsChange(value === 'yes')}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="yes-hosp" />
            <Label htmlFor="yes-hosp">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="no-hosp" />
            <Label htmlFor="no-hosp">No</Label>
          </div>
        </RadioGroup>
      </div>

      {hasHospitalizations && (
        <div className="space-y-4">
          {hospitalizations.map((hospitalization, index) => (
            <div key={index} className="space-y-4 p-4 border rounded-lg">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Hospitalization {index + 1}</h4>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeHospitalization(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid gap-4">
                <FormField
                  label="Date"
                  type="date"
                  value={hospitalization.date}
                  onChange={(value) => updateHospitalization(index, 'date', value)}
                  error={errors[index]?.date}
                  required
                />
                <FormField
                  label="Reason"
                  value={hospitalization.reason}
                  onChange={(value) => updateHospitalization(index, 'reason', value)}
                  error={errors[index]?.reason}
                  required
                />
                <FormField
                  label="Duration"
                  value={hospitalization.duration}
                  onChange={(value) => updateHospitalization(index, 'duration', value)}
                  error={errors[index]?.duration}
                  required
                />
              </div>
            </div>
          ))}
          <Button
            variant="outline"
            onClick={addHospitalization}
            className="w-full flex items-center gap-2"
          >
            <Plus className="h-4 w-4" /> Add Hospitalization
          </Button>
        </div>
      )}
    </div>
  );
}