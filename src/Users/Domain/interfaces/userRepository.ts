import { UserDTO } from "../../Application/searchUserByEmailUseCase";
import { User } from "../entities/User";

export interface IUserRepository {
    findByChangePasswordToken(changePasswordToken: string): Promise<User| null>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    findByConfirmAccountToken(confirmAccountToken: string): Promise<User | null>;
    findByUsername(username: string): Promise<User | null>;
    save(user: User): Promise<void>;
    update(user: User): Promise<void>;
    searchByEmail(email: string): Promise<UserDTO | null>;
}