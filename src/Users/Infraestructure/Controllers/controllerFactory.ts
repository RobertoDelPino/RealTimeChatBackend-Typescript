import { CreateUserUseCase } from "../../Application/createUserUseCase";
import { CreateUserController } from "./createUserController";
import { createToken } from "../../Domain/services/createToken";
import { sendEmail } from "../Services/sendEmail";
import { mongoDbUserRepository } from "../Repositories/MongoDB/userRepository";
import { ConfirmUserUseCase } from "../../Application/confirmUserUseCase";
import { ConfirmUserController } from "./confirmUserController";
import { ForgotPasswordUseCase } from "../../Application/forgotPasswordUseCase";
import { ForgotPasswordController } from "./forgotPasswordController";
import { CheckChangePasswordTokenUseCase } from "../../Application/checkChangePasswordTokenUseCase";
import { checkChangePasswordTokenController } from "./checkChangePasswordTokenController";
import { changePasswordUseCase } from "../../Application/changePasswordUseCase";
import { changePasswordController } from "./changePasswordController";
import { GetProfileUseCase } from "../../Application/getProfileUseCase";
import { GetProfileController } from "./getProfileController";
import { LoginUseCase } from "../../Application/LoginUseCase";
import { LoginController } from "./loginController";
import { CreateJWT } from "../Services/createJWT";


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

function createCheckChangePasswordTokenController(){
  const repository = new mongoDbUserRepository();
  const useCase = new CheckChangePasswordTokenUseCase(repository);
  return new checkChangePasswordTokenController(useCase);
}

function createChangePasswordController(){
  const repository = new mongoDbUserRepository();
  const tokenCreator = new createToken();
  const useCase = new changePasswordUseCase(repository, tokenCreator);
  return new changePasswordController(useCase);
}

function createGetProfileController(){
  const repository = new mongoDbUserRepository();
  const useCase = new GetProfileUseCase(repository);
  return new GetProfileController(useCase);
}

function createLoginController() {
  const repository = new mongoDbUserRepository();
  const createJWT = new CreateJWT();
  const useCase = new LoginUseCase(repository, createJWT);
  return new LoginController(useCase);
}

export { 
  createCreateUserController, 
  createConfirmUserController, 
  createForgotPasswordController,
  createCheckChangePasswordTokenController,
  createChangePasswordController,
  createGetProfileController,
  createLoginController
};