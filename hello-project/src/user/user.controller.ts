
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { UserServices } from './user.service';
import CreateUserDto from './dto/create-user.dto';
import {ApiBearerAuth} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly usersServices: UserServices) {}

//'postUser()' will handle the creating of new User
  @Post('post')
  postUser( @Body() user: CreateUserDto) {
    return this.usersServices.insert(user);
  }
// 'getAll()' returns the list of all the existing users in the database
  @Get()
  getAll() {
    return this.usersServices.getAllUsers();
  }

//'getBooks()' return all the books which are associated with the user 
// provided through 'userID' by the request  
  @Get('books')
  getBooks( @Query('userID', ParseIntPipe) userID: number ) {
    return this.usersServices.getBooksOfUser(userID);
  }

  @Put('put')
  updateUser(@Param('id') id: string, @Body() userDetails: CreateUserDto) {
    return this.usersServices.updateUser(id, userDetails);
  }

  @Delete('delete')
  deleteUser(@Param('id') id: string) {
    return this.usersServices.deleteUser(id);
  }
}