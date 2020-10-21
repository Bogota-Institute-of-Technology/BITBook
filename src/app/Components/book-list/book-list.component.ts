import { Component, OnInit } from '@angular/core';
import { BookService } from '../../Services/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  allBooks;
  constructor(
    private bookService: BookService
  ) { }

  ngOnInit(): void {
    this.getAll()
  }

  getAll(){
    this.bookService.getAll().subscribe(
      (books) => {
        this.allBooks = books
      },
      (error) => {
        console.error('Error ', error)
      }
    )
  }

}
