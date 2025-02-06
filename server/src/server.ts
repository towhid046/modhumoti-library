import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import userRoutes from "./routes/userRoutes";


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/users", userRoutes);
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "";

// Connect to MongoDB
mongoose
    .connect(MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
