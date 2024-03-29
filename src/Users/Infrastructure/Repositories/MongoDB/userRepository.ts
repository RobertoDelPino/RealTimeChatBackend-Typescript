import { User } from "../../../Domain/entities/User";
import MongoDbUser, { IUser } from "./Models/User";
import { IUserRepository } from "../../../Domain/interfaces/userRepository";
import { UserName } from "../../../Domain/valueObjects/UserName";
import { UserEmail } from "../../../Domain/valueObjects/UserEmail";
import { UserId } from "../../../Domain/valueObjects/UserId";
import { Password } from "../../../Domain/valueObjects/Password";
import { Token } from "../../../Domain/valueObjects/Token";
import { Avatar } from "../../../Domain/valueObjects/Avatar";
import { UserDTO } from "../../../Application/searchUserByEmailUseCase";

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
            );

            await user.save();
        }
        catch (error: any){
            throw new Error(error);
        }
    }

    async findByEmail(email: string): Promise<User | null> {
        const repoUser = await MongoDbUser.findOne({email: email});

        if(!repoUser) return null;

        return this.createUser(repoUser);
    }
    
    
    async findById(id: string): Promise<User | null> {
        const repoUser = await MongoDbUser.findOne({_id: id});

        if(!repoUser) return null;

        return this.createUser(repoUser);
        
    }

    async findByConfirmAccountToken(confirmAccountToken: string): Promise<User | null> {
        const repoUser = await MongoDbUser.findOne({confirmAccountToken: confirmAccountToken});

        if(!repoUser) return null;

        return this.createUser(repoUser);
    }

    async findByUsername(username: string): Promise<User | null> {
        const repoUser = await MongoDbUser.findOne({name: username});
        
        if(!repoUser) return null;

        return this.createUser(repoUser);
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
            );
        }
        catch (error: any){
            throw new Error(error);
        }
    }

    async findByChangePasswordToken(changePasswordToken: string): Promise<User | null> {
        const repoUser = await MongoDbUser.findOne({changePasswordToken: changePasswordToken});

        if(!repoUser) return null;

        return this.createUser(repoUser);
    }

    async searchByEmail(email: string): Promise<UserDTO | null> {
        const repoUser = await MongoDbUser.findOne({email: email});

        if(!repoUser) return null;

        return {
            id: repoUser._id,
            name: repoUser.name,
            email: repoUser.email,
            avatar: repoUser.avatar
        };
    }

    private createUser(repoUser: IUser) : User {
        return new User(
            UserId.createFromBussiness(repoUser._id),
            UserName.createFromBussiness(repoUser.name),
            UserEmail.createFromBussiness(repoUser.email),
            Password.createFromBussiness(repoUser.password),
            Token.createFromBussiness(repoUser.confirmAccountToken!),
            Token.createFromBussiness(repoUser.changePasswordToken!),
            repoUser.confirmed,
            Avatar.createFromBussiness(repoUser.avatar)
        );
    }
}


