"use client";

import React, { useEffect, useState } from 'react';
import { useOnboarding } from '@/lib/context/OnboardingContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { AppointmentTypeSection } from './scheduling/AppointmentTypeSection';
import { FrequencySection } from './scheduling/FrequencySection';
import { TimePreferencesSection } from './scheduling/TimePreferencesSection';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { SchedulingPreferences, SchedulingPreferencesErrors } from '@/lib/types/scheduling-preferences';
import { schedulingPreferencesSchema } from '@/lib/validation/scheduling-preferences';

export function Step5SchedulingPreferences() {
  const { state, dispatch } = useOnboarding();
  const [formData, setFormData] = useState<SchedulingPreferences>(() => ({
    appointmentType: 'telehealth',
    frequency: 'weekly',
    preferredDays: [],
    preferredTimes: [],
    additionalNotes: '',
    ...state.savedData.schedulingPreferences,
  }));

  const [errors, setErrors] = useState<SchedulingPreferencesErrors>({});

  useEffect(() => {
    dispatch({ type: 'SET_STEP', payload: 5 });
  }, [dispatch]);

  const validateForm = (): boolean => {
    try {
      schedulingPreferencesSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error: any) {
      const formattedErrors: SchedulingPreferencesErrors = {};
      error.errors.forEach((err: any) => {
        const path = err.path.join('.');
        formattedErrors[path as keyof SchedulingPreferencesErrors] = err.message;
      });
      setErrors(formattedErrors);
      return false;
    }
  };

  const handleBack = () => {
    dispatch({
      type: 'SAVE_DATA',
      payload: { schedulingPreferences: formData },
    });
    dispatch({ type: 'SET_STEP', payload: 4 });
  };

  const handleNext = () => {
    if (validateForm()) {
      dispatch({
        type: 'SAVE_DATA',
        payload: { schedulingPreferences: formData },
      });
      dispatch({ type: 'SET_STEP', payload: 6 });
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">
          Scheduling Preferences
        </h2>
        <p className="text-muted-foreground">
          Help us understand when you're typically available for appointments.
        </p>
      </div>

      <div className="space-y-8">
        <AppointmentTypeSection
          value={formData.appointmentType}
          onChange={(value) => setFormData({ ...formData, appointmentType: value })}
          error={errors.appointmentType}
        />

        <FrequencySection
          value={formData.frequency}
          onChange={(value) => setFormData({ ...formData, frequency: value })}
          error={errors.frequency}
        />

        <TimePreferencesSection
          selectedDays={formData.preferredDays}
          selectedTimes={formData.preferredTimes}
          onDaysChange={(days) => setFormData({ ...formData, preferredDays: days })}
          onTimesChange={(times) => setFormData({ ...formData, preferredTimes: times })}
          errors={errors}
        />

        <div className="space-y-2">
          <Label>Additional Scheduling Notes</Label>
          <Textarea
            value={formData.additionalNotes}
            onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
            placeholder="Any other scheduling preferences or constraints..."
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