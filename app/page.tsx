"use client";

import { Step1PersonalDetails } from '@/components/onboarding/Step1PersonalDetails';
import { Step2MedicalHistory } from '@/components/onboarding/Step2MedicalHistory';
import { Step3SymptomsAssessment } from '@/components/onboarding/Step3SymptomsAssessment';
import { Step4MedicationManagement } from '@/components/onboarding/Step4MedicationManagement';
import { Step5SchedulingPreferences } from '@/components/onboarding/Step5SchedulingPreferences';
import { Step6ConsentAgreements } from '@/components/onboarding/Step6ConsentAgreements';
import { Step7PaymentInformation } from '@/components/onboarding/Step7PaymentInformation';
import { Step8InsuranceBilling } from '@/components/onboarding/Step8InsuranceBilling';
import { OnboardingLayout } from '@/components/layout/OnboardingLayout';
import { useOnboarding } from '@/lib/context/OnboardingContext';

export default function Home() {
  return (
    <OnboardingLayout>
      <StepContent />
    </OnboardingLayout>
  );
}

function StepContent() {
  const { state } = useOnboarding();

  return (
    <>
      {state.currentStep === 1 && <Step1PersonalDetails />}
      {state.currentStep === 2 && <Step2MedicalHistory />}
      {state.currentStep === 3 && <Step3SymptomsAssessment />}
      {state.currentStep === 4 && <Step4MedicationManagement />}
      {state.currentStep === 5 && <Step5SchedulingPreferences />}
      {state.currentStep === 6 && <Step6ConsentAgreements />}
      {state.currentStep === 7 && <Step7PaymentInformation />}
      {state.currentStep === 8 && <Step8InsuranceBilling />}
    </>
  );
}