import { Request,Response } from "express";
import { Funcionario } from "../models/funcionario";
import funcionarioRepository from "../repositories/funcionario.repository";
import categoriaRepository from "../repositories/categoria.repository";
categoriaRepository


export default class FuncionarioController{
    async create(req: Request, res: Response) {
        if (!req.body.funcionario) {
            return res.status(400).send({ message: 'Preencha corretamente por favor' });
        } 
    
        try{
            const funcionario = new Funcionario(
                req.body.funcionario.nome,
                req.body.funcionario.cpf,
                req.body.funcionario.sexo,
                req.body.funcionario.email,
                
            );

            funcionario.categorias = [];

            if (req.body.categorias && Array.isArray(req.body.categorias)){
                for(const categoriaId of req.body.categorias){
                    const categoria = await categoriaRepository.buscarById(categoriaId);
                    if(categoria){
                        funcionario.categorias.push(categoria);
                    } 
                }
            }

            const novoFuncionario = await funcionarioRepository.criar(funcionario);
            res.status(201).send(novoFuncionario);

        } catch (err) {
            res.status(500).send({ message: "Erro ao cadastrar o funcionario"});
        }
    }
    


    async findAll(req: Request, res: Response) { // apagar request pq n ta sendo chamado 
        try{
            const funcionarios = await funcionarioRepository.buscarAll();
            res.status(200).send(funcionarios);
        } catch{
            res.status(500).send({ message: "Erro ao buscar os funcionarios"});
        }
    }

    /*async findOne(req: Request, res: Response){
        const id: number = parseInt(req.body.id);

        try{
            const funcionario = funcionarioRepository.buscarById(id);
            if(funcionario){
                res.status(200).send(funcionario);
            } else{
                res.status(404).send({ message: `Funcionario não encontrado com id=${id}`});
            }
        } catch (err){
            res.status(500).send({ message: "Erro ao buscar o funcionario"});
        }
    }*/

    async findByCpf(req: Request, res: Response){
        const cpf = req.body.cpf;

        try{
            const funcionario = await funcionarioRepository.buscarByCpf(cpf);
            if(funcionario){
                res.status(200).send(funcionario);
            } else{
                res.status(404).send({ message: `Funcionario não encontrado com cpf=${cpf}`});
            }
        } catch (err){
            res.status(500).send({ message: "Erro ao buscar o funcionario"});
        }
    }

}



