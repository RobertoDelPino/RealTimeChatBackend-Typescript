import mongoose, { Document, Schema } from "mongoose";
import { IMessage, messageSchema } from "./Message";

export interface IChat extends Document {
    users: Schema.Types.ObjectId[];
    messages: Schema.Types.ObjectId[];
}

export const chatSchema: Schema<IChat> = new mongoose.Schema(
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

mongoose.model<IMessage>("Message", messageSchema);

const Chat = mongoose.model<IChat>("Chat", chatSchema);
export default Chat;