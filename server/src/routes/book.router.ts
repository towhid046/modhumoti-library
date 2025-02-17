import express from "express";
import { createBookHandler, getAllBookHandler, getSingleBookHandler, deleteBookHandler, updateBookHandler } from "../controller/book.controller";
import verifyAdmin from "../middleware/verifyAdmin";

const bookRouter = express.Router();

bookRouter.post("/", verifyAdmin, createBookHandler);
bookRouter.get("/", getAllBookHandler);
bookRouter.get("/:id", getSingleBookHandler);
bookRouter.put("/:id",verifyAdmin, updateBookHandler);
bookRouter.delete("/:id", verifyAdmin, deleteBookHandler);

export default bookRouter;