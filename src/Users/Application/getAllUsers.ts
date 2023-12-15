import { User } from "../Domain/entities/User";
import { GetAllUsersRepository } from "../Domain/repositories/getAllUsersRepository";

export interface getAllUsersInterface {
    execute(): Promise<User[]>;
}

export class getAllUsers implements getAllUsersInterface{
    private readonly repository: GetAllUsersRepository;

    constructor(repository: GetAllUsersRepository){
        this.repository = repository;
    }
    
    execute(){
        return this.repository.getAllUsers();
    }
}