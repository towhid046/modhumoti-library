import express from "express";
import { getUserHandler } from "../controller/user.controller";

const userRouter = express.Router();

// Create a new user
userRouter.get("/", getUserHandler);


export default userRouter;
