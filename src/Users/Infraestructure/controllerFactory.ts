import getAllUsersController from "./Controllers/getAllUsersController";

function createGetAllUsersController() {
  //const repository = new UserRepository(); --> Repositorio
  //const useCase = new GetAllUsersUseCase(repository); --> Comando
  //const controller = new getAllUsersController(useCase); --> Controlador
  return new getAllUsersController();
}

export { createGetAllUsersController };