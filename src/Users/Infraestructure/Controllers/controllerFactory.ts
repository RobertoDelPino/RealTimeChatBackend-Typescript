import { CreateUserUseCase } from "../../Application/createUserUseCase";
import { userRepository } from "../Repositories/userRepository";
import { CreateUserController } from "./createUserController";
import { createToken } from "../Services/createToken";
import { sendEmail } from "../Services/sendEmail";


function createCreateUserController() {
  const repository = new userRepository();
  const tokenCreator = new createToken();
  const emailSender = new sendEmail();
  const useCase = new CreateUserUseCase(repository, tokenCreator, emailSender);
  return new CreateUserController(useCase);
}

export { createCreateUserController };