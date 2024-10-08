import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/connectDB';  // Assuming you have a connectDB function for database connection

export const GET = async (req: Request) => {
  try {
    const db = await connectDB();

    const url = new URL(req.url);

    const category = url.searchParams.get('category');     

    const booksCollection = db.collection('books');

    let books;
    if (category) {
      books = await booksCollection.find({ category }).toArray();
    } else {
      books = await booksCollection.find().toArray();
    }

    return NextResponse.json(books);
  } catch (error) {
    return NextResponse.json({ message: "Error fetching books", error }, { status: 500 });
  }
};
