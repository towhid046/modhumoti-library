import { Schema, model, Types } from "mongoose";

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, require:true, enum: ["member", "admin"] },
});

export const User = model("User", userSchema);
