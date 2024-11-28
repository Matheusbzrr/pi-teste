delimiter $$

create procedure ObterAgendamentosPorCliente(in p_idCliente INT)
    begin
        select 
            a.idAgendamento,
            a.data,
            a.horario,
            a.valorTotal,
            c.idCliente,
            c.nome as nomeCliente,
            c.email,
            c.telefone,
            f.idFuncionario,
            f.nome nomeFuncionario,
            GROUP_CONCAT(s.nome SEPARATOR ', ') as servicosAssociados
        from agendamento a
            inner join cliente c on a.clienteIdCliente = c.idCliente
            inner join funcionario f on a.funcionarioIdFuncionario = f.idFuncionario
                left join agendamento_servicos_servico ass Oon a.idAgendamento = ass.agendamentoIdAgendamento
                left join servico s on ass.servicoIdServico = s.idServico
        where c.idCliente = p_idCliente
            group by a.idAgendamento
                order by a.data desc, a.horario desc;
    end$$

delimiter ;
