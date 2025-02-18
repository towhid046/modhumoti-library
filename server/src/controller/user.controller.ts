// dependencies
import express from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken'
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
            secure: false,
            sameSite: 'none',
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