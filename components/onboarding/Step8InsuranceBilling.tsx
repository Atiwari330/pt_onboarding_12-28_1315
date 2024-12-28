"use client";

import React, { useEffect, useState } from 'react';
import { useOnboarding } from '@/lib/context/OnboardingContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check } from 'lucide-react';
import { InsuranceBilling, InsuranceBillingErrors, InsurancePolicy } from '@/lib/types/insurance-billing';
import { insuranceBillingSchema } from '@/lib/validation/insurance-billing';
import { InsurancePolicyForm } from './insurance/InsurancePolicyForm';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const defaultPolicy: InsurancePolicy = {
  carrier: '',
  policyNumber: '',
  groupNumber: '',
  policyHolder: {
    name: '',
    dateOfBirth: '',
    relationship: 'self',
  },
};

export function Step8InsuranceBilling() {
  const { state, dispatch } = useOnboarding();
  const [formData, setFormData] = useState<InsuranceBilling>(() => ({
    hasInsurance: true,
    primaryInsurance: defaultPolicy,
    hasSecondaryInsurance: false,
    secondaryInsurance: defaultPolicy,
    ...state.savedData.insuranceBilling,
  }));

  const [errors, setErrors] = useState<InsuranceBillingErrors>({});

  useEffect(() => {
    dispatch({ type: 'SET_STEP', payload: 8 });
  }, [dispatch]);

  const validateForm = (): boolean => {
    try {
      insuranceBillingSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error: any) {
      const formattedErrors: InsuranceBillingErrors = {};
      error.errors.forEach((err: any) => {
        const path = err.path.join('.');
        // Handle nested errors
        let current = formattedErrors;
        const parts = path.split('.');
        parts.forEach((part, index) => {
          if (index === parts.length - 1) {
            (current as any)[part] = err.message;
          } else {
            (current as any)[part] = (current as any)[part] || {};
            current = (current as any)[part];
          }
        });
      });
      setErrors(formattedErrors);
      return false;
    }
  };

  const handleBack = () => {
    dispatch({
      type: 'SAVE_DATA',
      payload: { insuranceBilling: formData },
    });
    dispatch({ type: 'SET_STEP', payload: 7 });
  };

  const handleFinish = () => {
    if (validateForm()) {
      dispatch({
        type: 'SAVE_DATA',
        payload: { insuranceBilling: formData },
      });
      console.log('Onboarding completed!', state.savedData);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">
          Insurance & Billing Information
        </h2>
        <p className="text-muted-foreground">
          Please provide your insurance details. If you have multiple policies, add your secondary coverage.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <Label>Do you have health insurance?</Label>
          <RadioGroup
            value={formData.hasInsurance ? 'yes' : 'no'}
            onValueChange={(value) => {
              setFormData({
                ...formData,
                hasInsurance: value === 'yes',
                hasSecondaryInsurance: value === 'no' ? false : formData.hasSecondaryInsurance,
              });
            }}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="yes-insurance" />
              <Label htmlFor="yes-insurance">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="no-insurance" />
              <Label htmlFor="no-insurance">No</Label>
            </div>
          </RadioGroup>
        </div>

        {formData.hasInsurance && (
          <div className="space-y-8">
            <InsurancePolicyForm
              title="Primary Insurance"
              policy={formData.primaryInsurance}
              onChange={(policy) => setFormData({ ...formData, primaryInsurance: policy })}
              errors={errors.primaryInsurance}
            />

            <div className="space-y-4">
              <Label>Do you have secondary insurance?</Label>
              <RadioGroup
                value={formData.hasSecondaryInsurance ? 'yes' : 'no'}
                onValueChange={(value) =>
                  setFormData({ ...formData, hasSecondaryInsurance: value === 'yes' })
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="yes-secondary" />
                  <Label htmlFor="yes-secondary">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="no-secondary" />
                  <Label htmlFor="no-secondary">No</Label>
                </div>
              </RadioGroup>
            </div>

            {formData.hasSecondaryInsurance && (
              <InsurancePolicyForm
                title="Secondary Insurance"
                policy={formData.secondaryInsurance || defaultPolicy}
                onChange={(policy) => setFormData({ ...formData, secondaryInsurance: policy })}
                errors={errors.secondaryInsurance}
              />
            )}
          </div>
        )}
      </div>

      <div className="flex justify-between pt-4">
        <Button
          variant="ghost"
          onClick={handleBack}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        <Button onClick={handleFinish} className="flex items-center gap-2">
          Complete Registration <Check className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}