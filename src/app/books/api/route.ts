import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB"; // Assuming you have a connectDB function for database connection

export const GET = async (req: Request) => {
  try {
    const db = await connectDB();

    const url = new URL(req.url);

    const category = url.searchParams.get("category");

    const booksCollection = db.collection("books");
    const query: any = {};
    if (category) query.category = category;
    const books = await booksCollection.find(query).toArray();
    return NextResponse.json(books);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching books", error },
      { status: 500 }
    );
  }
};
