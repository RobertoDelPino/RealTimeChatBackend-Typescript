import express from 'express'
import {generationRouter} from './Generation/infrastructure/router/generationRouter'
import {pokemonRouter} from "./Pokemon/infrastructure/routes/PokemonRoutes";

const app = express()
app.use(express.json())

const PORT = 3000

app.use("/api/generation", generationRouter)
app.use("/api/pokemon", pokemonRouter)

export const server = app.listen(PORT, () => {
    console.log(`Sever running on Port ${PORT}`)
})