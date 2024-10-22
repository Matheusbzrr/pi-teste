import { Entity, PrimaryColumn, ManyToOne } from 'typeorm';
import { Funcionario } from './funcionario';
import { Categoria } from './categoria';

@Entity({ name: 'categoria_funcionario' })
export class CategoriaFuncionario {
    @PrimaryColumn()
    categoria_idcategoria: number;

    @PrimaryColumn()
    Funcionario_idFuncionario: number;

    @ManyToOne(() => Categoria, categoria => categoria.categoriasFuncionario)
    categoria!: Categoria;

    @ManyToOne(() => Funcionario, funcionario => funcionario.categoriasFuncionario)
    funcionario!: Funcionario;

    constructor(categoriaId: number, funcionarioId: number) {
        this.categoria_idcategoria = categoriaId;
        this.Funcionario_idFuncionario = funcionarioId;
    }
}
