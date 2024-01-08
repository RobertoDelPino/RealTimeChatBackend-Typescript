import { Avatar } from "../valueObjects/Avatar";
import { Password } from "../valueObjects/Password";
import { Token } from "../valueObjects/Token";
import { UserEmail } from "../valueObjects/UserEmail";
import { UserId } from "../valueObjects/UserId";
import { UserName } from "../valueObjects/UserName";

export class User{
    constructor(
        public id: UserId,
        public name: UserName,
        public email: UserEmail,
        public password: Password,
        public confirmAccountToken: Token,
        public changePasswordToken: Token,
        public confirmed: boolean,
        public avatar: Avatar
    ){}

    public update(newUser : User) : User {
        return new User(
            newUser.id,
            newUser.name,
            newUser.email,
            newUser.password,
            newUser.confirmAccountToken,
            newUser.changePasswordToken,
            newUser.confirmed,
            newUser.avatar
        )
    }

    public confirm(): void {
        this.confirmed = true;
        this.confirmAccountToken = Token.createFromBussiness('');
    }
}