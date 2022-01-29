/* eslint-disable prettier/prettier */

import { TagEntity } from './tag.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity() //por padrão, pega o nome da minha classe e tranforma para o nome da tabela, posso mudar @entity('nomeaqui')
export class Course {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  description: string;

  @JoinTable() //especifica que é o dominante
  @ManyToMany(() => TagEntity, (tag: TagEntity) => tag.courses, {
    //O primeiro parâmetro é sempre o alvo, já o segundo a pergunta a ser feita é de que forma eu pego os parâmtros dessa entitade inversa?
    cascade: true,
  })
  tags: TagEntity[];
}
