"use client";

import React, { useEffect, useState } from 'react';
import { useOnboarding } from '@/lib/context/OnboardingContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ConsentSection } from './consent/ConsentSection';
import { SignatureConfirmation } from './consent/SignatureConfirmation';
import { ConsentAgreements, ConsentAgreementsErrors } from '@/lib/types/consent-agreements';
import { consentAgreementsSchema } from '@/lib/validation/consent-agreements';

export function Step6ConsentAgreements() {
  const { state, dispatch } = useOnboarding();
  const [formData, setFormData] = useState<ConsentAgreements>(() => ({
    hipaaConsent: false,
    telehealthConsent: false,
    privacyPolicy: false,
    termsOfService: false,
    signature: '',
    ...state.savedData.consentAgreements,
  }));

  const [errors, setErrors] = useState<ConsentAgreementsErrors>({});

  useEffect(() => {
    dispatch({ type: 'SET_STEP', payload: 6 });
  }, [dispatch]);

  const validateForm = (): boolean => {
    try {
      consentAgreementsSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error: any) {
      const formattedErrors: ConsentAgreementsErrors = {};
      error.errors.forEach((err: any) => {
        formattedErrors[err.path[0] as keyof ConsentAgreementsErrors] = err.message;
      });
      setErrors(formattedErrors);
      return false;
    }
  };

  const handleBack = () => {
    dispatch({
      type: 'SAVE_DATA',
      payload: { consentAgreements: formData },
    });
    dispatch({ type: 'SET_STEP', payload: 5 });
  };

  const handleNext = () => {
    if (validateForm()) {
      dispatch({
        type: 'SAVE_DATA',
        payload: { consentAgreements: formData },
      });
      dispatch({ type: 'SET_STEP', payload: 7 });
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">
          Review and Accept Agreements
        </h2>
        <p className="text-muted-foreground">
          Please review these important documents about your care and privacy.
        </p>
      </div>

      <div className="space-y-6">
        <ConsentSection
          formData={formData}
          onChange={setFormData}
          errors={errors}
        />

        <SignatureConfirmation
          value={formData.signature}
          onChange={(signature) => setFormData({ ...formData, signature })}
          error={errors.signature}
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