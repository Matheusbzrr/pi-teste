import { Request, Response } from 'express';
import { AppDataSource } from '../db/data-source';
import { Agendamento } from '../models/agendamento';
import agendamentoRepository from '../repositories/agendamento.repository';

export default class AgendamentoController {


  // Criar novo agendamento
  async criarAgendamento(req: Request, res: Response){
    try {
      const { idCliente, data, horario, valorTotal, idFuncionario, servicoIds } = req.body;

      const resultado = await agendamentoRepository.chamarAgendamentoProcedure(
        idCliente,
        new Date(data),
        horario,
        valorTotal,
        idFuncionario,
        servicoIds
      );

      res.status(201).json({ mensagem: 'Agendamento criado com sucesso', resultado });
      return;
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ mensagem: 'Erro ao criar agendamento', erro });
      return ;
    }
  }
}

      // Obter todos os agendamentos
     /* async listarAgendamentos(req: Request, res: Response): Promise<Response> {
        try {
          const agendamentos = await agendamentoRepository.find();
          return res.status(200).json(agendamentos);
        } catch (erro) {
          console.error(erro);
          return res.status(500).json({ mensagem: 'Erro ao listar agendamentos', erro });
        }
      }*/
