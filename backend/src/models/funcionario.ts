import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Agendamento } from './agendamento';
import { CategoriaFuncionario } from './categoriaFuncionario';

@Entity({ name: 'Funcionario' })
export class Funcionario {
    @PrimaryGeneratedColumn({ type: 'int' })
    idFuncionario!: number;

    @Column({ length: 245 })
    nome: string;

    @Column({ length: 45, unique: true })
    cpf: string;

    @Column({ type: 'tinyint' })
    sexo: number;

    @Column({ length: 45, unique: true })
    email: string;

    @Column({ length: 45 })
    senha: string;

    @OneToMany(() => Agendamento, agendamento => agendamento.funcionario)
    agendamentos!: Agendamento[];

    @OneToMany(() => CategoriaFuncionario, categoriaFuncionario => categoriaFuncionario.funcionario)
    categoriasFuncionario!: CategoriaFuncionario[];

    constructor(
        nome: string,
        cpf: string,
        sexo: number,
        email: string,
        senha: string,
    ) {
        this.nome = nome;
        this.cpf = cpf;
        this.sexo = sexo;
        this.email = email;
        this.senha = senha;
    }
}
