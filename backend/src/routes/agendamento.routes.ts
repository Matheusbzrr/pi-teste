import { Router } from "express";
import AgendamentoController from "../controllers/agendamento.controller";

class AgendamentoRoutes{
    router = Router();
    controller = new AgendamentoController;

    constructor(){
        this.initializeRoutes();
    }



    initializeRoutes(){
        this.router.post("/agendamento", this.controller.criarAgendamento);
    }
}

export default new AgendamentoRoutes().router;
