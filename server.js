const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/chat-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Could not connect to MongoDB', err));


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000', 
        methods: ['GET', 'POST'],
        credentials: true
    }
});

io.on('connection', (socket) => {
    console.log('a user connected');
    
    socket.on('message', (msg) => {
        io.emit('message', msg); 
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(3003, () => console.log('Server running on port 3003'));
