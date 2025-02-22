// dependencies
import express from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken'
import { User } from '../models/User.model';

export const postUserHandler = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: 'User already exists!' });
            return;
        }

        // Create a new user (password is already hashed via middleware)
        const newUser = await User.create({ email, password });

        // Generate JWT token
        const token = jwt.sign(
            { email: newUser.email, id: newUser._id }, 
            process.env.JWT_SECRET as string, 
            { expiresIn: '7d' }
        );

        // Set HTTP-only cookie with the token
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Ensure secure in production
            sameSite: 'none', // Adjust if needed for cross-origin requests
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        // Send response
        res.status(200).json({message: 'User registered successfully!'});
        return;
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Error processing user' });
        return;
    }
};



export const getUserHandler = async (req: express.Request, res: express.Response) => {
    try {
        const users = await User.find()
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