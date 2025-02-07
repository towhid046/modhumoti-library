// dependencies
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from 'cookie-parser'
import { connectDB } from "./config/connectDB";
dotenv.config();
const PORT = process.env.PORT || 5000;

import userRoutes from "./routes/user.router";
import bookRouter from "./routes/book.router";

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser())
app.use(cors());

// Routes
app.use("/users", userRoutes);
app.use("/books", bookRouter);

// Connect to MongoDB
connectDB()

app.get("/", (req, res) => {
    res.send("Modhumoti Library server is running...");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
