import { Injectable } from '@nestjs/common';
import UserEntity from '../db/entity/user.entity';
import CreateUserDto from './dto/create-user.dto';
import BookEntity from '../db/entity/book.entity';
import {getRepository} from "typeorm";

@Injectable()
export class UserServices {

  async insert(userDetails: CreateUserDto): Promise<UserEntity> {
    const userEntity: UserEntity = UserEntity.create();
    const { name } = userDetails;
    userEntity.name = name;
    await UserEntity.save(userEntity);
    return userEntity;
  }
  async getAllUsers(): Promise<UserEntity[]> {
    return await UserEntity.find();
  }
  async getBooksOfUser(userID: number): Promise<BookEntity[]> {
    console.log(typeof(userID));
    const user: UserEntity = await UserEntity.findOne({where: {id: userID}, relations: ['books']});
    return user.books;
  }
  async updateUser(id: string, userDetails: CreateUserDto): Promise<UserEntity> {
    const user = await getRepository(UserEntity).findOneOrFail(id);
    user.name = userDetails.name;
    user.books=[];
    for ( let i = 0; i < userDetails.books.length ; i++)
    {
      const book = await BookEntity.findOne(userDetails.books[i]);
      user.books.push(book);
    }
    return getRepository(UserEntity).save(user);
  }
  async deleteUser(id: string){
    const user = await getRepository(UserEntity).findOneOrFail(id);
    return getRepository(UserEntity).remove(user);
  }
}