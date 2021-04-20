
import { Injectable } from '@nestjs/common';
import CreateEmployerDto from './dto/create-employer.dto';
import EmployerEntity from '../db/entity/employer.entity';
import {getRepository} from "typeorm";
import ProjectEntity from 'src/db/entity/project.entity';
import CreateProjectDto from 'src/project/dto/create-project.dto';

@Injectable()
export class EmployerService {

  async insert(employerDetails: CreateEmployerDto): Promise<EmployerEntity> {
    const employerEntity: EmployerEntity = EmployerEntity.create();
    const { name } = employerDetails;
    employerEntity.name = name;
    employerEntity.projects=[];
    for ( let i = 0; i < employerDetails.projects.length ; i++)
    {
      const project = await ProjectEntity.findOne({where: {id: employerDetails.projects[i]}});
      employerEntity.projects.push(project);
    }
    await EmployerEntity.save(employerEntity);
    return employerEntity;
  }

  async getAllEmployers(): Promise<EmployerEntity[]> {
    return await EmployerEntity.find();
  }

  async updateEmployer(id: string, employerDetails: CreateEmployerDto): Promise<EmployerEntity> {
    const employer = await getRepository(EmployerEntity).findOneOrFail(id);
    employer.name = employerDetails.name;
    employer.projects=[];
    for ( let i = 0; i < employerDetails.projects.length ; i++)
    {
      const project = await ProjectEntity.findOne({where: {id: employerDetails.projects[i]}});
      employer.projects.push(project);
    }
    return getRepository(EmployerEntity).save(employer);
  }
  
  async deleteEmployer(id: string){
    const employer = await getRepository(EmployerEntity).findOneOrFail(id);
    return getRepository(EmployerEntity).remove(employer);
  }

//   Project
  async projectsOfEmployer(employerID: number): Promise<ProjectEntity[]> {
    console.log(typeof(employerID));
    const employer: EmployerEntity = await EmployerEntity.findOne({where: {id: employerID}, relations: ['projects']});
    return employer.projects;
  }

  async createProject(projectDetails: CreateProjectDto): Promise<ProjectEntity> {
    const projectEntity: ProjectEntity = ProjectEntity.create();
    const { name } = projectDetails;
    projectEntity.name = name;
    await ProjectEntity.save(projectEntity);
    return projectEntity;
  }

  async updateProject(id: string, projectDetails: CreateProjectDto): Promise<ProjectEntity> {
    const project = await getRepository(ProjectEntity).findOneOrFail(id);
    project.name = projectDetails.name;
    return getRepository(ProjectEntity).save(project);
  }

  async deleteProject(id: string){
    const project = await getRepository(ProjectEntity).findOneOrFail(id);
    return getRepository(ProjectEntity).remove(project);
  }

  async getAllProjects(): Promise<ProjectEntity[]> {
    return await ProjectEntity.find();
  }
}