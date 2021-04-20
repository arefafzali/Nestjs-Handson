
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinTable, JoinColumn, ManyToOne } from 'typeorm';
import EmployerEntity from './employer.entity';
import FreelancerEntity from './freelancer.entity';


@Entity()
export default class CommentEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  description: string;

  @OneToOne( () => EmployerEntity)
  @JoinColumn()
  employer: EmployerEntity;

  @ManyToOne( type => FreelancerEntity , freelancer => freelancer.comments)
  comments: FreelancerEntity;

}