
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, OneToMany, ManyToOne } from 'typeorm';
import EmployerEntity from './employer.entity';

@Entity()
export default class ProjectEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @ManyToOne(type => EmployerEntity, employer => employer.projects)
  employees: EmployerEntity;
}