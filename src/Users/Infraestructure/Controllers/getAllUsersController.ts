import { Request, Response } from 'express';

class getAllUsersController {
    async exec(_req: Request, res: Response): Promise<void> {
        try {
            // Your code here

            res.status(200).json({ message: 'Get all users' });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default getAllUsersController;