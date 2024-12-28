import { z } from 'zod';

const medicationSchema = z.object({
  name: z.string().min(1, 'Medication name is required'),
  dosage: z.string().min(1, 'Dosage is required'),
  frequency: z.string().min(1, 'Frequency is required'),
  sideEffects: z.string(),
});

export const medicationManagementSchema = z.object({
  takingMedications: z.boolean(),
  medications: z.array(medicationSchema).optional(),
  additionalNotes: z.string(),
});