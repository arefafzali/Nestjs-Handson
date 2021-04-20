import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { FreelancerService } from './freelancer.service';
import CreateFreelancerDto from './dto/create-freelancer.dto';
import {ApiBearerAuth} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import CreateCommentDto from 'src/comment/dto/create-comment.dto';

@Controller('freelancer')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class FreelancerController {
  constructor(private readonly freelancersServices: FreelancerService) {}


  @Post('post')
  postFreelancer( @Body() freelancer: CreateFreelancerDto) {
    return this.freelancersServices.insert(freelancer);
  }

  @Get('get')
  getAll() {
    return this.freelancersServices.getAllFreelancers();
  }

  @Put('put')
  updateFreelancer(@Param('id') id: string, @Body() freelancerDetails: CreateFreelancerDto) {
    return this.freelancersServices.updateFreelancer(id, freelancerDetails);
  }

  @Delete('delete')
  deleteFreelancer(@Param('id') id: string) {
    return this.freelancersServices.deleteFreelancer(id);
  }


  @Post('comment/post')
  postComment( @Body() comment: CreateCommentDto) {
    return this.freelancersServices.createComment(comment);
  }
  
  @Get('comment/get')
  getComment( @Query('id') id: number ) {
    return this.freelancersServices.commentsOfFreelancer(id);
  }

  @Put('comment/put')
  updateComment(@Param('id') id: string, @Body() commentDetails: CreateCommentDto) {
    return this.freelancersServices.updateComment(id, commentDetails);
  }

  @Delete('comment/delete')
  deleteComment(@Param('id') id: string) {
    return this.freelancersServices.deleteComment(id);
  }

}

