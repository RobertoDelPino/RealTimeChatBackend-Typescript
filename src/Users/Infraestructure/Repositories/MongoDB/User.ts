
import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcrypt";

interface IUser extends Document {
    name: string;
    password: string;
    email: string;
    confirmAccountToken?: string;
    changePasswordToken?: string;
    confirmed: boolean;
    avatar: string;
    checkPassword(passwordForm: string): Promise<boolean>;
}

const userSchema: Schema<IUser> = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        confirmAccountToken: {
            type: String,
        },
        changePasswordToken: {
            type: String,
        },
        confirmed: {
            type: Boolean,
            default: false
        },
        avatar: {
            type: String,
            default: "UserPhotos/defaultAvatar.jpg"
        },
    },
    {
        timestamps: true
    }
);

userSchema.pre<IUser>("save", async function(this: any, next: () => void) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.checkPassword = async function(this: any, passwordForm: string) {
    return await bcrypt.compare(passwordForm, this.password);
};

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
export default User;