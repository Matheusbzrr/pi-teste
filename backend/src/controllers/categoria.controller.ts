import { Request, Response } from "express";
import { Categoria } from "../models/categoria";
import categoriaRepository from "../repositories/categoria.repository";

export default class CategoriaController{

    async create(req: Request, res: Response){
        const { nome, descricao } = req.body;
        try{
            if (!nome) {
                res.status(400).send({
                    message: "É obrigatorio preencher o nome da categoria!"
                });
                return;
            }

            if (!nome || typeof nome !== 'string' ) {
                res.status(400).send({
                    message: "Nome inválido"
                });
                return;
            }
            
        
            const categoria = new Categoria(nome, descricao);
            await categoriaRepository.criar(categoria);
            res.status(201).json(categoria);
            return;
        } catch (err) {
            res.status(500).send({
                message: "Erro ao tentar criar uma nova categoria"
            });
        }

        
    }

    async findAll(req: Request, res: Response){
        try{
            const categorias = await categoriaRepository.buscarAll();
            res.json(categorias);
        } catch (err) {
            res.status(500).send({
                message: "Erro ao tentar listar todas categorias"
            });
        }
    }




}