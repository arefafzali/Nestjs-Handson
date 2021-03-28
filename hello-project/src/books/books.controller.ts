import { Body, Controller, Get, Post } from '@nestjs/common';
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
    
}
