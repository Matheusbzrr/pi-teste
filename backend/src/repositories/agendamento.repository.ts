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

    async update(idAgendamento: number, dadosAtualizados: Partial<Agendamento>): Promise<Agendamento> {
      try {

          const agendamentoExistente = await this.agendamentoRepository.findOneBy({
              idAgendamento: idAgendamento,
          });

          if (!agendamentoExistente) {
              throw new Error("Categoria não encontrada!");
          }

          const agendamentoAtualizado = { ...agendamentoExistente, ...dadosAtualizados}
          await this.agendamentoRepository.save(agendamentoAtualizado);
          return agendamentoAtualizado; 

        } catch (error) {
          throw new Error("Falha ao atualizar o Categoria!");
        }
    }

    async buscarAll(): Promise<Agendamento[]> {
        try{
            return await this.agendamentoRepository.find();
        } catch(err){
            throw new Error('Erro ao listar funcionarios: ');
        }
    }

        async delete(idAgendamento: number): Promise<number> {
        try {
            const agendamentoEncontrado = await this.agendamentoRepository.findOneBy({
                idAgendamento: idAgendamento,
            });
            if (agendamentoEncontrado) {
                await this.agendamentoRepository.remove(agendamentoEncontrado); 
                return 1; 
            }
            return 0; 
        } catch (error) {
            throw new Error("Falha ao deletar o Categoria!");
        }
    }
  
}
  
  export default new AgendamentoRepository();
  