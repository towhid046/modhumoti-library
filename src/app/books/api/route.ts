// import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/connectDB";
// export const GET = async () => {
//   const db = await connectDB();
//   try {
//     const booksCollection = db.collection("books");
//     const books = await booksCollection.find().toArray();
//     return NextResponse.json(books);
//   } catch (error) {
//     return NextResponse.json(error);
//   }
// };


import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/connectDB';  // Assuming you have a connectDB function for database connection

export const GET = async (req: Request) => {
  try {
    // Establish database connection
    const db = await connectDB();

    // Parse the URL to extract the query parameter 'category'
    const url = new URL(req.url);
    const category = url.searchParams.get('category');  // Get the category from query params

    // Reference the 'books' collection
    const booksCollection = db.collection('books');

    let books;
    if (category) {
      // Find books by category
      books = await booksCollection.find({ category }).toArray();
    } else {
      // Fetch all books if no category is provided
      books = await booksCollection.find().toArray();
    }

    // Return the books as JSON
    return NextResponse.json(books);
  } catch (error) {
    // Handle errors gracefully
    return NextResponse.json({ message: "Error fetching books", error }, { status: 500 });
  }
};
