import { Router } from "express";
import CategoriaController from "../controllers/categoria.controller";

class CategoriaRoutes {
  router = Router();
  controller = new CategoriaController();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    // Criar um novo categoria
    this.router.post("/categoria", this.controller.create);

    // Retornar todos os categorias já cadastrados
    this.router.get("/categorias", this.controller.findAll);

    // Retorna um categoria específico pelo seu id
    this.router.get("/categoria/nome", this.controller.findByNome);

    // Atualizar um categoria pelo seu id
    this.router.put("/categoria/:id", this.controller.update);

    // Deleta um categoria pelo seu id
    this.router.delete("/categoria/:id", this.controller.delete);

    // Deleta todos os categorias
    //this.router.delete("/servicos", this.controller.deleteAll);
  }
}

export default new CategoriaRoutes().router;
