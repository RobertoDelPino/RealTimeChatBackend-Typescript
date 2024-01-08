import { User } from "../../../Domain/entities/User";
import MongoDbUser from "./Models/User";
import { IUserRepository } from "../../../Domain/interfaces/userRepository";

export class mongoDbUserRepository implements IUserRepository{
    async save(data: User): Promise<void> {
        try{
            const user = new MongoDbUser(
                {
                    name: data.name.value,
                    email: data.email.value,
                    password: data.password.value,
                    confirmAccountToken: data.confirmAccountToken.value,
                    changePasswordToken: data.changePasswordToken.value,
                    confirmed: data.confirmed,
                    avatar: data.avatar.value
                }
            )

            await user.save();
        }
        catch (error: any){
            throw new Error(error);
        }
    }

    async findByEmail(email: string): Promise<User | null> {
        return await MongoDbUser.findOne({email: email})
    }
    
    
    findById(id: string): User {
        console.log(id)
        throw new Error("Method not implemented.");
        
    }
    
}