import mongoose, { Document, Schema } from "mongoose";

export interface IMessage extends Document {
    sender: Schema.Types.ObjectId;
    message: string;
    readTime: Date;
    readed: boolean;
}

export const messageSchema: Schema<IMessage> = new mongoose.Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        message: {
            type: String,
            required: true,
            trim: true
        },
        readTime: {
            type: Date,
            default: null
        },
        readed: { 
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

