import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    const url = new URL(req.url);
    const ids = url.searchParams?.get("ids");
    if(!ids){
        return NextResponse.json({ message: "No IDs provided" });
    }
  const idArray = ids.split(",").map((id) => new ObjectId(id.trim()));
  const db = await connectDB();
  try {
    const booksCollection = db.collection("books");

    const books = await booksCollection.find({ _id: { $in: idArray } }).toArray()
    if (!books) {
      return NextResponse.json({ message: "Book not found" });
    }
    return NextResponse.json(books);
  } catch (error) {
    return NextResponse.json(error);
  }
};
