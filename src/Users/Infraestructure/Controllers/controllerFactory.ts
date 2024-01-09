import { CreateUserUseCase } from "../../Application/createUserUseCase";
import { CreateUserController } from "./createUserController";
import { createToken } from "../../Domain/services/createToken";
import { sendEmail } from "../Services/sendEmail";
import { mongoDbUserRepository } from "../Repositories/MongoDB/userRepository";
import { ConfirmUserUseCase } from "../../Application/confirmUserUseCase";
import { ConfirmUserController } from "./confirmUserController";
import { ForgotPasswordUseCase } from "../../Application/forgotPasswordUseCase";
import { ForgotPasswordController } from "./forgotPasswordController";


function createCreateUserController() {
  const repository = new mongoDbUserRepository();
  const tokenCreator = new createToken();
  const emailSender = new sendEmail();
  const useCase = new CreateUserUseCase(repository, tokenCreator, emailSender);
  return new CreateUserController(useCase);
}

function createConfirmUserController(){
  const repository = new mongoDbUserRepository();
  const useCase = new ConfirmUserUseCase(repository);
  return new ConfirmUserController(useCase);
}

function createForgotPasswordController(){
  const repository = new mongoDbUserRepository();
  const tokenCreator = new createToken();
  const emailSender = new sendEmail();
  const useCase = new ForgotPasswordUseCase(repository, emailSender, tokenCreator);
  return new ForgotPasswordController(useCase);
}

export { createCreateUserController, createConfirmUserController, createForgotPasswordController };