import { Body, Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { BooksService } from './books.service';
import CreateBookDto from './dto/create-book.dto';


@Controller('books')
export class BooksController {
    constructor(private readonly bookServices: BooksService) {}
    @Post('post')
    postGenre( @Body() book: CreateBookDto) {
      return this.bookServices.insert(book);
    }
    @Get()
    getAll() {
      return this.bookServices.getAllBooks();
    }
    @Put('put')
    updateBook(@Param('id') id: string, @Body() bookDetails: CreateBookDto) {
      return this.bookServices.updateBook(id, bookDetails);
    }
  
    @Delete('delete')
    deleteUser(@Param('id') id: string) {
      return this.bookServices.deleteBook(id);
    }
  }
