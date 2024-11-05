import { Router } from "express";
import ServicoController from "../controllers/servico.controller";

class ServicoRoutes {
  router = Router();
  controller = new ServicoController();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    // Criar um novo serviço
    this.router.post("/servico", this.controller.criar);

    // Retornar todos os serviços já cadastrados
    this.router.get("/servicos", this.controller.findAll);

    // Retorna um serviço específico pelo seu id
    this.router.get("/servico/:id", this.controller.findOne);

    // Atualizar um serviço pelo seu id
    this.router.put("/servico/:id", this.controller.update);

    // Deleta um serviço pelo seu id
    this.router.delete("/servico/:id", this.controller.delete);

    // Deleta todos os serviços
    this.router.delete("/servicos", this.controller.deleteAll);
  }
}

export default new ServicoRoutes().router;
