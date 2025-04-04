import { Request, Response } from "express";
import { Book } from "../models/Book.model";
import { bookZodSchema } from "../schemas/Book.schema";

export const getAllBookHandler = async (req: Request, res: Response) => {
    const { limit, skip, category, search} = req.query;
    try {
        // Construct query object dynamically
        const query: any = {};
        if (category) {
            query.category = category;
        }
        if (search) {
            query.title = new RegExp(search as string, 'i');
        }

        const books = await Book.find(query).limit(Number(limit)).skip(Number(skip));
        res.status(200).json(books);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export const getSingleBookHandler = async (req: Request, res: Response) => {
    try {
        if (!req.params.id) {
            throw new Error("ID is required to get a single book")
        }
        const book = await Book.findById(req.params.id)
        if (!book) {
            throw new Error("Book not found.")
        }
        res.status(200).json(book)
    } catch (error: any) {
        res.status(500).json({ error: error.message })
    }
}

export const createBookHandler = async (req: Request, res: Response) => {
    try {
        // validate book
        const validateBook = bookZodSchema.parse(req.body)
        const isBookNameExist = await Book.findOne({ title: new RegExp(req.body.title, 'i') })
        if (isBookNameExist) {
          throw new Error("Book Name is already exist!!")
        }
        const book = new Book(validateBook)
        const response = await book.save()
        res.status(200).json({ message: 'Book created successfully!', response })
    } catch (error: any) {
        res.status(500).json({ error: error.message })
    }
}

export const updateBookHandler = async (req: Request, res: Response) => {
    try {
        if (!req.params.id) {
            throw new Error("ID is required to update a book")
        }
        const validateBook = bookZodSchema.parse(req.body)
        const book = await Book.findByIdAndUpdate(req.params.id, validateBook, { new: true })
        if (!book) {
            throw new Error("Book not found.")
        }
        res.status(200).json({ message: 'Book updated successfully!', book })
    } catch (error: any) {
        res.status(500).json({ error: error.message })
    }
}

export const deleteBookHandler = async (req: Request, res: Response) => {
    try {
        if (!req.params.id) {
            throw new Error("ID is required to delete a book")
        }
        const book = await Book.findByIdAndDelete(req.params.id)
        if (!book) {
            throw new Error("Book not found.")
        }
        res.status(200).json({ message: 'Book deleted successfully!' })
    } catch (error: any) {
        res.status(500).json({ error: error.message })
    }
}

export const getCartItems = async (req: Request, res: Response) => {
  try {
    const {ids} = req.query;
    if (typeof ids !== 'string' || !ids.length) {
      res.status(400).json({ message: "Invalid request. No book IDs provided." });
      return;
    }

    const bookIds = ids.split(',')

    // Fetch books from the database using the provided IDs
    const books = await Book.find({ _id: { $in: bookIds } });
    
    if (books.length === 0) {
      res.status(404).json({ message: "No books found in the cart." });
      return;
    }

     res.status(200).json(books);
     return;
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ message: "Internal server error." });
    return;
  }
};

export const estimateBookCount = async (req: Request, res: Response) => {
  try {
    const count = await Book.estimatedDocumentCount();
    res.status(200).json({ count });
  } catch (error) {
    console.error("Error estimating book count:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
