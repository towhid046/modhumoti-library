import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import getRandomNumber from "@/lib/getRandomNumber";

export const POST = async (req, res) => {
  try {
    const user = await req.json();
    const db = await connectDB();
    const usersCollection = db.collection("users");
    const isUserExist = await usersCollection.findOne({ email: user.email });
    if (isUserExist) {
      return NextResponse.json({ message: "User already exist" });
    }
    user.password = bcrypt.hashSync(user?.password, 14);
    const result = await usersCollection.insertOne({
      ...user,
      isVerify: false,
      verificationCode: getRandomNumber(),
    });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(error?.message);
  }
};
