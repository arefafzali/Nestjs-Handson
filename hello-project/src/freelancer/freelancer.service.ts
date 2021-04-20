
import { Injectable } from '@nestjs/common';
import CreateFreelancerDto from './dto/create-freelancer.dto';
import FreelancerEntity from '../db/entity/freelancer.entity';
import {getRepository} from "typeorm";
import CommentEntity from 'src/db/entity/comment.entity';
import CreateCommentDto from 'src/comment/dto/create-comment.dto';
import EmployerEntity from 'src/db/entity/employer.entity';

@Injectable()
export class FreelancerService {

  async insert(freelancerDetails: CreateFreelancerDto): Promise<FreelancerEntity> {
    const freelancerEntity: FreelancerEntity = FreelancerEntity.create();
    const { name } = freelancerDetails;
    freelancerEntity.name = name;
    freelancerEntity.comments=[];
    for ( let i = 0; i < freelancerDetails.comments.length ; i++)
    {
      const comment = await CommentEntity.findOne(freelancerDetails.comments[i]);
      freelancerEntity.comments.push(comment);
    }
    await FreelancerEntity.save(freelancerEntity);
    return freelancerEntity;
  }

  async getAllFreelancers(): Promise<FreelancerEntity[]> {
    return await FreelancerEntity.find();
  }

  async updateFreelancer(id: string, freelancerDetails: CreateFreelancerDto): Promise<FreelancerEntity> {
    const freelancer = await getRepository(FreelancerEntity).findOneOrFail(id);
    freelancer.name = freelancerDetails.name;
    return getRepository(FreelancerEntity).save(freelancer);
  }
  
  async deleteFreelancer(id: string){
    const freelancer = await getRepository(FreelancerEntity).findOneOrFail(id);
    return getRepository(FreelancerEntity).remove(freelancer);
  }

//   Comment
  async commentsOfFreelancer(freelancerID: number): Promise<CommentEntity[]> {
    console.log(typeof(freelancerID));
    const freelancer: FreelancerEntity = await FreelancerEntity.findOne({where: {id: freelancerID}, relations: ['comments']});
    return freelancer.comments;
  }

  async createComment(commentDetails: CreateCommentDto): Promise<CommentEntity> {
    const commentEntity: CommentEntity = CommentEntity.create();
    const employer = await getRepository(EmployerEntity).findOneOrFail(commentDetails.employerID);
    commentEntity.employer = employer;
    commentEntity.description = commentDetails.description;
    await CommentEntity.save(commentEntity);
    return commentEntity;
  }

  async updateComment(id: string, commentDetails: CreateCommentDto): Promise<CommentEntity> {
    const comment = await getRepository(CommentEntity).findOneOrFail(id);
    const employer = await getRepository(EmployerEntity).findOneOrFail(commentDetails.employerID);
    comment.employer = employer;
    comment.description = commentDetails.description;
    return getRepository(CommentEntity).save(comment);
  }

  async deleteComment(id: string){
    const comment = await getRepository(CommentEntity).findOneOrFail(id);
    return getRepository(CommentEntity).remove(comment);
  }
}

