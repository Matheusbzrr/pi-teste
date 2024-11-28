import { Request, Response } from 'express';
import agendamentoRepository from '../repositories/agendamento.repository';

export default class AgendamentoController {

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

  async findAll(req: Request, res: Response) {
    try{
        const agendamentos = await agendamentoRepository.findAll();
        res.status(200).send(agendamentos);
    } catch{
        res.status(500).send({ message: "Erro ao buscar os agendamentos"});
    }
  }

  async buscarTodosComPrc(req: Request, res: Response) {
    try{
        const agendamentos = await agendamentoRepository.buscarTodosComProcedure();
        res.status(200).send(agendamentos);
    } catch{
        res.status(500).send({ message: "Erro ao buscar todos os agendamentos"});
    }
  }

  async buscarPorIdClienteComPrc(req: Request, res: Response) {
    try{
      const idCliente = parseInt(req.params.id);
      const agendamentos = await agendamentoRepository.buscarPorIdClienteComProcedure(idCliente);

      res.status(200).send(agendamentos);
      return;

    } catch{
      res.status(500).send({ message: "Erro ao buscar agendamentos por id do cliente"});
    }
    
  }



  async update(req: Request, res: Response) {
    const idAgendamento = parseInt(req.params.id); 
    const dadosAtualizados = req.body;

    try {
        const agendamentoAtualizado = await agendamentoRepository.update(idAgendamento, dadosAtualizados);
        res.send({
            message: `Agendamento ${agendamentoAtualizado.idAgendamento} atualizado com sucesso!`
        });
        } catch (err) {
          res.status(500).send({
            message: `Erro ao atualizar o agendamento com id=${idAgendamento}.`
          });
        }
  } 



  async delete(req: Request, res: Response){
    const id = parseInt(req.params.id);
    
    try{
        if (!id) {
            res.status(400).send({
                message: "É obrigatorio preencher o id do agendamento!"
            });
            return;
        }

        const num = await agendamentoRepository.delete(id);
        if(num ===1){
            res.send({message: "Agendamento deletado com sucesso!"});
        } else{
            res.send({message: "Nenhum agendamento encontrado com esse id!"});
        }
        
    }catch(err){
        res.status(500).send({
            message: "Erro ao tentar deletar o agendamento"
        });
    }
  }
}

