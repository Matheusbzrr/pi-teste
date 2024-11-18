import { Router } from "express";
import FuncionarioController from "../controllers/funcionario.controller";

class FuncionarioRoutes{
    router = Router();
    controller = new FuncionarioController();

    constructor(){
        this.initializeRoutes();
    }

    initializeRoutes(){
        this.router.post("/funcionario", this.controller.create);

        this.router.get("/funcionarios", this.controller.findAll);

        this.router.get("/funcionario/cpf", this.controller.findByCpf);
    }

    
}

export default new FuncionarioRoutes().router;