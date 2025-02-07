import express from "express";
import { createBookHandler, getAllBookHandler, getSingleBookHandler, deleteBookHandler, updateBookHandler } from "../controller/book.controller";

const bookRouter = express.Router();

bookRouter.post("/", createBookHandler);
bookRouter.get("/", getAllBookHandler);
bookRouter.get("/:id", getSingleBookHandler);
bookRouter.put("/:id", updateBookHandler);
bookRouter.delete("/:id", deleteBookHandler);

export default bookRouter;