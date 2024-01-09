import jwt from "jsonwebtoken";
import { IUserRepository } from "../../Domain/interfaces/userRepository";
import { Request, Response, NextFunction } from "express";

export class CheckAuthMiddleware{
    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async checkAuth (request: Request, response: Response, next: NextFunction) {
        let token = "";
        if(request.headers.authorization && request.headers.authorization.startsWith("Bearer")){
            try {
                const jwtSecret = process.env.JWT_SECRET;
                token = request.headers.authorization.split(" ")[1];
                const decoded: string = jwt.verify(token, jwtSecret as string) as string;
                request.user = await this.userRepository.findById(decoded);
                next();
            } catch (error) {
                return response.status(404).json({message: "An error ocurred"})
            }
        };
    
        if(!token){
            const error = new Error("Not valid token");
            return response.status(401).json({error: error.message});
        }
    
        throw new Error("Not valid token");
    }
}