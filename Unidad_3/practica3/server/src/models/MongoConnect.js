import mongoose from 'mongoose';
import { mongoCredentials } from '../config/mongo.credentials.js';


export const connectToMongo = async () => {
   try {
    console.log("Conectando mongo...");
    console.log(mongoCredentials.uri)
    await mongoose.connect(mongoCredentials.uri)
        .then(() => {
            console.log("Mongo conectado");
            // Iniciar el servidor
       
        })
        .catch((err) => {
            console.error("Error connecting to MongoDB:", err);
            console.log("Intentando reconectar a MongoDB en 5 segundos...");
            setTimeout(connectToMongo, 5000);
        });
   } catch (error) {
    
   }
};

