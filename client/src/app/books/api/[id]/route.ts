import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const db = await connectDB();
  try {
    const booksCollection = db.collection("books");
    const book = await booksCollection.findOne({
      _id: new ObjectId(params.id),
    });
    if (!book) {
      return NextResponse.json({ message: "Book not found" });
    }
    return NextResponse.json(book);
  } catch (error) {
    return NextResponse.json(error);
  }
};
