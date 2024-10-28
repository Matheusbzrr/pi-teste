import { Application } from "express"; 
import ClienteRoutes from "./cliente.routes";


// Concetrador de rotas

export default class Routs{
    constructor(app: Application){
        app.use("/salaosenac", ClienteRoutes);
       
    }
}