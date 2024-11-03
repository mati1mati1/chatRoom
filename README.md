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
git clone https://github.com/your-username/chatroom.git
cd chatroom
