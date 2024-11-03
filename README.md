
# ChatRoom Application

A real-time chat application where users can create topics, join chat rooms, and communicate with others. Each chat room allows users to send messages, see active users, and view the message history of the last 7 days.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [License](#license)

## Features

- **User Authentication**: Users can register, log in, and receive a JWT for authentication.
- **Real-Time Messaging**: Powered by Socket.io for real-time message updates.
- **Topic Management**: Users can create topics, and the creator of a topic can delete it.
- **Message History**: Each chat room displays the last 7 days of messages.
- **Active User Count**: Displays the number of active users in each chat room.

## Technologies Used

- **Frontend**: React, TypeScript, Socket.io Client
- **Backend**: Node.js, Express, Socket.io, MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Database**: MongoDB for data persistence

## Installation

### Prerequisites

- Node.js and npm installed on your machine
- MongoDB server (local or cloud, such as MongoDB Atlas)

### Clone the Repository

```bash
git clone https://github.com/mati1mati1/chatroom.git
cd chatroom
Backend Setup
Navigate to the backend directory:

bash
cd chat-room-server
Install dependencies:

bash
npm install
Create a .env file in the chat-room-server directory and add the following environment variables:

env
PORT=3003
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
Start the backend server:

bash
npm run dev
Frontend Setup
Open a new terminal and navigate to the frontend directory:

bash
cd chat-room-front
Install dependencies:

bash
npm install
Start the frontend application:

bash
npm start
The application will be available at http://localhost:3000, and the backend server will run on http://localhost:3003.

Usage
Register a new account.
Log in to receive a JWT token, which will be used for authentication.
Create a Topic or join an existing topic from the dashboard.
Send Messages in real-time within a topic chat room.
Delete Topic if you are the creator of the topic.
API Endpoints
Authentication
POST /api/auth/register - Register a new user.
POST /api/auth/login - Log in with email and password to receive a JWT.
Topics
POST /api/topics/create - Create a new topic (requires authentication).
GET /api/topics/details - Get all topics with message count and active user details.
DELETE /api/topics/
- Delete a topic if you are the creator (requires authentication).
Messages
GET /api/topics/
/messages - Get the last 7 days of messages for a topic (requires authentication).
Project Structure
plaintext
chatroom/
├── chat-room-server/       # Backend folder
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── controllers/    # Controller functions
│   │   ├── middleware/     # Middleware (e.g., authMiddleware)
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # Express routes
│   │   └── server.ts       # Main server file
│   ├── .env                # Environment variables
│   └── package.json        # Backend dependencies and scripts
└── chat-room-front/        # Frontend folder
    ├── src/
    │   ├── components/     # React components
    │   ├── App.tsx         # Main App component
    │   ├── index.tsx       # Entry point
    └── package.json        # Frontend dependencies and scripts
License
This project is licensed under the MIT License. See the LICENSE file for details.

yaml



You said:
