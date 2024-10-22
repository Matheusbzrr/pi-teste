import "reflect-metadata"
import { DataSource } from "typeorm"
import { config, dialect } from "../config/db.config"
import { Cliente } from "../models/cliente"
import { Agendamento } from "../models/agendamento"
import { ServicoAgendamento } from "../models/servicoAgendamento"
import { Servico } from "../models/servico"
import { Categoria } from "../models/categoria"
import { CategoriaFuncionario } from "../models/categoriaFuncionario"
import { Funcionario } from "../models/funcionario"

export const AppDataSource = new DataSource({
    type: dialect,
    host: config.HOST,
    port: config.PORT,
    username: config.USER,
    password: config.PASSWORD,
    database: config.DB,
    entities: [Cliente, Agendamento,ServicoAgendamento, Servico, Categoria, CategoriaFuncionario, Funcionario],
    synchronize: false,
    logging: false,
})