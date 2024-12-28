"use client";

import React, { useEffect, useState } from 'react';
import { useOnboarding } from '@/lib/context/OnboardingContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Plus } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { MedicationEntry } from './medication/MedicationEntry';
import { Disclaimer } from './medication/Disclaimer';
import { MedicationManagement, MedicationErrors, Medication } from '@/lib/types/medication-management';
import { medicationManagementSchema } from '@/lib/validation/medication-management';

export function Step4MedicationManagement() {
  const { state, dispatch } = useOnboarding();
  const [formData, setFormData] = useState<MedicationManagement>(() => ({
    takingMedications: false,
    medications: [],
    additionalNotes: '',
    ...state.savedData.medicationManagement,
  }));

  const [errors, setErrors] = useState<MedicationErrors>({});

  useEffect(() => {
    dispatch({ type: 'SET_STEP', payload: 4 });
  }, [dispatch]);

  const validateForm = (): boolean => {
    try {
      medicationManagementSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error: any) {
      const formattedErrors: MedicationErrors = {};
      error.errors.forEach((err: any) => {
        const path = err.path.join('.');
        if (path.startsWith('medications.')) {
          const [_, index, field] = path.split('.');
          if (!formattedErrors.medications) {
            formattedErrors.medications = [];
          }
          if (!formattedErrors.medications[Number(index)]) {
            formattedErrors.medications[Number(index)] = {};
          }
          formattedErrors.medications[Number(index)]![field as keyof Medication] = err.message;
        } else {
          formattedErrors[path as keyof MedicationErrors] = err.message;
        }
      });
      setErrors(formattedErrors);
      return false;
    }
  };

  const handleBack = () => {
    dispatch({
      type: 'SAVE_DATA',
      payload: { medicationManagement: formData },
    });
    dispatch({ type: 'SET_STEP', payload: 3 });
  };

  const handleNext = () => {
    if (validateForm()) {
      dispatch({
        type: 'SAVE_DATA',
        payload: { medicationManagement: formData },
      });
      dispatch({ type: 'SET_STEP', payload: 5 });
    }
  };

  const addMedication = () => {
    setFormData({
      ...formData,
      medications: [
        ...formData.medications,
        { name: '', dosage: '', frequency: '', sideEffects: '' },
      ],
    });
  };

  const updateMedication = (index: number, medication: Medication) => {
    const updatedMedications = [...formData.medications];
    updatedMedications[index] = medication;
    setFormData({ ...formData, medications: updatedMedications });
  };

  const removeMedication = (index: number) => {
    setFormData({
      ...formData,
      medications: formData.medications.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">
          Current Medications
        </h2>
        <p className="text-muted-foreground">
          Let us know about any medications you're taking so we can best support you.
        </p>
      </div>

      <Disclaimer />

      <div className="space-y-8">
        <div className="space-y-4">
          <Label>Are you currently taking any medications?</Label>
          <RadioGroup
            value={formData.takingMedications ? 'yes' : 'no'}
            onValueChange={(value) => {
              const takingMeds = value === 'yes';
              setFormData({
                ...formData,
                takingMedications: takingMeds,
                medications: takingMeds ? formData.medications : [],
              });
            }}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="yes-meds" />
              <Label htmlFor="yes-meds">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="no-meds" />
              <Label htmlFor="no-meds">No</Label>
            </div>
          </RadioGroup>
        </div>

        {formData.takingMedications && (
          <div className="space-y-4">
            {formData.medications.map((medication, index) => (
              <MedicationEntry
                key={index}
                medication={medication}
                onChange={(updated) => updateMedication(index, updated)}
                onRemove={() => removeMedication(index)}
                errors={errors.medications?.[index]}
              />
            ))}
            <Button
              variant="outline"
              onClick={addMedication}
              className="w-full flex items-center gap-2"
            >
              <Plus className="h-4 w-4" /> Add Medication
            </Button>
          </div>
        )}

        <div className="space-y-2">
          <Label>Additional Notes</Label>
          <Textarea
            value={formData.additionalNotes}
            onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
            placeholder="Any additional information about your medications..."
          />
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button
          variant="ghost"
          onClick={handleBack}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        <Button onClick={handleNext} className="flex items-center gap-2">
          Next <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}