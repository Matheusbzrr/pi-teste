import { Request,Response } from "express";
import { Funcionario } from "../models/funcionario";
import funcionarioRepositoy from "../repositories/funcionario.repositoy";


export default class FuncionarioController{
    async create(req: Request, res: Response) {
        const { nome, cpf, sexo, email} = req.body;
        if(!nome || !cpf || !sexo || !email){
            res.status(404).send({ message: "Dados invalidos"});
            return;
        }

        try{
            const cpfExiste = await funcionarioRepositoy.buscarByCpf(cpf);
            const emailExiste = await funcionarioRepositoy.buscarByEmail(email);

            if (cpfExiste || emailExiste){
                res.status(404).send({ message: "Não foi possível realizar o cadstro. Verifique as informações e tente novamente"});
                return;
            }
            const funcionario: Funcionario = req.body;
            const salvarFuncionario = await funcionarioRepositoy.criar(funcionario);
            res.status(201).send(salvarFuncionario);

        } catch{
            res.status(500).send({ message: "Erro ao realizar o cadastro"});
        }
    }


    async findAll(req: Request, res: Response) { // apagar request pq n ta sendo chamado 
        try{
            const funcionarios = await funcionarioRepositoy.buscarAll();
            res.status(200).send(funcionarios);
        } catch{
            res.status(500).send({ message: "Erro ao buscar os funcionarios"});
        }
    }

    async findOne(req: Request, res: Response){
        const id: number = parseInt(req.body.id);

        try{
            const funcionario = funcionarioRepositoy.buscarById(id);
            if(funcionario){
                res.status(200).send(funcionario);
            } else{
                res.status(404).send({ message: `Funcionario não encontrado com id=${id}`});
            }
        } catch (err){
            res.status(500).send({ message: "Erro ao buscar o funcionario"});
        }
    }

    async findByCpf(req: Request, res: Response){
        const cpf = req.body.cpf;
    }

}



