import { AppDataSource } from "../db/data-source";
import { Agendamento } from "../models/agendamento";

class AgendamentoRepository {
    agendamentoRepository = AppDataSource.getRepository(Agendamento)
    async chamarAgendamentoProcedure(
      idCliente: number,
      data: Date,
      horario: string,
      valorTotal: number,
      idFuncionario?: number,
      servicoIds?: number[]
    ): Promise<any> {
      return this.agendamentoRepository.query(
        'CALL criarAgendamento(?, ?, ?, ?, ?, ?)',
        [idCliente, data, horario, valorTotal, idFuncionario, JSON.stringify(servicoIds)]
      );
    }
  
  }
  
  export default new AgendamentoRepository();
  