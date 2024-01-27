import mongoose, { Document, Model, Schema } from "mongoose";

export interface IChat extends Document {
    users: string[];
    messages: string[];
}

const chatSchema: Schema<IChat> = new mongoose.Schema(
    {
        users: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        messages: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Message'
            }
        ],
    },
    {
        timestamps: true
    }
);

const Chat: Model<IChat> = mongoose.model<IChat>("Chat", chatSchema);
export default Chat;