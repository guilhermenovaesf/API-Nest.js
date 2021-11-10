import { Course } from './course.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tags')
export class TagEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Course, (course: Course) => course.tags) //O primeiro parâmetro é sempre o alvo, já o segundo a pergunta a ser feita é de que forma eu pego os parâmtros dessa entitade inversa?
  courses: Course[];
}
