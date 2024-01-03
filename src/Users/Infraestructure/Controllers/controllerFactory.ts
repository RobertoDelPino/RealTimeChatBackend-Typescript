import { CreateUserUseCase } from "../../Application/createUserUseCase";
import { userRepository } from "../Repositories/userRepository";
import { CreateUserController } from "./createUserController";


function createCreateUserController() {
  const repository = new userRepository();
  const useCase = new CreateUserUseCase(repository);
  return new CreateUserController(useCase);
}

export { createCreateUserController };