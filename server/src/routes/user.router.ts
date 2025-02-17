import express from "express";
import { getUserHandler, postUserHandler } from "../controller/user.controller";
import verifyAdmin from "../middleware/verifyAdmin";

const userRouter = express.Router();

userRouter.post("/", postUserHandler);
userRouter.get("/", verifyAdmin, getUserHandler);


export default userRouter;
