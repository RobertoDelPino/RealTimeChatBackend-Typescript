import { User } from "../../../Domain/entities/User";
import MongoDbUser from "./User";
import { IUserRepository } from "../../../Domain/interfaces/userRepository";

export class mongoDbUserRepository implements IUserRepository{
    async save(data: User): Promise<void> {
        try{
            const user = new MongoDbUser(
                {
                    name: data.name.value,
                    email: data.email.value,
                    password: data.password.value,
                    confirmAccountToken: data.confirmAccountToken,
                    changePasswordToken: data.changePasswordToken,
                    confirmed: data.confirmed,
                    avatar: data.avatar.value
                }
            )
    
            await user.save();
        }
        catch (error: any){
            throw new Error("Error saving user");
        }
    }

    async findByEmail(email: string): Promise<User | null> {
        return await MongoDbUser.findOne({email: email}, (err: any, user: any) => {
            if(err) {
                return null;
            }
            return user;
        })
    }
    
    
    findById(id: string): User {
        throw new Error("Method not implemented.");
        
    }
    
}