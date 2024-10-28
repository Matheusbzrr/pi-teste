import { Entity, PrimaryColumn, ManyToOne } from 'typeorm';
import { Servico } from './servico';
import { Agendamento } from './agendamento';

@Entity({ name: 'servico_agendamento' })
export class ServicoAgendamento {
    @PrimaryColumn()
    servico_idServico: number;

    @PrimaryColumn()
    Agendamento_idAgendamento: number;

    @ManyToOne(() => Servico, servico => servico.servicoAgendamentos)
    servico!: Servico;

    @ManyToOne(() => Agendamento, agendamento => agendamento.servicoAgendamentos)
    agendamento!: Agendamento;

    constructor(servicoId: number, agendamentoId: number) {
        this.servico_idServico = servicoId;
        this.Agendamento_idAgendamento = agendamentoId;
    }
}
