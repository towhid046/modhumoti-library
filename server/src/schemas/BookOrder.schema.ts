import { z } from "zod";

export const zodBookOrderSchema = z.object({
    name: z.string().trim().min(1, { message: "Name won't be empty" }),
    email: z.string().email("Invalid email format").optional().or(z.literal("")),
    area: z.string().trim().min(1, { message: "Name won't be empty" }),
    streetAddress: z.string().trim().min(1, { message: "Street address won't be empty" }),
    phoneNumber: 
    z.string()
    .trim()
    .length(11, { message: "Phone number must be exactly 11 digits" })
    .regex(/^\d+$/, { message: "Phone number must contain only digits" }),
    orderNotes: z.string().optional().or(z.literal("")),
    deliveryOption: z.enum(['COD', 'At Shop']),
    bookIds: z.array(
        z.object({
          id: z.string(),
          count: z.number().min(1, "Count must be at least 1"),
        })
      ).min(1, "At least one book is required"),
});