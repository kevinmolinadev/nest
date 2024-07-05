import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { v4 as UUIDv4 } from "uuid"

@Injectable()
export class BooksService {
  private books: Book[] = [];

  async create(createBookDto: CreateBookDto) {
    this.books.push(Book.fromObject({ id: UUIDv4(), ...createBookDto }))
    throw new InternalServerErrorException();
    return createBookDto;
  }

  findAll() {
    return this.books;
  }

  findOne(id: string) {
    const book = this.books.find((item) => item.getId === id)
    if (!book) throw new NotFoundException(`the resource with id ${id} not found`)
    return book;
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    let book = this.findOne(id);
    book.update(updateBookDto);
    return book;
  }

  remove(id: string) {
    const indexOfBook = this.books.findIndex((item) => item.getId === id);
    this.books.splice(indexOfBook, 1);
    return `The resource with id ${id} deleted`;
  }
}
