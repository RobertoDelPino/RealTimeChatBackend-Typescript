import { User } from "../../Domain/entities/User";
import { GetAllUsersInterfaceRepository } from "../../Domain/repositories/getAllUsersInterfaceRepository";

export class getAllUserMysqlRepository implements GetAllUsersInterfaceRepository {
    getAllUsers(): Promise<User[]> {
        return new Promise((resolve, _reject) => {
            resolve([
                new User('1', 'name', 'email', 'password')
            ])
        });
    }
}