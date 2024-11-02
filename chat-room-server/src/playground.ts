// src/playground.ts

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
// Load environment variables from .env file
dotenv.config();
// Define the IUser interface in playground.ts or import it from your models/User file

interface IUser extends Document {
    username: string;
    email: string;
    password: string;
}


// Define a User schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// Create a User model
const User = mongoose.model<IUser>('User', userSchema);

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/chat-room');
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }

};

// Playground function for CRUD operations
const playground = async () => {
    try {
        const hashedPassword = await bcrypt.hash('Aa123456!', 10);
        const newUser = new User({
            username: 'admin',
            email: 'admin@example.com',
            password: hashedPassword,
        });
        await newUser.save();
        console.log('User created:', newUser);

        // Find a user
        const user = await User.findOne({ username: 'testUser' });
        console.log('User found:', user);

        // Update a user
        if (user) {
            user.email = 'updatedemail@example.com';
            await user.save();
            console.log('User updated:', user);
        }

        // Delete a user
        const deletedUser = await User.deleteOne({ username: 'testUser' });
        console.log('User deleted:', deletedUser);

    } catch (error) {
        console.error('Error in playground:', error);
    } finally {
        mongoose.connection.close();
    }
};

// Run the playground
connectDB().then(() => playground());

