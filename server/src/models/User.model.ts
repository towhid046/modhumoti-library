import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, },
    role: { type: String, required: true,enum:['member', 'admin'] },
});

export const User = model("User", userSchema);
