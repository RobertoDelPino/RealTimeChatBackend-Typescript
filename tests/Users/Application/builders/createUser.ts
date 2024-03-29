import { User } from "../../../../src/Users/Domain/entities/User";
import { Avatar } from "../../../../src/Users/Domain/valueObjects/Avatar";
import { Password } from "../../../../src/Users/Domain/valueObjects/Password";
import { Token } from "../../../../src/Users/Domain/valueObjects/Token";
import { UserEmail } from "../../../../src/Users/Domain/valueObjects/UserEmail";
import { UserId } from "../../../../src/Users/Domain/valueObjects/UserId";
import { UserName } from "../../../../src/Users/Domain/valueObjects/UserName";

export function createUser(): User{
    return new User(
        UserId.createFromBussiness("id"),
        UserName.createFromBussiness("name"),
        UserEmail.createFromBussiness("email"),
        Password.createFromBussiness("password"),
        Token.createFromBussiness("token"),
        Token.createFromBussiness("token"),
        true,
        Avatar.createFromBussiness("avatar")
    );
}