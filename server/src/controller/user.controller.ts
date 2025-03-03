// dependencies
import express from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken'
import { User } from '../models/User.model';
import { z } from 'zod';
import { zodUserSchema } from '../schemas/User.schema';

export const postUserHandler = async (req: express.Request, res: express.Response) => {
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
        const newUser = await User.create({ name, email, password, role });

        // ✅ Generate JWT token
        const token = jwt.sign(
            { id: newUser._id, email: newUser.email },
            process.env.JWT_SECRET as string,
            { expiresIn: '7d' }
        );

        // ✅ Set HTTP-only cookie with the token
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

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