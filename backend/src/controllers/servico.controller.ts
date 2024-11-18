import { Request, Response } from "express";
import { Servico } from "../models/servico";
import servicoRepository from "../repositories/servico.repository";
import categoriaRepository from "../repositories/categoria.repository";



export default class ServicoController {
    async create (req: Request, res: Response) {
    
        const { nome, descricao, valor, categoria_idcategoria} = req.body;
        if (!nome || !valor || !categoria_idcategoria) {
            res.status(400).send({
             message: "O nome do serviço, seu valor e a categoria são obrigatórios!"
            });
        return;
           
        }

        if (isNaN(valor) || valor <= 0) {
            res.status(400).send({
                message: "O valor do serviço deve ser um número positivo!"
            });
            return; 
        }

        try {
            
            const categoria = await categoriaRepository.buscarById(categoria_idcategoria)

            if (!categoria) {
                 res.status(404).send({
                    message: "Categoria não encontrada!"
                });
                return;
            }

            // Criação do serviço
            const servico = new Servico(nome, valor, categoria, descricao);

            // Salvando o serviço
            await servicoRepository.criar(servico);

            res.status(201).send(servico); // Serviço criado com sucesso
            return;
        } catch (error) {
            res.status(500).send({
                message: "Falha ao criar o serviço",
                error
            });
            return;
        }
    
    }

    async findAll(req: Request, res: Response) {
        try {
            const servicos = await servicoRepository.buscarAll();
        
            
            const resultado = servicos.map(servico => ({
                idServico: servico.idServico,
                nome: servico.nome,
                valor: servico.valor,
                descricao: servico.descricao,
                categoriaId: servico.categoria?.idCategoria, // mapeando para mostrar penas o ID da categoria pois meu repositorio ta devolvendo o objeto categoria completo
            }));

            res.status(200).json(resultado);

        } catch (err) {
            res.status(500).send({
                message: "Erro encontrado ao buscar todos os servicos."
            });
        }
    }

    async delete(req: Request, res: Response) {
        const id: number = parseInt(req.params.id);

        try {
            const num = await servicoRepository.delete(id);

            if (num === 1) {
                res.send({
                    message: "Cliente deletado com sucesso!"
                });
            } else {
                res.send({
                    message: `Não foi possível deletar o cliente com id=${id}. O cliente não foi encontrado.`
                });
            }
        } catch (err) {
            res.status(500).send({
                message: `O cliente com id=${id} não pode ser deletado.`
            });
        }
    }
}