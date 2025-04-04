import { Request, Response } from "express";
import { SheetOrder } from "../models/SheetOrder.model";
import cloudinary from "../config/cloudinary";
import { sheetOrderZodSchema } from "../schemas/SheetOrder.schema";

interface QueryProp {
  limit?: number;
  skip?: number;
}

export const createSheetOrder = async (req: Request, res: Response) => {

  try {
    const sheets = req?.body?.lectureSheets;
    if(sheets){
      req.body = {...req.body, lectureSheets:JSON.parse(sheets)}
    }

    // Validate request body using Zod first
    const validationResult = sheetOrderZodSchema.safeParse(req.body);
    if (!validationResult.success) {
      res.status(400).json({ error: validationResult.error.errors });
      return;
    }

    const { name, phone, department, year, semester, lectureSheets } = validationResult.data;

    // Retrieve the files uploaded via Multer
    const pdfFiles = req.files as Express.Multer.File[];  // Assuming multiple files
    const uploadedFiles: string[] = [];

    // If files are provided, upload them to Cloudinary
    if (pdfFiles && pdfFiles.length > 0) {
      for (const file of pdfFiles) {
        // File type validation (Optional, depending on your needs)
        if (!file.mimetype.startsWith("application/pdf")) {
          res.status(400).json({ error: "Only PDF files are allowed." });
          return;
        }

        try {
          // Upload file to Cloudinary
          const result = await cloudinary.uploader.upload(file.path, {
            folder: "sheet_orders",
            resource_type: "auto", // Automatically handles file type (image, pdf, etc.)
            chunk_size: 6000000,
            access_mode: "public"
          });
          uploadedFiles.push(result.secure_url);
        } catch (uploadError) {
          console.log(uploadError)
          // If any file upload fails, return an error response
          res.status(500).json({
            error: "Failed to upload file to Cloudinary",
            details: uploadError,
          });
          return;
        }
      }
    }

    // Create a new SheetOrder record
    const newOrder = new SheetOrder({
      name,
      phone,
      department,
      year,
      semester,
      lectureSheets:lectureSheets?.map(i=>({name: i.name})),
      pdfFiles: uploadedFiles, // Store the Cloudinary URLs of the uploaded files
    });

    // Save to the database
    await newOrder.save();

    // Return success response
    res.status(200).json({message: "Sheet order created successfully"});
  } catch (error) {
    console.error("Error creating sheet order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getSheetOrderHandler = async (req: Request, res: Response) => {
    const query: QueryProp = {}; // Use Partial to make properties optional
    try {
        // Parse limit and skip from query params
        if (req.query?.limit) {
            const limit = parseInt(req.query.limit as string);
            if (isNaN(limit)) {
                res.status(400).send({ message: "Limit must be a number" });
                return;
            }
            query.limit = limit;
        }
        if (req.query?.skip) {
            const skip = parseInt(req.query.skip as string);
            if (isNaN(skip)) {
                res.status(400).send({ message: "Skip must be a number" });
                return;
            }
            query.skip = skip;
        }

        // Fetch orders with pagination, sorting, and population
        const orders = await SheetOrder.find()
            .select("-__v -createdAt -updatedAt") // Exclude __v field
            .limit(query.limit || 0)
            .skip(query.skip || 0) 

        res.status(200).send(orders);
    } catch (error) {
        console.error("Error fetching orders:", error); // Log the error for debugging
        res.status(400).send({ message: "Failed to fetch orders", error });
    }
};

export const getSheetOrderById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const order = await SheetOrder.findById(id);
        if (!order) {
            res.status(404).send({ message: "Order not found" });
            return;
        }
        res.status(200).send(order);
    } catch (error) {
        console.error("Error fetching order:", error);
        res.status(400).send({ message: "Failed to fetch order", error });
    }
}