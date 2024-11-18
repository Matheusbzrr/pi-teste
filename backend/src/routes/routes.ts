import { Application } from "express"; 
import ClienteRoutes from "./cliente.routes";
import ServicoRoutes from "./servico.routes";
import CategoriaRoutes from "./categoria.routes";


// Concetrador de rotas

export default class Routs{
    constructor(app: Application){
        app.use("/salaosenac", ClienteRoutes);
        app.use("/salaosenac", ServicoRoutes);
        app.use("/salaosenac", CategoriaRoutes);
        
       
    }
}