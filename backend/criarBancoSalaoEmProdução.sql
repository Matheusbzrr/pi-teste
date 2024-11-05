-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema salaosenac
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema salaosenac
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `salaosenac` DEFAULT CHARACTER SET utf8 ;
USE `salaosenac` ;

-- -----------------------------------------------------
-- Table `salaosenac`.`Cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `salaosenac`.`Cliente` (
  `idCliente` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(245) NOT NULL,
  `data_nasc` DATE NOT NULL,
  `cpf` VARCHAR(20) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `sexo` VARCHAR(50) NOT NULL,
  `telefone` VARCHAR(45) NOT NULL,
  `senha` VARCHAR(250) NOT NULL,
  `matricula` VARCHAR(45) NULL,
  PRIMARY KEY (`idCliente`),
  UNIQUE INDEX `cpf_UNIQUE` (`cpf` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `salaosenac`.`Funcionario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `salaosenac`.`Funcionario` (
  `idFuncionario` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(245) NOT NULL,
  `cpf` VARCHAR(45) NOT NULL,
  `sexo` TINYINT NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `senha` VARCHAR(45) NOT NULL,
  `categoria_idcategoria` INT NOT NULL,
  PRIMARY KEY (`idFuncionario`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `salaosenac`.`Agendamento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `salaosenac`.`Agendamento` (
  `idAgendamento` INT NOT NULL AUTO_INCREMENT,
  `Funcionario_idFuncionario1` INT NOT NULL,
  `Cliente_idCliente1` INT NOT NULL,
  `data` DATE NOT NULL,
  `horario` TIME NOT NULL,
  PRIMARY KEY (`idAgendamento`),
  INDEX `fk_Agendamento_Funcionario1_idx` (`Funcionario_idFuncionario1` ASC) VISIBLE,
  INDEX `fk_Agendamento_Cliente1_idx` (`Cliente_idCliente1` ASC) VISIBLE,
  CONSTRAINT `fk_Agendamento_Funcionario1`
    FOREIGN KEY (`Funcionario_idFuncionario1`)
    REFERENCES `salaosenac`.`Funcionario` (`idFuncionario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Agendamento_Cliente1`
    FOREIGN KEY (`Cliente_idCliente1`)
    REFERENCES `salaosenac`.`Cliente` (`idCliente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `salaosenac`.`Telefone`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `salaosenac`.`Telefone` (
  `Cliente_idCliente` INT NOT NULL,
  `numero` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`Cliente_idCliente`),
  CONSTRAINT `fk_Telefone_Cliente1`
    FOREIGN KEY (`Cliente_idCliente`)
    REFERENCES `salaosenac`.`Cliente` (`idCliente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `salaosenac`.`categoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `salaosenac`.`categoria` (
  `idcategoria` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(60) NOT NULL,
  `descricao` VARCHAR(100) NULL,
  PRIMARY KEY (`idcategoria`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `salaosenac`.`servico`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `salaosenac`.`servico` (
  `idServico` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NOT NULL,
  `valor` DECIMAL(6,2) NOT NULL,
  `descricao` VARCHAR(45) NULL,
  `categoria_idcategoria` INT NOT NULL,
  INDEX `fk_servico_categoria1_idx` (`categoria_idcategoria` ASC) VISIBLE,
  PRIMARY KEY (`idServico`),
  CONSTRAINT `fk_servico_categoria1`
    FOREIGN KEY (`categoria_idcategoria`)
    REFERENCES `salaosenac`.`categoria` (`idcategoria`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `salaosenac`.`categoria_funcionario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `salaosenac`.`categoria_funcionario` (
  `categoria_idcategoria` INT NOT NULL,
  `Funcionario_idFuncionario` INT NOT NULL,
  INDEX `fk_categoria_funcionario_categoria1_idx` (`categoria_idcategoria` ASC) VISIBLE,
  INDEX `fk_categoria_funcionario_Funcionario1_idx` (`Funcionario_idFuncionario` ASC) VISIBLE,
  PRIMARY KEY (`categoria_idcategoria`, `Funcionario_idFuncionario`),
  CONSTRAINT `fk_categoria_funcionario_categoria1`
    FOREIGN KEY (`categoria_idcategoria`)
    REFERENCES `salaosenac`.`categoria` (`idcategoria`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_categoria_funcionario_Funcionario1`
    FOREIGN KEY (`Funcionario_idFuncionario`)
    REFERENCES `salaosenac`.`Funcionario` (`idFuncionario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `salaosenac`.`servico_agendamento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `salaosenac`.`servico_agendamento` (
  `servico_idServico` INT NOT NULL,
  `Agendamento_idAgendamento` INT NOT NULL,
  INDEX `fk_servico_agendamento_servico1_idx` (`servico_idServico` ASC) VISIBLE,
  INDEX `fk_servico_agendamento_Agendamento1_idx` (`Agendamento_idAgendamento` ASC) VISIBLE,
  PRIMARY KEY (`servico_idServico`, `Agendamento_idAgendamento`),
  CONSTRAINT `fk_servico_agendamento_servico1`
    FOREIGN KEY (`servico_idServico`)
    REFERENCES `salaosenac`.`servico` (`idServico`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_servico_agendamento_Agendamento1`
    FOREIGN KEY (`Agendamento_idAgendamento`)
    REFERENCES `salaosenac`.`Agendamento` (`idAgendamento`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
