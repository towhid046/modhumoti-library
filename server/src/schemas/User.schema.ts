import { z } from 'zod';

export const createUserSchema = z.object({
    body: z.object({
        name: z.string()
            .min(2, 'Name must be at least 2 characters long')
            .max(50, 'Name cannot exceed 50 characters'),
        email: z.string()
            .email('Invalid email address')
            .min(1, 'Email is required'),
        password: z.string()
            .min(6, 'Password must be at least 6 characters long')
            .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .regex(/[0-9]/, 'Password must contain at least one number')
    })
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
