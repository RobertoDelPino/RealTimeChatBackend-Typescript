import express from 'express'

const app = express()
// Configure express to only allow api calls from the client
app.use(express.json())

// Import routes
import routes from './Users/Infraestructure/routes';
app.use(routes);

// Añadir PORT a .env
const PORT = 3000

export const server = app.listen(PORT, () => {
    console.log(`Sever running on Port ${PORT}`)
})