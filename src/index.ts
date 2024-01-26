import express from 'express'
import routes from './Users/Infrastructure/routes';
import connectToDB from './Users/Infrastructure/Repositories/MongoDB/Connections/connectToDB';
import dotenv from 'dotenv';

const app = express()
dotenv.config();
connectToDB();

app.use(express.json())
app.use(routes);

const PORT = process.env.PORT;

export const server = app.listen(PORT, () => {
    console.log(`Sever running on Port ${PORT}`)
})
