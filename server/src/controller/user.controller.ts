// dependencies
import express from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { z } from 'zod';
import { User } from '../models/User.model';
import { zodUserSchema } from '../schemas/User.schema';
import setCookie from '../utils/setCookie';

export const registerUserHandler = async (req: express.Request, res: express.Response) => {
    try {
        // ✅ Validate user input with Zod using parse()
        const validUserData = zodUserSchema.parse({ ...req.body, role: "member" });

        // ✅ Extract validated data
        const { name, email, password, role } = validUserData;

        // ✅ Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: 'User already exists!' });
            return;
        }

        // ✅ Create new user
         await User.create({ name, email, password, role });

        // ✅ Set cookie
        await setCookie(req,res)

        // ✅ Send response
        res.status(200).json({ message: 'User registered successfully!' });
    } catch (error) {
        console.error('Error creating user:', error);
        
        // Handle Zod validation errors
        if (error instanceof z.ZodError) {
            res.status(400).json({ errors: error.errors });
            return;
        }

        // Handle other errors
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getUserHandler = async (req: express.Request, res: express.Response) => {
    try {
        const users = await User.find().select('-password -__v');
        res.status(200).send(users)
    } catch (error) {
        res.status(500).json({ error: "Error creating user" });
    }
}

export const checkAdmin = async (req: express.Request, res: express.Response) => {
    const {token} = req.query;
    try {
    if(!token){
        res.status(401).send({isAdmin:false})
        return;
    }
        const decoded = jwt.verify(token as string, process.env.JWT_SECRET as string) as JwtPayload;
        const user = await User.findOne({email: decoded.email})
        if(!user){
          res.status(404).json({ isAdmin:false});
          return;
        }
    
        if (user?.role !== "admin") {
          res.status(403).json({ isAdmin:false });
          return;
        }
        res.status(200).send({isAdmin:true})
    } catch (error) {
        res.status(500).send({ message:"Internal Server Error" });
    }
}

export const loginUserHandler = async (req: express.Request, res: express.Response) => {
    try{
        setCookie(req,res);
        res.send({message: "User logged in successfully"});
    }catch(error){
        res.status(500).send({message: "Internal Server Error"});
    }
}

export const logoutHandler = async (req: express.Request, res: express.Response) => { 
    try {
        res.clearCookie('token');
        res.status(200).send({ message: 'Logged out successfully' });
    }
    catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
}
