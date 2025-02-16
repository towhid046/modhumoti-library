// dependencies
import express from 'express';
import { User } from '../models/User.model';

export const postUserHandler = async (req: express.Request, res: express.Response) => {
    try {
        const { name, email, password } = req.body;
        const user = new User({ name, email });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: "Error creating user" });
    }
}

export const getUserHandler = async (req: express.Request, res: express.Response) => {
    try {
        const users = await User.find()
        res.status(200).send(users)
    } catch (error) {
        res.status(500).json({ error: "Error creating user" });
    }
}

