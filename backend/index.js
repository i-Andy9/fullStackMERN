import  Express, { json } from "express";
import conectDB from "./Config/db.js";
import dotenv from 'dotenv'
import routerVeterinarios from "./Routes/VeterinarioRoutes.js";

const server =  Express();
server.use(json())

dotenv.config();

conectDB();

server.use('/api/veterinarios',routerVeterinarios);

const PORT = process.env.PORT || 4000

server.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
});