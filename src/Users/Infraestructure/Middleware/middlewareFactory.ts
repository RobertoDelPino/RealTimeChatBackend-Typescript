import { mongoDbUserRepository } from "../Repositories/MongoDB/userRepository";
import { CheckAuthMiddleware } from "./checkAuth";

function createCheckAuth(): CheckAuthMiddleware{
    const repository = new mongoDbUserRepository();
    return new CheckAuthMiddleware(repository);
}

export {
    createCheckAuth
}