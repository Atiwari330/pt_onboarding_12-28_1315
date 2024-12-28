import { z } from 'zod';

export const schedulingPreferencesSchema = z.object({
  appointmentType: z.enum(['in-person', 'telehealth'], {
    required_error: 'Please select an appointment type',
  }),
  frequency: z.enum(['weekly', 'biweekly', 'monthly'], {
    required_error: 'Please select an appointment frequency',
  }),
  preferredDays: z.array(
    z.enum(['monday', 'tuesday', 'wednesday', 'thursday', 'friday'])
  ).min(1, 'Please select at least one preferred day'),
  preferredTimes: z.array(
    z.enum(['morning', 'afternoon', 'evening'])
  ).min(1, 'Please select at least one preferred time'),
  additionalNotes: z.string(),
});