import { AppDataSource } from "../db/data-source";
import { Agendamento } from "../models/agendamento";

class AgendamentoRepository {
    agendamentoRepository = AppDataSource.getRepository(Agendamento)
    async chamarAgendamentoProcedure(
      clienteId: number,
      data: Date,
      horario: string,
      valorTotal: number,
      funcionarioId?: number,
      servicoIds?: number[]
    ): Promise<any> {
      return this.agendamentoRepository.query(
        'CALL criarAgendamento(?, ?, ?, ?, ?, ?)',
        [clienteId, data, horario, valorTotal, funcionarioId, JSON.stringify(servicoIds)]
      );
    }
  
  }
  
  export default new AgendamentoRepository();
  