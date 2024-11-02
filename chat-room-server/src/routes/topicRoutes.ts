// src/routes/topicRoutes.ts
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import Topic from '../models/Topic';
import Message from '../models/Message';
import { authMiddleware, AuthRequest } from '../middleware/authMiddleware';

const router = express.Router();

// Route to create a new topic (protected)
router.post('/create', authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
    const { name } = req.body;

    try {
        const existingTopic = await Topic.findOne({ name });
        if (existingTopic) {
            res.status(400).json({ msg: 'Topic already exists', statusCode: -1 });
            return;
        }

        // Create a new topic
        const newTopic = new Topic({ name, creator: req.userId });
        await newTopic.save();
        res.status(201).json(newTopic);
    } catch (error) {
        res.status(500).json({ msg: 'Error creating topic', error: error });
    }
});

router.get('/all', async (req: Request, res: Response): Promise<void> => {
    try {
        const topics = await Topic.find();
        res.status(200).json(topics);
    } catch (error) {
        res.status(500).json({ msg: 'Error fetching topics', error: error });
    }
});

router.get('/:topicId/messages', authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
    const { topicId } = req.params;

    try {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        const messages = await Message.find({
            topic: new mongoose.Types.ObjectId(topicId),
            createdAt: { $gte: oneWeekAgo },
        }).sort({ createdAt: 1 });

        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ msg: 'Error fetching messages', error: error });
    }
});

export default router;
