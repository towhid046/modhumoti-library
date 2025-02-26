// Zod Schema
import { z } from "zod";

export const checkoutSchema = z.object({
    name: z.string().trim().min(1, { message: "Name won't be empty" }),
    email: z.string().email({ message: "Invalid email address" }).optional().or(z.literal("")),
    district: z.object({
        value: z.string(),
        label: z.string(),
    }),
    thana: z.object({
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
    cashOnDelivery: z.boolean().default(true),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;