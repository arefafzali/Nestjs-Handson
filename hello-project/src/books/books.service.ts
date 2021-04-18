
import BookEntity from '../db/entity/book.entity';
import CreateBookDto from './dto/create-book.dto';
import UserEntity from '../db/entity/user.entity';
import { getRepository } from 'typeorm';
import GenreEntity from '../db/entity/genre.entity';

export class BooksService {

  async insert(bookDetails: CreateBookDto): Promise<BookEntity> {
    const { name , userID , genreIDs } = bookDetails;
    const book = new BookEntity();
    book.name = name;
    book.user = await UserEntity.findOne(userID) ;
    book.genres=[];
    for ( let i = 0; i < genreIDs.length ; i++)
    {
      const genre = await GenreEntity.findOne(genreIDs[i]);
      book.genres.push(genre);
    }
    await book.save();
    return book;
  }
  async getAllBooks(): Promise<BookEntity[] > {
    return BookEntity.find();
  }
  async updateBook(id: string, bookDetails: CreateBookDto): Promise<BookEntity> {
    const book = await getRepository(BookEntity).findOneOrFail(id);
    book.name = bookDetails.name;
    book.genres = []
    for ( let i = 0; i < bookDetails.genreIDs.length ; i++)
    {
      const genre = await GenreEntity.findOne(bookDetails.genreIDs[i]);
      book.genres.push(genre);
    }
    return getRepository(BookEntity).save(book);
  }
  async deleteBook(id: string){
    const book = await getRepository(BookEntity).findOneOrFail(id);
    return getRepository(BookEntity).remove(book);
  }

}