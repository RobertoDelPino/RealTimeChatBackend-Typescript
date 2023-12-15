import { User } from "../Domain/entities/User";
import { GetAllUsersInterfaceRepository } from "../Domain/repositories/getAllUsersInterfaceRepository";

export interface IGetAllUsersUseCase {
    execute(): Promise<User[]>;
}

export class GetAllUsersUseCase implements IGetAllUsersUseCase{
    private readonly repository: GetAllUsersInterfaceRepository;

    constructor(repository: GetAllUsersInterfaceRepository){
        this.repository = repository;
    }
    
    execute(){
        return this.repository.getAllUsers();
    }
}