import express from "express";
import { getUserHandler, postUserHandler, checkAdmin } from "../controller/user.controller";
import verifyAdmin from "../middleware/verifyAdmin";
import hashPassword from "../middleware/hashPassword";

const userRouter = express.Router();

userRouter.post("/", hashPassword,  postUserHandler);
userRouter.get("/", verifyAdmin, getUserHandler);
userRouter.get("/check-admin", checkAdmin);


export default userRouter;
