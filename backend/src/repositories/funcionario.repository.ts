import { AppDataSource } from "../db/data-source";
import { Funcionario } from "../models/funcionario";

class FuncionarioRepository {
    funcionarioRepository = AppDataSource.getRepository(Funcionario);

    async criar(funcionario: Funcionario): Promise<Funcionario> {
        try{
            this.funcionarioRepository.save(funcionario);
            return funcionario;
        } catch(err){
            throw new Error('Erro ao salvar funcionario: ');
        }
    }

    async buscarAll(): Promise<Funcionario[]> {
        try{
            return await this.funcionarioRepository.find();
        } catch(err){
            throw new Error('Erro ao listar funcionarios: ');
        }
    }

    async buscarById(FuncionarioId: number): Promise<Funcionario | null> {
        try{
            const funcionario = await this.funcionarioRepository.findOneBy({
                idFuncionario: FuncionarioId,
            });
            return funcionario || null;
        } catch(err){
            throw new Error('Erro ao buscar funcionario por id: ');
        }
    }

    async buscarByCpf(cpf: string): Promise<Funcionario | null> {
        try{
            const funcionario = await this.funcionarioRepository.findOneBy({
                cpf: cpf,
            });
            return funcionario || null;
        } catch(err){
            throw new Error('Erro ao buscar funcionario por cpf: ');
        }
    }

    async buscarByEmail(email: string): Promise<Funcionario | null>{
        try{
            const funcionario = await this.funcionarioRepository.findOneBy({
                email: email,
            });
            return funcionario || null;
        } catch(err){
            throw new Error('Erro ao buscar funcionario por email: ');
        }
    }

    async update(funcionario: Funcionario): Promise<Funcionario | null>{
        try{
            await this.funcionarioRepository.save(funcionario);
            return funcionario;
        } catch(err){
            throw new Error('Erro ao atualizar funcionario: ');
        }
    }

    async delete(funcionarioId: number): Promise<number>{
        try{
            const funcionarioEncontrado = await this.funcionarioRepository.findOneBy({
                idFuncionario: funcionarioId,
            });
            if(funcionarioEncontrado){
                await this.funcionarioRepository.remove(funcionarioEncontrado);
                return funcionarioId;
            }
            return 0; //cliente nao encontrado
        } catch(err){
            throw new Error('Erro ao deletar funcionario: ');
        }

    }

    async deletaAll(): Promise<number>{
        try{
            const funcionarios = await this.funcionarioRepository.find();
            if(funcionarios.length > 0){
                await this.funcionarioRepository.remove(funcionarios);
                return funcionarios.length;
            }
            return 0; //funcionarios nao encontrados
        } catch(err){
            throw new Error('Erro ao deletar todos os funcionarios: ');
        }
    }

}

export default new FuncionarioRepository();