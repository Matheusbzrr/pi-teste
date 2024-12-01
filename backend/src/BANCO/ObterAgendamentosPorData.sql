use salaosenac;

delimiter $$

create procedure ObterAgendamentosPorData(dataFiltro date)
begin
    select 
        a.idagendamento,
        a.data,
        a.horario,
        a.valortotal,
        c.idcliente,
        c.nome as nomecliente,
        c.email,
        c.telefone,
        f.idfuncionario,
        coalesce(f.nome, 'profissional não selecionado') as nomefuncionario,
        group_concat(s.nome separator ', ') as servicosassociados
    from agendamento a
    inner join cliente c on a.clienteidcliente = c.idcliente
    left join funcionario f on a.funcionarioidfuncionario = f.idfuncionario
    left join agendamento_servicos_servico ass on a.idagendamento = ass.agendamentoidagendamento
    left join servico s on ass.servicoidservico = s.idservico
	where a.data = dataFiltro
    group by a.idagendamento, a.data, a.horario, a.valortotal, c.idcliente, c.nome, c.email, c.telefone, f.idfuncionario, f.nome
    order by a.data, a.horario
    limit 6;
end $$

delimiter ;

call ObterAgendamentosPorData('2024-12-01');