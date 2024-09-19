import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (request) => {
  const newUser = await request.json();
  try {
    const db = await connectDB();
    const usersCollection = db.collection("users");
    const isUserExist = await usersCollection.findOne({
      email: newUser?.email,
    });
    if (isUserExist)
      return NextResponse.json({ message: "User already exist" });
    const password = bcrypt.hashSync(newUser?.password, 14);
    const res = await usersCollection.insertOne({ ...newUser, password });
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json(error);
  }
};
