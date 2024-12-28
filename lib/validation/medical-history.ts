import { z } from 'zod';

const hospitalizationSchema = z.object({
  date: z.string().min(1, 'Date is required'),
  reason: z.string().min(1, 'Reason is required'),
  duration: z.string().min(1, 'Duration is required'),
});

const treatmentSchema = z.object({
  type: z.string().min(1, 'Treatment type is required'),
  provider: z.string().min(1, 'Provider name is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string(),
  ongoing: z.boolean(),
});

export const medicalHistorySchema = z.object({
  currentDiagnoses: z.array(z.string()).min(1, 'Please select at least one diagnosis or "None"'),
  otherDiagnoses: z.string(),
  hasHospitalizations: z.boolean(),
  hospitalizations: z.array(hospitalizationSchema).optional(),
  hasPreviousTreatments: z.boolean(),
  previousTreatments: z.array(treatmentSchema).optional(),
  chronicConditions: z.string(),
  recentSurgeries: z.string(),
});