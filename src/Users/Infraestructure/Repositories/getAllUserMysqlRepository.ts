import { User } from "../../Domain/entities/User";
import { GetAllUsersRepository } from "../../Domain/repositories/getAllUsersRepository";

export class getAllUserMysqlRepository implements GetAllUsersRepository {
    getAllUsers(): Promise<User[]> {
        return new Promise((resolve, _reject) => {
            resolve([
                new User('1', 'name', 'email', 'password')
            ])
        });
    }
}