import mongoose, { Document, Schema } from 'mongoose';

export interface IMessage extends Document {
    content: string;
    username: string;
    topic: mongoose.Types.ObjectId;
    createdAt: Date;
}

const messageSchema = new Schema<IMessage>({
    content: { type: String, required: true },
    username: { type: String, required: true },
    topic: { type: Schema.Types.ObjectId, ref: 'Topic', required: true },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IMessage>('Message', messageSchema);
