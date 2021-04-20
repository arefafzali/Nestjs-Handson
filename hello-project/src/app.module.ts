
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserEntity from './db/entity/user.entity';
import BooksModule from './books/books.module';
import GenreModule from './genre/genre.module';
import BookEntity from './db/entity/book.entity';
import GenreEntity from './db/entity/genre.entity';
import { HelloModule } from './hello/hello.module';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { FreelancerModule } from './freelancer/freelancer.module';
import { EmployerModule } from './employer/employer.module';
import { CommentModule } from './comment/comment.module';
import { ProjectModule } from './project/project.module';
import FreelancerEntity from './db/entity/freelancer.entity';
import EmployerEntity from './db/entity/employer.entity';
import CommentEntity from './db/entity/comment.entity';
import ProjectEntity from './db/entity/project.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [FreelancerEntity, EmployerEntity, CommentEntity, ProjectEntity],
    ),

    TypeOrmModule.forRoot(),

    AuthModule,
    UsersModule,
    FreelancerModule,
    EmployerModule,
    CommentModule,
    ProjectModule,
  ],
  controllers: [AppController],
  providers: [AppService, UsersService],
})
export class AppModule {}