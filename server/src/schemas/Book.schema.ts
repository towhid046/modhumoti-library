import { z } from "zod";

export const bookZodSchema = z.object({
    image: z.string().url("Invalid image URL"),
    title: z.string().min(1, "Title is required"),
    author: z.string().min(1, "Author is required"),
    leftCount: z.number().min(0, "Count must be at least 0"),
    price: z.number().min(0, "Price must be at least 0"),
    publisher: z.string().min(1, "Publisher is required"),
    year: z.number().min(1000, "Invalid year").max(new Date().getFullYear(), "Year cannot be in the future"),
    isbn: z.string().min(10, "ISBN must be at least 10 characters"),
    category: z.string().min(1, "Category is required"),
});
