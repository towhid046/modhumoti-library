import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const url = new URL(req.url);
  const search = url.searchParams?.get("search")?.trim();
  const db = await connectDB();
  const booksCollection = db.collection("books");

  try {
    let books = [];
    if (search) {
      books = await booksCollection
        .find({
          title: { $regex: search, $options: "i" },
        })
        .toArray();
    }
    return NextResponse.json(books);
  } catch (error) {
    return NextResponse.json({ error });
  }
};
