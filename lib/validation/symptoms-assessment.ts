import { z } from 'zod';

export const symptomsAssessmentSchema = z.object({
  mood: z.number().min(1).max(10),
  stressLevel: z.number().min(1).max(10),
  majorConcerns: z.string().min(1, 'Please describe your major concerns'),
  sleepPatterns: z.object({
    hoursPerNight: z.number().min(0).max(24),
    quality: z.enum(['poor', 'fair', 'good', 'excellent']),
    difficulties: z.string(),
  }),
});