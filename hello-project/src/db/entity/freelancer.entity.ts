import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, JoinTable, JoinColumn } from 'typeorm';
import CommentEntity from './comment.entity';


@Entity()
export default class FreelancerEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @OneToMany( type => CommentEntity , comment => comment.description)
  comments: CommentEntity[];

}