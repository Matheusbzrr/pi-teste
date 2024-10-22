import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Servico } from './servico';
import { CategoriaFuncionario } from './categoriaFuncionario';

@Entity({ name: 'categoria' })
export class Categoria {
    @PrimaryGeneratedColumn({ type: 'int' })
    idcategoria!: number;

    @Column({ length: 60 })
    nome: string;

    @Column({ length: 100, nullable: true })
    descricao?: string;

    @OneToMany(() => Servico, servico => servico.categoria)
    servicos!: Servico[];

    @OneToMany(() => CategoriaFuncionario, categoriaFuncionario => categoriaFuncionario.categoria)
    categoriasFuncionario!: CategoriaFuncionario[];

    constructor(nome: string, descricao?: string) {
        this.nome = nome;
        this.descricao = descricao;
    }
}
