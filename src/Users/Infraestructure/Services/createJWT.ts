import { ICreateJWT, UserProfile } from "../../Domain/interfaces/createJWT";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

export class CreateJWT implements ICreateJWT{
    execute(userProfile: UserProfile): Promise<string> {
        dotenv.config();
        return jwt.sign({
            id: userProfile.id,
            name: userProfile.name,
            email: userProfile.email
        },
        process.env.JWT_SECRET,{
            expiresIn:"30d"
        });
    }
}