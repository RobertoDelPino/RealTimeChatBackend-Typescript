import { CreateUserUseCase } from "../../Application/createUserUseCase";
import { CreateUserController } from "./createUserController";
import { createToken } from "../Services/createToken";
import { sendEmail } from "../Services/sendEmail";
import { mongoDbUserRepository } from "../Repositories/MongoDB/userRepository";


function createCreateUserController() {
  const repository = new mongoDbUserRepository();
  const tokenCreator = new createToken();
  const emailSender = new sendEmail();
  const useCase = new CreateUserUseCase(repository, tokenCreator, emailSender);
  return new CreateUserController(useCase);
}

export { createCreateUserController };