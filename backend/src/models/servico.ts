import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Categoria } from './categoria';
import { ServicoAgendamento } from './servicoAgendamento';

@Entity({ name: 'servico' })
export class Servico {
    @PrimaryGeneratedColumn({ type: 'int' })
    idServico!: number;

    @Column({ length: 100 })
    nome: string;

    @Column({ type: 'decimal', precision: 6, scale: 2 })
    valor: number;

    @Column({ length: 45, nullable: true })
    descricao?: string;

    @ManyToOne(() => Categoria, categoria => categoria.servicos)
    @JoinColumn({ name: 'categoria_idcategoria' }) // Especifica a coluna de junção
    categoria!: Categoria;

    @OneToMany(() => ServicoAgendamento, servicoAgendamento => servicoAgendamento.servico)
    servicoAgendamentos!: ServicoAgendamento[];

    constructor(nome: string, valor: number, categoria: Categoria, descricao?: string) {  
        this.nome = nome;
        this.valor = valor;
        this.categoria = categoria;
        this.descricao = descricao;  
    }
}
