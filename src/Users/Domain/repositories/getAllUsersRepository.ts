import { User } from "../entities/User";

export interface GetAllUsersRepository {
    getAllUsers(): Promise<User[]>;
}