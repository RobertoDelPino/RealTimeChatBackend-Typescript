import { GetAllUsersUseCase } from "../Application/getAllUserUseCase";
import getAllUsersController from "./Controllers/getAllUsersController";
import { getAllUserMysqlRepository } from "./Repositories/getAllUserMysqlRepository";

function createGetAllUsersController() {
  const repository = new getAllUserMysqlRepository();
  const useCase = new GetAllUsersUseCase(repository);
  const controller = new getAllUsersController(useCase);
  return controller;
}

export { createGetAllUsersController };