import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Funcionario } from './funcionario';
import { Cliente } from './cliente';
import { ServicoAgendamento } from './servicoAgendamento';

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

    @OneToMany(() => ServicoAgendamento, servicoAgendamento => servicoAgendamento.agendamento)
    servicoAgendamentos!: ServicoAgendamento[];

    constructor(
        funcionario: Funcionario,
        cliente: Cliente,
        data: Date,
        horario: string,
    ) {
        this.funcionario = funcionario;
        this.cliente = cliente;
        this.data = data;
        this.horario = horario;
    }
}
