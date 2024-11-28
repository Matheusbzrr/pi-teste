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
    ): Promise<JSON> {
      return this.agendamentoRepository.query(
        'CALL criarAgendamento(?, ?, ?, ?, ?, ?)',
        [idCliente, data, horario, valorTotal, idFuncionario, JSON.stringify(servicoIds)]
      );
    }

    async findAll(): Promise<Agendamento[]> {
        try{
            return await this.agendamentoRepository.find();
        } catch(err){
            throw new Error('Erro ao listar agendamentos: ');
        }
    }


    async buscarTodosComProcedure(): Promise<JSON>{
        try{
            const agendamentos = await this.agendamentoRepository.query(
                'CALL ObterTodosAgendamentos()'
            );
            return agendamentos;
        } catch{
            throw new Error('Erro ao buscar agendamentos com procedures!');
        }
        
    }

    async buscarPorIdClienteComProcedure(idCliente: number): Promise<JSON> {
        try{
            const agendamentos = await this.agendamentoRepository.query(
                'CALL ObterAgendamentosPorCliente(?)',
                [idCliente]
            );
            return agendamentos;
        } catch{
            throw new Error('Erro ao buscar agendamentos com procedures!');
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
            throw new Error("Falha ao deletar o Agendamento!");
        }
    }

    async update(idAgendamento: number, dadosAtualizados: Partial<Agendamento>): Promise<Agendamento> {
      try {

          const agendamentoExistente = await this.agendamentoRepository.findOneBy({
              idAgendamento: idAgendamento,
          });

          if (!agendamentoExistente) {
              throw new Error("Agendamento não encontrada!");
          }

          const agendamentoAtualizado = { ...agendamentoExistente, ...dadosAtualizados}
          await this.agendamentoRepository.save(agendamentoAtualizado);
          return agendamentoAtualizado; 

        } catch (error) {
          throw new Error("Falha ao atualizar o Agendamento!");
        }
    }

    
  
}
  
  export default new AgendamentoRepository();
  