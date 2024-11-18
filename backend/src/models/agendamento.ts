import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Funcionario } from './funcionario';
import { Cliente } from './cliente';
import { Servico } from './servico';


@Entity({ name: 'Agendamento' })
export class Agendamento {
    @PrimaryGeneratedColumn({ type: 'int' })
    idAgendamento!: number;

    @ManyToOne(() => Funcionario, funcionario => funcionario.agendamentos)
    funcionario: Funcionario;

    @ManyToOne(() => Cliente, cliente => cliente.agendamentos)
    cliente: Cliente;

    @Column({ type: 'date' })
    data: Date;

    @Column({ type: 'time' })
    horario: string;

    @ManyToMany(() => Servico)
    @JoinTable()
    servicos?: Servico[];
 

    constructor(
        funcionario: Funcionario,
        cliente: Cliente,
        data: Date,
        horario: string,
        servicos?: Servico[]
    ) {
        this.funcionario = funcionario;
        this.cliente = cliente;
        this.data = data;
        this.horario = horario;
        this.servicos = servicos;
    }
}
