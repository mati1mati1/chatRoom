// src/routes/topicRoutes.ts
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import Topic from '../models/Topic';
import Message from '../models/Message';
import { authMiddleware, AuthRequest } from '../middleware/authMiddleware';
import { io } from '../server';
const router = express.Router();

const countActiveUsers = (roomId: string): number => {
    const room = io.sockets.adapter.rooms.get(roomId);
    return room ? room.size : 0;
};
router.delete('/:topicId', authMiddleware, async (req: AuthRequest, res: Response) => {
    const { topicId } = req.params;
    const userId = req.userId;

    try {
        const topic = await Topic.findById(topicId);

        if (!topic) {
            res.status(404).json({ msg: 'Topic not found' });
            return;
        }

        if (topic.creator.toString() !== userId) {
            res.status(403).json({ msg: 'Not authorized to delete this topic' });
            return
        }

        await Topic.findByIdAndDelete(topicId);
        res.status(200).json({ msg: 'Topic deleted successfully' });
    } catch (error) {
        res.status(500).json({ msg: 'Error deleting topic', error: error });
    }
})


router.post('/create', authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
    const { name } = req.body;

    try {
        const existingTopic = await Topic.findOne({ name });
        if (existingTopic) {
            res.status(400).json({ msg: 'Topic already exists', statusCode: -1 });
            return;
        }
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
router.get('/details', authMiddleware, async (req: Request, res: Response) => {
    try {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        const topics = await Topic.find();

        const topicDetails = await Promise.all(
            topics.map(async (topic) => {
                const messageCount = await Message.countDocuments({
                    topic: new mongoose.Types.ObjectId(topic._id),
                    createdAt: { $gte: oneWeekAgo },
                });

                const activeUsers = countActiveUsers(topic._id.toString());

                return {
                    _id: topic._id,
                    name: topic.name,
                    creator: topic.creator,
                    messageCount,
                    activeUsers,
                };
            })
        );

        res.status(200).json(topicDetails);
    } catch (error) {
        res.status(500).json({ msg: 'Error fetching topic details', error: error });
    }
});


export default router;
