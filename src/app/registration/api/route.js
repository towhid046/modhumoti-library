import { connectDB } from "@/lib/connectDB";
import { hashPassword } from "@/lib/hashPassword";
import { NextResponse } from "next/server";

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
    const password = await hashPassword(newUser?.password);

    const res = await usersCollection.insertOne({ ...newUser, password });
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json(error);
  }
};
