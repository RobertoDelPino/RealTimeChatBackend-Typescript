import express from 'express'
import routes from './Users/Infraestructure/routes';
import connectToDB from './Users/Infraestructure/Repositories/MongoDB/Connections/connectToDB';
import dotenv from 'dotenv';

const app = express()

// Configure express to only allow api calls from the client
app.use(express.json())
app.use(routes);

dotenv.config();

connectToDB();


const PORT = process.env.PORT;

export const server = app.listen(PORT, () => {
    console.log(`Sever running on Port ${PORT}`)
})
