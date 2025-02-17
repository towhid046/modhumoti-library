// dependencies
import express from 'express';
import jwt from 'jsonwebtoken'
import { User } from '../models/User.model';

export const postUserHandler = async (req: express.Request, res: express.Response) => {
    try {
        const { email } = req.body;
        
        // Check if user exists, if not create new user
        let user = await User.findOne({ email });
        if (!user) {
            user = await User.create({ email });
        }

        // Generate JWT token with email
        const token = jwt.sign({ email }, process.env.JWT_SECRET as string, {
            expiresIn: '7d'
        });

        // Set cookie with JWT token
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
        res.status(200).json({ message:'Token created successfully!' });
    } catch (error) {
        res.status(500).json({ error: "Error processing user" });
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