import mongoose from "mongoose";

async function connectToDB(){
    try {

        const mongoUri = process.env.MONGO_URI;
        if(!mongoUri){
            throw new Error("Mongo URI not found");
        }

        const connection = await mongoose.connect(mongoUri);

        const url = `${connection.connection.host}:${connection.connection.port}`
        console.log(`MongoDB Conectado en: ${url}`)
    } catch (error: any) {
        console.log(`error: ${error.message}`);
        process.exit(1);
    }
}

export default connectToDB;