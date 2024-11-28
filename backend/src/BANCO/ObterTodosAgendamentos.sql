use salaosenac;



delimiter $$

 create procedure ObterTodosAgendamentos()
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
        f.nome as nomeFuncionario,
        GROUP_CONCAT(s.nome SEPARATOR ', ') as servicosAssociados
    from agendamento a
    inner join cliente c on a.clienteIdCliente = c.idCliente
    inner join funcionario f on a.funcionarioIdFuncionario = f.idFuncionario
    left join servico s on ass.servicoIdServico = s.idServico
    left join agendamento_servicos_servico ass on a.idAgendamento = ass.agendamentoIdAgendamento
    group by a.idAgendamento
    order by a.data desc, a.horario desc;
    
end$$

delimiter ;
