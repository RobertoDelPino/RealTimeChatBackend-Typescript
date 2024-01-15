import { User } from '../../Domain/entities/User';
import { IUserRepository } from '../../Domain/interfaces/userRepository';

export class userRepository implements IUserRepository {
    private users: User[];

    constructor() {
        this.users = [];
    }

    async save(data: User): Promise<void> {
        this.users.push(data);
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = this.users.find(user => user.email.value === email);

        if (!user) return null;

        return user;
    }

    async findById(id: string): Promise<User | null> {
        const user = this.users.find(user => user.id.value === id);

        if (!user) return null;

        return user;
    }

    async findByConfirmAccountToken(confirmAccountToken: string): Promise<User | null> {
        const user = this.users.find(user => user.confirmAccountToken.value === confirmAccountToken);

        if (!user) return null;

        return user;
    }

    async findByChangePasswordToken(changePasswordToken: string): Promise<User | null> {
        const user = this.users.find(user => user.changePasswordToken.value === changePasswordToken);

        if (!user) return null;

        return user;
    }

    async update(user: User): Promise<void> {
        const index = this.users.findIndex(u => u.id.value === user.id.value);

        this.users[index] = user;
    }
}