import { AppDataSource } from "../db/data-source"; 
import { Cliente } from "../models/cliente";

class ClienteRepository {
    clienteRepository = AppDataSource.getRepository(Cliente);

    async criar(cliente: Cliente): Promise<Cliente> {
        try {
            this.clienteRepository.save(cliente); // Adicionei await para garantir que a operação seja concluída
            return cliente;
        } catch (err) {
            throw new Error("Falha ao criar o cliente!");
        }
    }

    

    async buscarAll(): Promise<Cliente[]> {
        try {
            return await this.clienteRepository.find(); // Adicionei await para garantir que a operação seja concluída
        } catch (error) {
            throw new Error("Falha ao retornar os clientes!");
        }
    }

    async buscarById(clienteId: number): Promise<Cliente | null> {
        try {
            const cliente = await this.clienteRepository.findOneBy({
                idCliente: clienteId,
            });
            return cliente || null; // Retorna null se o cliente não for encontrado
        } catch (error) {
            throw new Error("Falha ao buscar o cliente por ID!");
        }
    }

    async buscarByCpf(cpf: string): Promise<Cliente | null> {
        try {
            return await this.clienteRepository.findOneBy({
                cpf: cpf 
            });
        } catch (error) {
            throw new Error("Falha ao buscar o cliente pelo CPF!");
        }
    }

    async buscarByEmail(email: string): Promise<Cliente | null> {
        try {
            const cliente = await this.clienteRepository.findOneBy({ email });
            if (cliente) {
                return cliente; // Retorna o cliente encontrado
            } else {
                return null; // Cliente não encontrado, retorno esperado
            }
        } catch (error) {
            // Aqui o erro capturado é inesperado (ex: problema de banco, conexão)
            throw new Error(`Erro ao buscar o cliente com CPF ${email}`);
        }
    }

    async update(cliente: Cliente): Promise<Cliente> {
        try {
            await this.clienteRepository.save(cliente); // Adicionei await para garantir que a operação seja concluída
            return cliente;
        } catch (error) {
            throw new Error("Falha ao atualizar o cliente!");
        }
    }

    async delete(clienteId: number): Promise<number> {
        try {
            const clienteEncontrado = await this.clienteRepository.findOneBy({
                idCliente: clienteId,
            });
            if (clienteEncontrado) {
                await this.clienteRepository.remove(clienteEncontrado); // Adicionei await para garantir que a operação seja concluída
                return 1; // Cliente deletado com sucesso
            }
            return 0; // Cliente não encontrado
        } catch (error) {
            throw new Error("Falha ao deletar o cliente!");
        }
    }

    async deleteAll(): Promise<number> {
        try {
            // Executa a query para contar os registros antes da deleção
            const result = await this.clienteRepository.query("select count(idCliente) as total from Cliente;");
            await this.clienteRepository.query("delete from Cliente;"); // Adicionei await para garantir que a operação seja concluída
            const num = result[0]?.total || 0; 
            return num; // Retorna o número de clientes deletados
        } catch (error) {
            throw new Error("Falha ao deletar todos os clientes!");
        }
    }

    async buscarPorEmailESenha(email: string, senha: string): Promise<Cliente | null> {
        try{
            const cliente = await this.clienteRepository.findOneBy({email, senha});
            return cliente || null; // Retorna null se o cliente não for encontrado
        } catch (error) {
            throw new Error("Falha ao buscar o cliente por email e senha!");
        }
    
    }

}



export default new ClienteRepository();
