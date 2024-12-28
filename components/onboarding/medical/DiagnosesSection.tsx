"use client";

import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const DIAGNOSES_OPTIONS = [
  'None',
  'Depression',
  'Anxiety',
  'Bipolar Disorder',
  'PTSD',
  'ADHD',
  'Other',
];

interface DiagnosesSectionProps {
  selectedDiagnoses: string[];
  otherDiagnoses: string;
  onDiagnosesChange: (diagnoses: string[]) => void;
  onOtherDiagnosesChange: (value: string) => void;
  error?: string;
}

export function DiagnosesSection({
  selectedDiagnoses,
  otherDiagnoses,
  onDiagnosesChange,
  onOtherDiagnosesChange,
  error,
}: DiagnosesSectionProps) {
  const handleCheckboxChange = (diagnosis: string) => {
    if (diagnosis === 'None') {
      onDiagnosesChange(['None']);
      return;
    }

    const newDiagnoses = selectedDiagnoses.includes(diagnosis)
      ? selectedDiagnoses.filter((d) => d !== diagnosis)
      : [...selectedDiagnoses.filter((d) => d !== 'None'), diagnosis];

    onDiagnosesChange(newDiagnoses);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Current Diagnoses</Label>
        <div className="grid sm:grid-cols-2 gap-4">
          {DIAGNOSES_OPTIONS.map((diagnosis) => (
            <div key={diagnosis} className="flex items-center space-x-2">
              <Checkbox
                id={diagnosis}
                checked={selectedDiagnoses.includes(diagnosis)}
                onCheckedChange={() => handleCheckboxChange(diagnosis)}
              />
              <Label htmlFor={diagnosis} className="font-normal">
                {diagnosis}
              </Label>
            </div>
          ))}
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>

      {selectedDiagnoses.includes('Other') && (
        <div className="space-y-2">
          <Label>Please specify other diagnoses</Label>
          <Textarea
            value={otherDiagnoses}
            onChange={(e) => onOtherDiagnosesChange(e.target.value)}
            placeholder="Please describe any other diagnoses..."
          />
        </div>
      )}
    </div>
  );
}