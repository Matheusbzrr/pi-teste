use salaosenac;

delimiter $$

create procedure ObterAgendamentosRecentes()
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
        f.nome as nomefuncionario,
        group_concat(s.nome separator ', ') as servicosassociados
    from agendamento a
    inner join cliente c on a.clienteidcliente = c.idcliente
    inner join funcionario f on a.funcionarioidfuncionario = f.idfuncionario
    left join agendamento_servicos_servico ass on a.idagendamento = ass.agendamentoidagendamento
    left join servico s on ass.servicoidservico = s.idservico
    group by a.idagendamento, a.data, a.horario, a.valortotal, c.idcliente, c.nome, c.email, c.telefone, f.idfuncionario, f.nome
    order by a.data desc, a.horario desc
    limit 5;
end $$

delimiter ;
