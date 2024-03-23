import mongoose, { Document, Schema } from "mongoose";
import { IMessage, messageSchema } from "./Message";

export interface IChat extends Document {
    users: Schema.Types.ObjectId[];
    messages: Schema.Types.ObjectId[];
    isGroup: boolean;
    groupName: string;
}

export const chatSchema: Schema<IChat> = new mongoose.Schema(
    {
        isGroup: {
            type: Boolean,
            default: false
        },
        groupName: {
            type: String,
            default: ''
        },
        users: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        messages: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Message'
            }
        ]
    },
    {
        timestamps: true
    }
);

const Message = mongoose.model<IMessage>("Message", messageSchema);

const Chat = mongoose.model<IChat>("Chat", chatSchema);
export {
    Chat,
    Message
};