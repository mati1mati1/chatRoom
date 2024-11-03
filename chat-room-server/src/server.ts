import app from './app';
import http from 'http';
import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import User from './models/User';
import Message from './models/Message';

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: 'http://localhost:3000' } });

io.use(async (socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) return next(new Error('Authentication error'));

    try {
        const decoded = jwt.verify(token, 'your_jwt_secret') as { userId: string };
        const user = await User.findById(decoded.userId);
        if (!user) return next(new Error('User not found'));

        socket.data.username = user.username; 
        next();
    } catch (error) {
        next(new Error('Authentication error'));
    }
});

io.on('connection', (socket) => {
    const { username } = socket.data;

    socket.on('joinRoom', (roomId) => {
        socket.join(roomId);
        console.log(`${username} joined room ${roomId}`);
    });

    socket.on('sendMessage', async ({ topicId, content }) => {
        const message = new Message({
            content,
            username,
            topic: topicId,
            createdAt: new Date()
        });
        await message.save();
        io.to(topicId).emit('message', message);
    });

    socket.on('leaveRoom', (roomId) => {
        socket.leave(roomId);
    });
});

const PORT = process.env.PORT || 3003;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export { io };