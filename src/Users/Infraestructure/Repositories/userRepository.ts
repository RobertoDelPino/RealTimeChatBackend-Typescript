import { User } from '../../Domain/entities/User';
import { IUserRepository } from '../../Domain/interfaces/userRepository';


export class userRepository implements IUserRepository {
    private users: User[];

    constructor() {
        this.users = [];
    }

    async save(user: User): Promise<void> {
        this.users.push(user);
    }

    findByEmail(email: string): User {
        const user = this.users.find((user) => user.getEmail() === email);

        return user!;
    }

    findById(id: string): User {
        const user = this.users.find((user) => user.getId() === id);

        return user!;
    }
}
