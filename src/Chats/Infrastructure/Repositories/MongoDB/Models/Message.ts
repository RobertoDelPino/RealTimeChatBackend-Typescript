import mongoose, { Document, Model, Schema } from "mongoose";

export interface IMessage extends Document {
    sender?: string;
    message: string;
    readTime?: Date;
    readed: boolean;
}

const messageSchema: Schema<IMessage> = new mongoose.Schema(
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
        },
        readed: {
            type: Boolean,
            default: false
        },
    },
    {
        timestamps: true
    }
);


const Message: Model<IMessage> = mongoose.model<IMessage>("Message", messageSchema);
export default Message;