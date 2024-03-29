import { IUserRepository } from "../Domain/interfaces/userRepository";

export interface ISearchUserByEmailUseCase {
    execute(email: string): Promise<UserDTO | null>;
}

export class SearchUserByEmailUseCase implements ISearchUserByEmailUseCase {
    constructor(private userRepository: IUserRepository) { }

    async execute(email: string): Promise<UserDTO | null> {
        if(!email || email == ""){
            throw new Error('Email is required');
        }

        const user = await this.userRepository.searchByEmail(email);
        return user;
    }
}

export interface UserDTO {
    id: string;
    name: string;
    email: string;
    avatar: string;
}
