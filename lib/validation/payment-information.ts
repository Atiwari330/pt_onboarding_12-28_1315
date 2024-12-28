import { z } from 'zod';

export const paymentInformationSchema = z.object({
  cardholderName: z.string().min(1, 'Cardholder name is required'),
  cardNumber: z.string()
    .min(1, 'Card number is required')
    .length(16, 'Card number must be 16 digits')
    .regex(/^\d+$/, 'Card number must contain only digits'),
  expirationDate: z.string()
    .min(1, 'Expiration date is required')
    .regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, 'Invalid expiration date format (MM/YY)'),
  cvv: z.string()
    .min(1, 'CVV is required')
    .regex(/^\d{3,4}$/, 'CVV must be 3 or 4 digits'),
});