// dependencies
import cookieParser from 'cookie-parser';
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
dotenv.config();

import { connectDB } from "./config/connectDB";
const PORT = process.env.PORT || 5000;

import bookRouter from "./routes/book.router";
import bookOrderRouter from './routes/bookOrder.router';
import serviceRouter from "./routes/service.router";
import userRoutes from "./routes/user.router";
import sheetOrderRouter from './routes/sheetOrder.router';

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true, limit: "100mb" }));

app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:5173", "https://modhumotilibrary-computer.web.app", "http://192.168.0.105:5173"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true // Important for authentication and cookies
}));


// Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/books", bookRouter);
app.use("/api/v1/services", serviceRouter);
app.use("/api/v1/checkout-book", bookOrderRouter);
app.use("/api/v1/order-sheet", sheetOrderRouter);

// Connect to MongoDB
connectDB()

app.get("/",  (req, res) => {
    res.send("Modhumoti Library server is running...");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
