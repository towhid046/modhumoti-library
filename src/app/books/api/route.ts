import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
export const GET = async () => {
  const db = await connectDB();
  try {
    const booksCollection = db.collection("books");
    const books = await booksCollection.find().toArray();
    return NextResponse.json(books);
  } catch (error) {
    return NextResponse.json(error);
  }
};
