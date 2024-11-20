DELIMITER //

CREATE PROCEDURE criarAgendamento(
    IN p_idCliente INT,
    IN p_data DATE,
    IN p_horario TIME,
    IN p_valorTotal DECIMAL(10, 2),
    IN p_idFuncionario INT,
    IN p_servicoIds JSON
)
BEGIN
    DECLARE last_insert_id INT;
    DECLARE i INT DEFAULT 0;
    DECLARE idServico INT;
    DECLARE servicoCount INT;

    -- Inserir o agendamento na tabela Agendamento
    INSERT INTO Agendamento (clienteIdCliente, data, horario, valorTotal, funcionarioIdFuncionario)
    VALUES (p_idCliente, p_data, p_horario, p_valorTotal, p_idFuncionario);

    -- Obter o ID do agendamento recém-inserido
    SET last_insert_id = LAST_INSERT_ID();

    -- Obter a quantidade de serviços
    SET servicoCount = JSON_LENGTH(p_servicoIds);

    -- Inserir os serviços na tabela de junção Agendamento_Servico
    WHILE i < servicoCount DO
        SET idServico = JSON_UNQUOTE(JSON_EXTRACT(p_servicoIds, CONCAT('$[', i, ']')));
        INSERT INTO agendamento_servicos_servico (agendamentoIdAgendamento, servicoIdServico)
        VALUES (last_insert_id, idServico);
        SET i = i + 1;
    END WHILE;
END //

DELIMITER ;