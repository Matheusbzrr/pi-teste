USE salaosenac;

DELIMITER //

CREATE PROCEDURE criarAgendamento(
    IN p_clienteId INT,
    IN p_data DATE,
    IN p_horario TIME,
    IN p_valorTotal DECIMAL(10, 2),
    IN p_funcionarioId INT,
    IN p_servicoIds JSON
)
BEGIN
    DECLARE last_insert_id INT;
    DECLARE i INT DEFAULT 0;
    DECLARE servicoId INT;
    DECLARE servicoCount INT;

    -- Inserir o agendamento na tabela Agendamento
    INSERT INTO Agendamento (clienteId, data, horario, valorTotal, funcionarioId)
    VALUES (p_clienteId, p_data, p_horario, p_valorTotal, p_funcionarioId);

    -- Obter o ID do agendamento recém-inserido
    SET last_insert_id = LAST_INSERT_ID();

    -- Obter a quantidade de serviços
    SET servicoCount = JSON_LENGTH(p_servicoIds);

    -- Inserir os serviços na tabela de junção Agendamento_Servico
    WHILE i < servicoCount DO
        SET servicoId = JSON_UNQUOTE(JSON_EXTRACT(p_servicoIds, CONCAT('$[', i, ']')));
        INSERT INTO Agendamento_Servico (agendamentoId, servicoId)
        VALUES (last_insert_id, servicoId);
        SET i = i + 1;
    END WHILE;
END //

DELIMITER ;