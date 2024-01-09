import { User } from "../entities/User";

export interface IUserRepository {
    findByChangePasswordToken(changePasswordToken: string, userEmail: string): Promise<User| null>;
    save(user: User): Promise<void>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    findByConfirmAccountToken(confirmAccountToken: string): Promise<User | null>;
    update(user: User): Promise<void>;
}