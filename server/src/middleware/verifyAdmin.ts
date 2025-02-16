import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";
import {User} from "../models/User.model";

// Define RequestHandler type to match Express middleware signature
const verifyAdmin = async (
  req: Request, 
  res: Response, 
  next: NextFunction
): Promise<void> => {
  try {
    // const token = req.headers.authorization?.split(" ")[1];
    // if (!token) {
    //   return res.status(401).json({ message: "Access Denied: No token provided" });
    // }

    // const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
    // req.user = decoded;

    // const user = await User.findById(decoded.id);
    // if (!user) {
    //   return res.status(404).json({ message: "User not found" });
    // }

    const user = await User.findById('67b206073c9188aa21ccbf62')

    if (user?.role !== "admin") {
      res.status(403).json({ message: "Authorization Failed!" });
      return;
    }

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
    return;
  }
};

export default verifyAdmin;
