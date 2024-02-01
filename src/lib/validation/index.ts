import * as z from 'zod';

export const SignupValidation = z.object({
  name: z.string().min(2, { message: 'Too short' }).max(20),
  username: z.string().min(2, { message: 'Too short' }).max(20),
  email: z.string().email(),
  password: z.string().min(6, { message: 'Password must has at least 6 characters' }).max(30),
});
