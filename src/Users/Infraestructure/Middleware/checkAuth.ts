import jwt from "jsonwebtoken";
import { IUserRepository } from "../../Domain/interfaces/userRepository";
import { Request, Response, NextFunction } from "express";

export class CheckAuthMiddleware{
    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async checkAuth (request: Request, response: Response, next: NextFunction): Promise<void> {
        if(request.headers.authorization && request.headers.authorization.startsWith("Bearer")){
            try {
                const jwtSecret = process.env.JWT_SECRET;
                const token = request.headers.authorization.split(" ")[1];
                const decoded: string = jwt.verify(token, jwtSecret as string) as string;
                request.user = await this.userRepository.findById(decoded);
                next();
            } catch (error) {
                response.status(404).json({message: "An error ocurred"});
            }
        } else {
            response.status(401).json({error: "Not valid token"});
        }
    }
}