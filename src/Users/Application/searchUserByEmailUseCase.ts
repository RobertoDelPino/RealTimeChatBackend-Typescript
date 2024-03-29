import { User } from "../Domain/entities/User";
import { IUserRepository } from "../Domain/interfaces/userRepository";

export interface ISearchUserByEmailUseCase {
    execute(email: string): Promise<User | null>;
}

export class SearchUserByEmailUseCase implements ISearchUserByEmailUseCase {
    constructor(private userRepository: IUserRepository) { }

    async execute(email: string): Promise<User | null> {
        if(!email || email == ""){
            throw new Error('Email is required');
        }

        const user = await this.userRepository.findByEmail(email);
        return user;
    }
}
