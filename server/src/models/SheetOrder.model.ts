import { Schema, model } from "mongoose";

  const sheetOrderSchema = new Schema(
    {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      department: { type: String },
      year: { type: String },
      semester: { type: String },
      lectureSheets: [
        {
          name: { type: String, required: true },
        },
      ],
      pdfFiles: [{ type: String }], // Cloudinary URLs
    },
    { timestamps: true }
  );
  
export const SheetOrder = model("SheetOrder", sheetOrderSchema);
  

  