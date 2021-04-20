
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, JoinTable, JoinColumn, OneToOne } from 'typeorm';
import CommentEntity from './comment.entity';
import ProjectEntity from './project.entity';

@Entity()
export default class EmployerEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @OneToMany(type => ProjectEntity, project => project.name)
  projects: ProjectEntity[];

}