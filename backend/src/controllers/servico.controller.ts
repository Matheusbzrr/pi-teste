import { Request, Response } from "express";
import { Servico } from "../models/servico";
import { Categoria } from "../models/categoria";
import { AppDataSource } from "../db/data-source";



export default class ServicoController {
    async create(req: Request, res: Response) {
    
        const { nome, descricao, valor, categoriaId } = req.body;
        if (!nome || !valor || !categoriaId) {
            res.status(400).send({
                message: "O nome do serviço e o seu valor são obrigatórios!"
            });
            return;
        }
        try {
            // Verifica se a categoria existe
            const categoria = await AppDataSource.getRepository(Categoria).findOneBy({
                idCategoria: categoriaId,
            });

            if (!categoria) {
                return res.status(404).send({
                    message: "Categoria não encontrada!"
                });
            }

            // Criação do serviço
            const servico = new Servico(nome, valor, categoria, descricao);

            // Salvando o serviço
            const servicoRepository = AppDataSource.getRepository(Servico);
            await servicoRepository.save(servico);

            return res.status(201).send(servico); // Serviço criado com sucesso
        } catch (error) {
            return res.status(500).send({
                message: "Falha ao criar o serviço",
                error: error.message
            });
        }
    
    }

}