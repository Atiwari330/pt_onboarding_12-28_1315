"use client";

import React, { useEffect, useState } from 'react';
import { useOnboarding } from '@/lib/context/OnboardingContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { MoodStressSection } from './symptoms/MoodStressSection';
import { SleepSection } from './symptoms/SleepSection';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { SymptomsAssessment, SymptomsAssessmentErrors } from '@/lib/types/symptoms-assessment';
import { symptomsAssessmentSchema } from '@/lib/validation/symptoms-assessment';

export function Step3SymptomsAssessment() {
  const { state, dispatch } = useOnboarding();
  const [formData, setFormData] = useState<SymptomsAssessment>(() => ({
    mood: 5,
    stressLevel: 5,
    majorConcerns: '',
    sleepPatterns: {
      hoursPerNight: 7,
      quality: 'fair',
      difficulties: '',
    },
    ...state.savedData.symptomsAssessment,
  }));

  const [errors, setErrors] = useState<SymptomsAssessmentErrors>({});

  useEffect(() => {
    dispatch({ type: 'SET_STEP', payload: 3 });
  }, [dispatch]);

  const validateForm = (): boolean => {
    try {
      symptomsAssessmentSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error: any) {
      const formattedErrors: SymptomsAssessmentErrors = {};
      error.errors.forEach((err: any) => {
        const path = err.path.join('.');
        formattedErrors[path as keyof SymptomsAssessmentErrors] = err.message;
      });
      setErrors(formattedErrors);
      return false;
    }
  };

  const handleBack = () => {
    dispatch({
      type: 'SAVE_DATA',
      payload: { symptomsAssessment: formData },
    });
    dispatch({ type: 'SET_STEP', payload: 2 });
  };

  const handleNext = () => {
    if (validateForm()) {
      dispatch({
        type: 'SAVE_DATA',
        payload: { symptomsAssessment: formData },
      });
      dispatch({ type: 'SET_STEP', payload: 4 });
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">
          How Have You Been Feeling?
        </h2>
        <p className="text-muted-foreground">
          Help us understand your current well-being so we can provide the most appropriate support.
        </p>
      </div>

      <div className="space-y-8">
        <MoodStressSection
          mood={formData.mood}
          stressLevel={formData.stressLevel}
          onMoodChange={(value) => setFormData({ ...formData, mood: value })}
          onStressChange={(value) => setFormData({ ...formData, stressLevel: value })}
          errors={errors}
        />

        <div className="space-y-2">
          <Label>What are your major concerns or sources of stress?</Label>
          <Textarea
            value={formData.majorConcerns}
            onChange={(e) => setFormData({ ...formData, majorConcerns: e.target.value })}
            placeholder="Please describe any concerns, stressors, or challenges you're facing..."
          />
          {errors.majorConcerns && (
            <p className="text-sm text-destructive">{errors.majorConcerns}</p>
          )}
        </div>

        <SleepSection
          hoursPerNight={formData.sleepPatterns.hoursPerNight}
          quality={formData.sleepPatterns.quality}
          difficulties={formData.sleepPatterns.difficulties}
          onHoursChange={(hours) =>
            setFormData({
              ...formData,
              sleepPatterns: { ...formData.sleepPatterns, hoursPerNight: hours },
            })
          }
          onQualityChange={(quality) =>
            setFormData({
              ...formData,
              sleepPatterns: { ...formData.sleepPatterns, quality: quality as any },
            })
          }
          onDifficultiesChange={(difficulties) =>
            setFormData({
              ...formData,
              sleepPatterns: { ...formData.sleepPatterns, difficulties },
            })
          }
          errors={errors.sleepPatterns}
        />
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