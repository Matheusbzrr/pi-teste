import { AppDataSource } from "../db/data-source";
import { Categoria } from "../models/categoria";

class CategoriaRepository {
    categoriaRepository = AppDataSource.getRepository(Categoria);

    

    async criar(categoria: Categoria): Promise<Categoria> {
        try {
            return await this.categoriaRepository.save(categoria);
        } catch (err) {
            console.error("Erro ao criar a categoria:", err);
            throw new Error("Falha ao criar o Categoria!");
        }
    }

    async buscarPorNome(nome: string): Promise<Categoria | null> {
        try {
            return await this.categoriaRepository.findOneBy({
                nome,
            });
        } catch (error) {
            console.error("Erro ao buscar categoria por nome:", error)
            throw new Error("Falha ao buscar o Categoria por nome!");
        }
    }


    async buscarAll(): Promise<Categoria[]> {
        try {
            return await this.categoriaRepository.find(); // Adicionei await para garantir que a operação seja concluída
        } catch (error) {
            console.error("Erro ao buscar todas as categorias:", error);
            throw new Error("Falha ao retornar os Categorias!");
        }
    }

    async buscarById(categoriaId: number): Promise<Categoria | null> {
        try {
            const categoria = await this.categoriaRepository.findOneBy({
                idCategoria: categoriaId,
            });
            return categoria || null; // Retorna null se o Categoria não for encontrado
        } catch (error) {
            throw new Error("Falha ao buscar o Categoria por ID!");
        }
    }

    

    async update(categoria: Categoria): Promise<Categoria> {
        try {
            await this.categoriaRepository.save(categoria); // Adicionei await para garantir que a operação seja concluída
            return categoria;
        } catch (error) {
            throw new Error("Falha ao atualizar o Categoria!");
        }
    }

    async delete(categoriaId: number): Promise<number> {
        try {
            const CategoriaEncontrado = await this.categoriaRepository.findOneBy({
                idCategoria: categoriaId,
            });
            if (CategoriaEncontrado) {
                await this.categoriaRepository.remove(CategoriaEncontrado); // Adicionei await para garantir que a operação seja concluída
                return 1; // Categoria deletado com sucesso
            }
            return 0; // Categoria não encontrado
        } catch (error) {
            throw new Error("Falha ao deletar o Categoria!");
        }
    }

    async deleteAll(): Promise<number> {
        try {
            // Executa a query para contar os registros antes da deleção
            const result = await this.categoriaRepository.query("select count(idCategoria) as total from Categoria;");
            await this.categoriaRepository.query("delete from Categoria;"); // Adicionei await para garantir que a operação seja concluída
            const num = result[0]?.total || 0; 
            return num; // Retorna o número de Categorias deletados
        } catch (error) {
            throw new Error("Falha ao deletar todos os Categorias!");
        }
    }

}


export default new CategoriaRepository();