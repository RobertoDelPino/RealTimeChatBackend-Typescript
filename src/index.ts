import express from 'express'
import routes from './Users/Infraestructure/routes';
import connectToDB from './Users/Infraestructure/Repositories/MongoDB/connectToDB';

const app = express()

// Configure express to only allow api calls from the client
app.use(express.json())
app.use(routes);

connectToDB();


// Añadir PORT a .env
const PORT = 3000

export const server = app.listen(PORT, () => {
    console.log(`Sever running on Port ${PORT}`)
})
