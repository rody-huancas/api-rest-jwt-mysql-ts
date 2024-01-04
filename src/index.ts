import dotenv from "dotenv";
import Server from "./models/server";

// configurar las variables de entorno
dotenv.config();

const server = new Server();