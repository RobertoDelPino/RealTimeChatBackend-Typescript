import { getAllUsers } from "../Application/getAllUsers";
import getAllUsersController from "./Controllers/getAllUsersController";
import { getAllUserMysqlRepository } from "./Repositories/getAllUserMysqlRepository";

function createGetAllUsersController() {
  const repository = new getAllUserMysqlRepository();
  const useCase = new getAllUsers(repository);
  const controller = new getAllUsersController(useCase);
  return controller;
}

export { createGetAllUsersController };