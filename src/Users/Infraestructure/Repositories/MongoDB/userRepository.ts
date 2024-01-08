import { User } from "../../../Domain/entities/User";
import MongoDbUser from "./Models/User";
import { IUserRepository } from "../../../Domain/interfaces/userRepository";
import { UserName } from "../../../Domain/valueObjects/UserName";
import { UserEmail } from "../../../Domain/valueObjects/UserEmail";
import { UserId } from "../../../Domain/valueObjects/UserId";
import { Password } from "../../../Domain/valueObjects/Password";
import { Token } from "../../../Domain/valueObjects/Token";
import { Avatar } from "../../../Domain/valueObjects/Avatar";

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
    
    
    findById(id: string): Promise<User | null> {
        console.log(id)
        throw new Error("Method not implemented.");
        
    }

    async findByConfirmAccountToken(confirmAccountToken: string): Promise<User | null> {
        const repoUser = await MongoDbUser.findOne({confirmAccountToken: confirmAccountToken})

        if(!repoUser) return null;

        const user = new User(
            UserId.createFromBussiness(repoUser._id),
            UserName.createFromBussiness(repoUser.name),
            UserEmail.createFromBussiness(repoUser.email),
            Password.createFromBussiness(repoUser.password),
            Token.createFromBussiness(repoUser.confirmAccountToken!),
            Token.createFromBussiness(repoUser.changePasswordToken!),
            repoUser.confirmed,
            Avatar.createFromBussiness(repoUser.avatar)
        )

        return user;
    }

    async update(user: User): Promise<void> {
        try{
            await MongoDbUser.findOneAndUpdate(
                {_id: user.id.value},
                {
                    name: user.name.value,
                    email: user.email.value,
                    password: user.password.value,
                    confirmAccountToken: user.confirmAccountToken.value,
                    changePasswordToken: user.changePasswordToken.value,
                    confirmed: user.confirmed,
                    avatar: user.avatar.value
                }
            )
        }
        catch (error: any){
            throw new Error(error);
        }
    }
    
}