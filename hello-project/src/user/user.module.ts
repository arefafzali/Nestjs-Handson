
import { Module } from '@nestjs/common';
import { UserServices } from './user.service';
import { UserController } from './user.controller';
import UserEntity from '../db/entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    // TypeOrmModule.forFeature([UserEntity])
  ],
  controllers: [UserController],
  providers: [UserServices],
})
export class UserModule {}