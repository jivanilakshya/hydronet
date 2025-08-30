import { z } from 'zod';

export const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const recommendationSchema = z.object({
  renewableWeight: z.number().min(0).max(1),
  demandWeight: z.number().min(0).max(1),
  regulatoryWeight: z.number().min(0).max(1),
  costWeight: z.number().min(0).max(1),
  maxDistance: z.number().min(0),
  minCapacity: z.number().min(0),
});

export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type RecommendationInput = z.infer<typeof recommendationSchema>;
