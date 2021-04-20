import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { EmployerService } from './employer.service';
import CreateEmployerDto from './dto/create-employer.dto';
import {ApiBearerAuth} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import CreateProjectDto from 'src/project/dto/create-project.dto';

@Controller('employer')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class EmployerController {
  constructor(private readonly employersServices: EmployerService) {}


  @Post('post')
  postEmployer( @Body() employer: CreateEmployerDto) {
    return this.employersServices.insert(employer);
  }

  @Get('get')
  getAll() {
    return this.employersServices.getAllEmployers();
  }

  @Put('put')
  updateEmployer(@Param('id') id: string, @Body() employerDetails: CreateEmployerDto) {
    return this.employersServices.updateEmployer(id, employerDetails);
  }

  @Delete('delete')
  deleteEmployer(@Param('id') id: string) {
    return this.employersServices.deleteEmployer(id);
  }


  @Post('project/post')
  postProject( @Body() project: CreateProjectDto) {
    return this.employersServices.createProject(project);
  }
  
  @Get('project/get')
  getProject( @Query('id') id: number ) {
    return this.employersServices.projectsOfEmployer(id);
  }

  @Put('project/put')
  updateProject(@Param('id') id: string, @Body() projectDetails: CreateProjectDto) {
    return this.employersServices.updateProject(id, projectDetails);
  }

  @Delete('project/delete')
  deleteProject(@Param('id') id: string) {
    return this.employersServices.deleteProject(id);
  }

  @Get('/project/all')
  getAllProjects() {
    return this.employersServices.getAllProjects();
  }

}