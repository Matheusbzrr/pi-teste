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

    @Column({ length: 50 }) //TROCAR NO BANCO DE DADOS PARA STRING
    sexo: string;

    @Column({ length: 45, unique: true })
    email: string;

    @OneToMany(() => Agendamento, agendamento => agendamento.funcionario)
    agendamentos!: Agendamento[];

    @OneToMany(() => CategoriaFuncionario, categoriaFuncionario => categoriaFuncionario.funcionario)
    categoriasFuncionario!: CategoriaFuncionario[];

    constructor(
        nome: string,
        cpf: string,
        sexo: string,
        email: string,
        
    ) {
        this.nome = nome;
        this.cpf = cpf;
        this.sexo = sexo;
        this.email = email;
        
    }
}
