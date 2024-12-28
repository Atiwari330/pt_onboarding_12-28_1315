"use client";

import React, { useEffect, useState } from 'react';
import { useOnboarding } from '@/lib/context/OnboardingContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { FormField } from './FormField';
import { PaymentInformation, PaymentInformationErrors } from '@/lib/types/payment-information';
import { paymentInformationSchema } from '@/lib/validation/payment-information';
import { PaymentDisclaimer } from './payment/PaymentDisclaimer';

export function Step7PaymentInformation() {
  const { state, dispatch } = useOnboarding();
  const [formData, setFormData] = useState<PaymentInformation>(() => ({
    cardholderName: '',
    cardNumber: '',
    expirationDate: '',
    cvv: '',
    ...state.savedData.paymentInformation,
  }));

  const [errors, setErrors] = useState<PaymentInformationErrors>({});

  useEffect(() => {
    dispatch({ type: 'SET_STEP', payload: 7 });
  }, [dispatch]);

  const validateForm = (): boolean => {
    try {
      paymentInformationSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error: any) {
      const formattedErrors: PaymentInformationErrors = {};
      error.errors.forEach((err: any) => {
        formattedErrors[err.path[0] as keyof PaymentInformationErrors] = err.message;
      });
      setErrors(formattedErrors);
      return false;
    }
  };

  const handleBack = () => {
    dispatch({
      type: 'SAVE_DATA',
      payload: { paymentInformation: formData },
    });
    dispatch({ type: 'SET_STEP', payload: 6 });
  };

  const handleNext = () => {
    if (validateForm()) {
      // TODO: In production, integrate with a secure payment gateway
      // and only store tokenized card information
      const securePaymentInfo = {
        cardholderName: formData.cardholderName,
        last4: formData.cardNumber.slice(-4),
        expirationDate: formData.expirationDate,
      };

      dispatch({
        type: 'SAVE_DATA',
        payload: { paymentInformation: securePaymentInfo },
      });
      dispatch({ type: 'SET_STEP', payload: 8 });
    }
  };

  const formatExpirationDate = (value: string) => {
    // Remove any non-digit characters
    const cleaned = value.replace(/\D/g, '');
    
    // Format as MM/YY
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
    }
    
    return cleaned;
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">
          Payment Information
        </h2>
        <p className="text-muted-foreground">
          Please enter a payment method so we can keep your card on file for co-pays or session fees.
        </p>
      </div>

      <PaymentDisclaimer />

      <div className="space-y-6">
        <FormField
          label="Cardholder Name"
          value={formData.cardholderName}
          onChange={(value) => setFormData({ ...formData, cardholderName: value })}
          error={errors.cardholderName}
          required
        />

        <FormField
          label="Card Number"
          value={formData.cardNumber}
          onChange={(value) => setFormData({ ...formData, cardNumber: value.replace(/\D/g, '') })}
          error={errors.cardNumber}
          required
          maxLength={16}
        />

        <div className="grid sm:grid-cols-2 gap-4">
          <FormField
            label="Expiration Date"
            value={formData.expirationDate}
            onChange={(value) => setFormData({ ...formData, expirationDate: formatExpirationDate(value) })}
            error={errors.expirationDate}
            required
            placeholder="MM/YY"
            maxLength={5}
          />

          <FormField
            label="CVV"
            value={formData.cvv}
            onChange={(value) => setFormData({ ...formData, cvv: value.replace(/\D/g, '') })}
            error={errors.cvv}
            required
            maxLength={4}
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