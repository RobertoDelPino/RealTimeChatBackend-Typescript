import { User } from "../entities/User";

export interface GetAllUsersInterfaceRepository {
    getAllUsers(): Promise<User[]>;
}