import express from "express";
import { createSheetOrder } from "../controller/sheetOrder.controller";
import { upload } from "../utils/multerUpload";

const sheetOrderRouter = express.Router();
  
sheetOrderRouter.post("/", upload.array('pdfFiles', 5), createSheetOrder);

export default sheetOrderRouter;
