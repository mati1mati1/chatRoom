// src/models/Topic.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface ITopic extends Document {
    name: string;
    creator: string;
}

const topicSchema = new Schema<ITopic>({
    name: { type: String, required: true, unique: true },
    creator: { type: String, required: true },
});

topicSchema.virtual('messages', {
    ref: 'Message',
    localField: '_id',
    foreignField: 'topic',
});

export default mongoose.model<ITopic>('Topic', topicSchema);
