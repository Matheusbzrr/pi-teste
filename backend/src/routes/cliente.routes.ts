import { Router } from "express";
import ClienteController from "../controllers/cliente.controller";

class ClienteRoutes {
  router = Router();
  controller = new ClienteController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {

    // Criar um novo cliente.
    this.router.post("/cliente", this.controller.create);

    this.router.post("/login", this.controller.login);

    // Retornar todos os clientes já cadastrados.
    this.router.get("/clientes", this.controller.findAll);

    // Retorna um cliente específico pelo seu id
    this.router.get("/cliente/:id", this.controller.findOne);

    // Retorna um cliente específico pelo seu CPF
    this.router.get("/cliente/cpf/:cpf", this.controller.findByCpf);

    // Atualizar um cliente pelo seu id
    this.router.put("/cliente/:id", this.controller.update);

    // Deleta um cliente pelo seu id
    this.router.delete("/cliente/:id", this.controller.delete);

    // Deleta todos os clientes
    this.router.delete("/clientes", this.controller.deleteAll);
  }
}

export default new ClienteRoutes().router;
