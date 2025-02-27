import { Schema, model } from "mongoose";

const bookOrderSchema = new Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true },
    area: { type: String, required: true, trim: true },
    streetAddress: { type: String, required: true, trim: true },
    phoneNumber: { type: String, required: true, trim: true, match: /^\d{11}$/ },
    orderNotes: { type: String, trim: true },
    deliveryOption: { type: String, enum: ["COD", "At Shop"], required: true },
    bookIds: [
        {
            id: { type: Schema.Types.ObjectId, ref: "Book", required: true },
            count: { type: Number, required: true, min: 1 },
        },
    ],
    totalPrice: {type: Number,require:true}
}, { timestamps: true });

export const BookOrder = model("BookOrder", bookOrderSchema);