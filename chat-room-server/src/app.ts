import express from 'express';
import cors from 'cors';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import topicRoutes from './routes/topicRoutes';

const app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

connectDB();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/topics', topicRoutes);

export default app;
