import { z } from 'zod';

const policyHolderSchema = z.object({
  name: z.string().min(1, 'Policy holder name is required'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  relationship: z.enum(['self', 'spouse', 'child', 'other'], {
    required_error: 'Please select a relationship',
  }),
});

const insurancePolicySchema = z.object({
  carrier: z.string().min(1, 'Insurance carrier is required'),
  policyNumber: z.string().min(1, 'Policy number is required'),
  groupNumber: z.string().min(1, 'Group number is required'),
  policyHolder: policyHolderSchema,
});

export const insuranceBillingSchema = z.object({
  hasInsurance: z.boolean(),
  primaryInsurance: z.object({}).optional().or(insurancePolicySchema),
  hasSecondaryInsurance: z.boolean(),
  secondaryInsurance: z.object({}).optional().or(insurancePolicySchema),
}).refine(
  (data) => {
    if (data.hasInsurance) {
      return !!data.primaryInsurance;
    }
    return true;
  },
  {
    message: 'Primary insurance information is required',
    path: ['primaryInsurance'],
  }
).refine(
  (data) => {
    if (data.hasSecondaryInsurance) {
      return !!data.secondaryInsurance;
    }
    return true;
  },
  {
    message: 'Secondary insurance information is required',
    path: ['secondaryInsurance'],
  }
);