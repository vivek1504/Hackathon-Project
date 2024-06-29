import {z} from 'zod';

export const signupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    firstName: z.optional(z.string()),
    lastName: z.optional(z.string()),
    role: z.enum(["USER", "ADMIN"]),
    });

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    
});