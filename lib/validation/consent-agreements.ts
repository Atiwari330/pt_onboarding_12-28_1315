import { z } from 'zod';

export const consentAgreementsSchema = z.object({
  hipaaConsent: z.boolean().refine((val) => val, {
    message: 'You must accept the HIPAA Privacy Notice',
  }),
  telehealthConsent: z.boolean().refine((val) => val, {
    message: 'You must consent to telehealth services',
  }),
  privacyPolicy: z.boolean().refine((val) => val, {
    message: 'You must accept the Privacy Policy',
  }),
  termsOfService: z.boolean().refine((val) => val, {
    message: 'You must agree to the Terms of Service',
  }),
  signature: z.string().min(1, 'Please provide your signature'),
});