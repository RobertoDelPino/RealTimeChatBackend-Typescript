import { User } from "../entities/User";

export interface IUserRepository {
    save(user: User): Promise<void>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    findByConfirmAccountToken(confirmAccountToken: string): Promise<User | null>;
}