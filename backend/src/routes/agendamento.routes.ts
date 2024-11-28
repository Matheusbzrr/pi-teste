import { Router } from "express";
import AgendamentoController from "../controllers/agendamento.controller";

class AgendamentoRoutes{
    router = Router();
    controller = new AgendamentoController;

    constructor(){
        this.initializeRoutes();
    }



    initializeRoutes(){
        // Cria um novo agendamento
        this.router.post("/agendamento", this.controller.criarAgendamento);

        // Buscar todos agendamentos
        this.router.get("/agendamentos", this.controller.findAll);

        // Atualizar um agendamento
        this.router.put("/agendamento/:id", this.controller.update);

        // Deleta um agendamento
        this.router.delete("/agendamento/:id", this.controller.delete);

        this.router.get("/agendamentos/todos", this.controller.buscarTodosComPrc);

        this.router.get("/agendamentos/cliente/:id", this.controller.buscarPorIdClienteComPrc);
    }
}

export default new AgendamentoRoutes().router;
