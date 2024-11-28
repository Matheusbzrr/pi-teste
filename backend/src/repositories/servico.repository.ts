import { AppDataSource } from "../db/data-source";
import { Servico } from "../models/servico";



class ServicoRepository {
    servicoRepository = AppDataSource.getRepository(Servico);

    // para criar um novo. utilizar a rota na area de funcionario
    async criar(servico: Servico): Promise<Servico> {
        try {
            await this.servicoRepository.save(servico);  // Salvando o serviço no repositório
            return servico;
        } catch (err) {
            throw new Error("Falha ao criar o Serviço: " + err);
        }
    }

    async buscarAll(): Promise<Servico[]> {
        try {
            return await this.servicoRepository.find({relations: ['servico']}); // Adicionei await para garantir que a operação seja concluída
        } catch (error) {
            throw new Error("Falha ao retornar os Servicos!");
        }
    }

    async buscarById(servicoId: number): Promise<Servico | null> {
        try {
            const Servico = await this.servicoRepository.findOneBy({
                idServico: servicoId,
            });
            return Servico || null; // Retorna null se o Servico não for encontrado
        } catch (error) {
            throw new Error("Falha ao buscar o Servico por ID!");
        }
    }

    async buscarPorNome(nome: string): Promise<Servico | null> {
        try {
            const Servico = await this.servicoRepository.findOneBy({
                nome: nome
            });
            return Servico || null; // Retorna null se o Servico não for encontrado
        } catch (error) {
            throw new Error("Falha ao buscar o Servico por nome!");
        }
    }


    async update(idServico: number, dadosAtualizados: Partial<Servico>): Promise<Servico> {
        try {

            const servicoExistente = await this.servicoRepository.findOneBy({
                idServico: idServico,
            });

            if (!servicoExistente) {
                throw new Error("servico não encontrada!");
            }

            const servicoAtualizada = { ...servicoExistente, ...dadosAtualizados}
            await this.servicoRepository.save(servicoAtualizada);
            return servicoAtualizada; 

        } catch (error) {
            throw new Error("Falha ao atualizar o servico!");
        }
    }

    async delete(servicoId: number): Promise<number> {
        try {
            const ServicoEncontrado = await this.servicoRepository.findOneBy({
                idServico: servicoId,
            });
            if (ServicoEncontrado) {
                await this.servicoRepository.remove(ServicoEncontrado); // Adicionei await para garantir que a operação seja concluída
                return 1; // Servico deletado com sucesso
            }
            return 0; // Servico não encontrado
        } catch (error) {
            throw new Error("Falha ao deletar o Servico!");
        }
    }

    async deleteAll(): Promise<number> {
        try {
            
            const result = await this.servicoRepository.query("select count(idServico) as total from Servico;");
            await this.servicoRepository.query("delete from Servico;"); 
            const num = result[0]?.total || 0; 
            return num;
        } catch (error) {
            throw new Error("Falha ao deletar todos os Servicos!");
        }
    }

}

export default new ServicoRepository();
