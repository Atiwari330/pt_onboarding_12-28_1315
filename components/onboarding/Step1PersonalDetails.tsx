"use client";

import React, { useEffect, useState } from 'react';
import { useOnboarding } from '@/lib/context/OnboardingContext';
import { Button } from '@/components/ui/button';
import { FormField } from './FormField';
import { PersonalDetails, PersonalDetailsErrors } from '@/lib/types/personal-details';
import { personalDetailsSchema } from '@/lib/validation/personal-details';
import { ArrowRight } from 'lucide-react';

export function Step1PersonalDetails() {
  const { state, dispatch } = useOnboarding();
  const [formData, setFormData] = useState<PersonalDetails>(() => ({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    phone: '',
    emergencyContact: {
      name: '',
      phone: '',
    },
    ...state.savedData.personalDetails,
  }));

  const [errors, setErrors] = useState<PersonalDetailsErrors>({});

  useEffect(() => {
    dispatch({ type: 'SET_STEP', payload: 1 });
  }, [dispatch]);

  const validateForm = (): boolean => {
    try {
      personalDetailsSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error: any) {
      const formattedErrors: PersonalDetailsErrors = {};
      error.errors.forEach((err: any) => {
        const path = err.path.join('.');
        formattedErrors[path as keyof PersonalDetailsErrors] = err.message;
      });
      setErrors(formattedErrors);
      return false;
    }
  };

  const handleNext = () => {
    if (validateForm()) {
      dispatch({
        type: 'SAVE_DATA',
        payload: { personalDetails: formData },
      });
      dispatch({ type: 'SET_STEP', payload: 2 });
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">
          Let's get started with your personal details
        </h2>
        <p className="text-muted-foreground">
          This information helps us provide personalized care and ensure we can reach you when needed.
        </p>
      </div>

      <div className="grid gap-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <FormField
            label="First Name"
            value={formData.firstName}
            onChange={(value) => setFormData({ ...formData, firstName: value })}
            error={errors.firstName}
            required
          />
          <FormField
            label="Last Name"
            value={formData.lastName}
            onChange={(value) => setFormData({ ...formData, lastName: value })}
            error={errors.lastName}
            required
          />
        </div>

        <FormField
          label="Date of Birth"
          type="date"
          value={formData.dateOfBirth}
          onChange={(value) => setFormData({ ...formData, dateOfBirth: value })}
          error={errors.dateOfBirth}
          required
        />

        <FormField
          label="Email"
          type="email"
          value={formData.email}
          onChange={(value) => setFormData({ ...formData, email: value })}
          error={errors.email}
          required
        />

        <FormField
          label="Phone Number"
          type="tel"
          value={formData.phone}
          onChange={(value) => setFormData({ ...formData, phone: value })}
          error={errors.phone}
          required
        />

        <div className="space-y-4">
          <h3 className="font-medium">Emergency Contact</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <FormField
              label="Name"
              value={formData.emergencyContact.name}
              onChange={(value) =>
                setFormData({
                  ...formData,
                  emergencyContact: { ...formData.emergencyContact, name: value },
                })
              }
              error={errors.emergencyContact?.name}
              required
            />
            <FormField
              label="Phone Number"
              type="tel"
              value={formData.emergencyContact.phone}
              onChange={(value) =>
                setFormData({
                  ...formData,
                  emergencyContact: { ...formData.emergencyContact, phone: value },
                })
              }
              error={errors.emergencyContact?.phone}
              required
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button
          onClick={handleNext}
          className="flex items-center gap-2"
        >
          Next <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}