import { User } from '../../Domain/entities/User';
import { IUserRepository } from '../../Domain/interfaces/userRepository';


// This is the implementation of the repository
// This way is wrong, because we are using an array to store the users
// We should use a database to store the users
// But just for the example, we are using an array
// Next task to do will be to use a database
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
