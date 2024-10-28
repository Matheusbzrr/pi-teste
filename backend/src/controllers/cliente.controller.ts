import { Request, Response } from "express";
import { Cliente } from "../models/cliente";
import clienteRepository from "../repositories/cliente.repository";

export default class ClienteController {

    async create(req: Request, res: Response) {
    
        const { nome, cpf, email, senha } = req.body;
        if (!nome || !cpf || !email || !senha) {
            res.status(400).send({
                message: "Nome, CPF, email e senha são obrigatórios!"
            });
            return;
        }

        try {
            
            const cpfExists = await clienteRepository.buscarByCpf(cpf);
            const emailExists = await clienteRepository.buscarByEmail(email);
            if (cpfExists || emailExists) {
                res.status(409).send({
                    message: "Não foi possível realizar o cadastro. Verifique suas informações e tente novamente."
                });
                return; // para n quebrar a rota, primeiro gerar a response depois enviar o retorno
            }

            const cliente: Cliente = req.body;
            const savedCliente = await clienteRepository.criar(cliente);
            res.status(201).send(savedCliente);
        } catch (err) {
            res.status(500).send({
                message: "Erro ao tentar salvar um cliente."
            });
        }
    }


    async login(req: Request, res: Response) {
        const { email, senha } = req.body;
    
        if (!email || !senha) {
            res.status(400).send({
                message: "Email e senha são obrigatórios!"
            });
            return;
        }
    
        try {
            const cliente = await clienteRepository.buscarPorEmailESenha(email, senha);
            if (cliente) {
                res.status(200).send(cliente);
            } else {
                res.status(401).send({
                    message: "Email ou senha inválidos."
                });
            }
        } catch (err) {
            res.status(500).send({
                message: "Erro ao tentar efetuar login."
            });
        }
    }
    
    async findAll(req: Request, res: Response) {
        try {
            const clientes = await clienteRepository.buscarAll();
            res.status(200).send(clientes);
        } catch (err) {
            res.status(500).send({
                message: "Erro encontrado ao buscar todos os clientes."
            });
        }
    }

    async findOne(req: Request, res: Response) {
        const id: number = parseInt(req.params.id);

        try {
            const cliente = await clienteRepository.buscarById(id);
            if (cliente) {
                res.status(200).send(cliente);
            } else {
                res.status(404).send({
                    message: `Não foi encontrado nenhum cliente com o id=${id}.`
                });
            }
        } catch (err) {
            res.status(500).send({
                message: `Erro ao tentar buscar o cliente com id=${id}.`
            });
        }
    }

    async findByCpf(req: Request, res: Response) {
        const cpf: string = req.params.cpf;

        try {
            const cliente = await clienteRepository.buscarByCpf(cpf);
            if (cliente) {
                res.status(200).send(cliente);
            } else {
                res.status(404).send({
                    message: `Não foi encontrado nenhum cliente com o CPF=${cpf}.`
                });
            }
        } catch (err) {
            res.status(500).send({
                message: `Erro ao tentar buscar o cliente com CPF=${cpf}.`
            });
        }
    }

    async update(req: Request, res: Response) {
        let cliente: Cliente = req.body;
        cliente.idCliente = parseInt(req.params.id); // Obtém o ID da URL e o define no cliente
        try {
            await clienteRepository.update(cliente);
            res.send({
                message: `Cliente ${cliente.nome} atualizado com sucesso!`
            });
        } catch (err) {
            res.status(500).send({
                message: `Erro ao atualizar o cliente com id=${cliente.idCliente}.`
            });
        }
    }

    async delete(req: Request, res: Response) {
        const id: number = parseInt(req.params.id);

        try {
            const num = await clienteRepository.delete(id);

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

    async deleteAll(req: Request, res: Response) {
        try {
            const num = await clienteRepository.deleteAll();
            res.send({ message: `${num} clientes foram deletados com sucesso!` });
        } catch (err) {
            res.status(500).send({
                message: "Ocorreu um erro ao deletar todos os clientes."
            });
        }
    }
}
