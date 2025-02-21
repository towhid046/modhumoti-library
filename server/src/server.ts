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
import serviceRouter from "./routes/service.router";

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:5173", "https://modhumotilibrary-computer.web.app", "http://192.168.0.118:5173"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true // Important for authentication and cookies
}));


// Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/books", bookRouter);
app.use("/api/v1/services", serviceRouter);

// Connect to MongoDB
connectDB()

app.get("/", (req, res) => {
    res.send("Modhumoti Library server is running...");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
