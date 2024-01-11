import { Request, Response } from "express";
import { ILoginUseCase, LoginData } from "../../Application/LoginUseCase";

export class LoginController {
    constructor(private loginUseCase: ILoginUseCase) {
    }
    async execute(request: Request, response: Response) {
        try {
            const loginData: LoginData = {
                email: request.body.email,
                password: request.body.password
            }
            const loginResponse = await this.loginUseCase.execute(loginData);
            response.status(200).json(loginResponse);
        }
        catch (error) {
            response.status(400).json({ error: error.message });
        }
    }
}