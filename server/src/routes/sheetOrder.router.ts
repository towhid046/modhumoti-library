import express from "express";
import { createSheetOrder, getSheetOrderHandler, getSheetOrderById } from "../controller/sheetOrder.controller";
import { upload } from "../utils/multerUpload";
import { get } from "http";

const sheetOrderRouter = express.Router();
  
sheetOrderRouter.get('/', getSheetOrderHandler)
sheetOrderRouter.get('/:id', getSheetOrderById)
sheetOrderRouter.post("/", upload.array('pdfFiles', 5), createSheetOrder);

export default sheetOrderRouter;
