import { Schema, model } from "mongoose";

const bookSchema = new Schema({
    image: { type: String, required: true },
    title: { type: String, required: true, unique: true },
    author: { type: String, required: true },
    leftCount: { type: Number, required: true },
    price: { type: Number, required: true },
    publisher: { type: String, required: true },
    year: { type: Number, required: true },
    isbn: { type: String, required: true },
    category: { type: String, enum: ['Academic', 'Non-Fiction', 'Fiction'], required: true },
});

export const Book = model("Book", bookSchema);
