import { User } from "../Domain/entities/User";
import { IUserRepository } from "../Domain/interfaces/userRepository";
import path from "path"

export interface IGetProfilePhotoUseCase {
    execute(userId: string): Promise<string>;
}

export class GetProfilePhotoUseCase implements IGetProfilePhotoUseCase {
    constructor(private userRepository: IUserRepository) {}

    async execute(userId: string): Promise<string> {
        try{
            const defaultAvatar = path.resolve("UserPhotos/defaultAvatar.jpg");

            const user: User | null = await this.userRepository.findById(userId);
            if (!user) throw new Error("User not found");

            if(user.avatar.value === "UserPhotos/defaultAvatar.jpg"){
                return path.resolve("UserPhotos/defaultAvatar.jpg");
            }

            const userAvatar = path.resolve(user.avatar.value.replace("\\", "/"));
            if(!userAvatar){
                return defaultAvatar;
            }
            return defaultAvatar;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
