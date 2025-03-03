import { z } from "zod";

export const checkoutSchema = z.object({
    name: z.string().trim().min(1, { message: "Name won't be empty" }),
    email: z.string().email("Invalid email format").optional().or(z.literal("")),
    area: z.object({
        value: z.string(),
        label: z.string(),
    }),
    streetAddress: z.string().trim().min(1, { message: "Street address won't be empty" }),
    phoneNumber: 
    z.string()
    .trim()
    .length(11, { message: "Phone number must be exactly 11 digits" })
    .regex(/^\d+$/, { message: "Phone number must contain only digits" }),
    orderNotes: z.string().optional().or(z.literal("")),
    deliveryOption: z.enum(['COD', 'At Shop']),
});