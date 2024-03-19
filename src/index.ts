import express from 'express'
import usersRoutes from './Users/Infrastructure/routes';
import chatsRoutes from './Chats/Infrastructure/routes';
import connectToDB from './Users/Infrastructure/Repositories/MongoDB/Connections/connectToDB';
import dotenv from 'dotenv';
import { connectToSocket } from './Chats/Infrastructure/Websocket/connection';
import cors from 'cors';

const app = express()
dotenv.config();
connectToDB();

app.use(cors())
app.use(express.json())
app.use(usersRoutes);
app.use(chatsRoutes);

const PORT = process.env.PORT;

export const server = app.listen(PORT, () => {
    console.log(`Sever running on Port ${PORT}`)
})

connectToSocket(server);
