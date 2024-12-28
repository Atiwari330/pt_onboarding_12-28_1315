"use client";

import React, { useEffect, useState } from 'react';
import { useOnboarding } from '@/lib/context/OnboardingContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { DiagnosesSection } from './medical/DiagnosesSection';
import { HospitalizationsSection } from './medical/HospitalizationsSection';
import { TreatmentsSection } from './medical/TreatmentsSection';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MedicalHistory, MedicalHistoryErrors } from '@/lib/types/medical-history';
import { medicalHistorySchema } from '@/lib/validation/medical-history';

export function Step2MedicalHistory() {
  const { state, dispatch } = useOnboarding();
  const [formData, setFormData] = useState<MedicalHistory>(() => ({
    currentDiagnoses: [],
    otherDiagnoses: '',
    hasHospitalizations: false,
    hospitalizations: [],
    hasPreviousTreatments: false,
    previousTreatments: [],
    chronicConditions: '',
    recentSurgeries: '',
    ...state.savedData.medicalHistory,
  }));

  const [errors, setErrors] = useState<MedicalHistoryErrors>({});

  useEffect(() => {
    dispatch({ type: 'SET_STEP', payload: 2 });
  }, [dispatch]);

  const validateForm = (): boolean => {
    try {
      medicalHistorySchema.parse(formData);
      setErrors({});
      return true;
    } catch (error: any) {
      const formattedErrors: MedicalHistoryErrors = {};
      error.errors.forEach((err: any) => {
        const path = err.path.join('.');
        if (path.startsWith('hospitalizations.') || path.startsWith('previousTreatments.')) {
          const [section, index, field] = path.split('.');
          if (!formattedErrors[section]) {
            formattedErrors[section] = [];
          }
          if (!formattedErrors[section]![index]) {
            formattedErrors[section]![index] = {};
          }
          formattedErrors[section]![index]![field] = err.message;
        } else {
          formattedErrors[path as keyof MedicalHistoryErrors] = err.message;
        }
      });
      setErrors(formattedErrors);
      return false;
    }
  };

  const handleBack = () => {
    dispatch({
      type: 'SAVE_DATA',
      payload: { medicalHistory: formData },
    });
    dispatch({ type: 'SET_STEP', payload: 1 });
  };

  const handleNext = () => {
    if (validateForm()) {
      dispatch({
        type: 'SAVE_DATA',
        payload: { medicalHistory: formData },
      });
      dispatch({ type: 'SET_STEP', payload: 3 });
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">
          Your Medical History
        </h2>
        <p className="text-muted-foreground">
          Help us understand your health background so we can provide the best possible care.
          All information is kept strictly confidential.
        </p>
      </div>

      <div className="space-y-8">
        <DiagnosesSection
          selectedDiagnoses={formData.currentDiagnoses}
          otherDiagnoses={formData.otherDiagnoses}
          onDiagnosesChange={(diagnoses) =>
            setFormData({ ...formData, currentDiagnoses: diagnoses })
          }
          onOtherDiagnosesChange={(value) =>
            setFormData({ ...formData, otherDiagnoses: value })
          }
          error={errors.currentDiagnoses}
        />

        <HospitalizationsSection
          hasHospitalizations={formData.hasHospitalizations}
          hospitalizations={formData.hospitalizations}
          onHasHospitalizationsChange={(value) =>
            setFormData({
              ...formData,
              hasHospitalizations: value,
              hospitalizations: value ? formData.hospitalizations : [],
            })
          }
          onHospitalizationsChange={(hospitalizations) =>
            setFormData({ ...formData, hospitalizations })
          }
          errors={errors.hospitalizations}
        />

        <TreatmentsSection
          hasPreviousTreatments={formData.hasPreviousTreatments}
          treatments={formData.previousTreatments}
          onHasTreatmentsChange={(value) =>
            setFormData({
              ...formData,
              hasPreviousTreatments: value,
              previousTreatments: value ? formData.previousTreatments : [],
            })
          }
          onTreatmentsChange={(treatments) =>
            setFormData({ ...formData, previousTreatments: treatments })
          }
          errors={errors.previousTreatments}
        />

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Do you have any chronic medical conditions?</Label>
            <Textarea
              value={formData.chronicConditions}
              onChange={(e) =>
                setFormData({ ...formData, chronicConditions: e.target.value })
              }
              placeholder="Please list any chronic conditions..."
            />
          </div>

          <div className="space-y-2">
            <Label>Have you had any recent surgeries?</Label>
            <Textarea
              value={formData.recentSurgeries}
              onChange={(e) =>
                setFormData({ ...formData, recentSurgeries: e.target.value })
              }
              placeholder="Please describe any recent surgeries..."
            />
          </div>
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