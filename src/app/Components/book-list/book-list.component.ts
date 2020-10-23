import { Component, OnInit } from '@angular/core';
import { BookService } from '../../Services/book.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  allBooks;
  constructor(
    private bookService: BookService,
    private router: Router
  ) { }

  APIrul = this.bookService.apiUrl

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

  updateBook(book){
    console.log('BBBBB', book)
    localStorage.setItem(`book-${book._id}`, JSON.stringify(book))
    this.router.navigate([`/modificar-libro/${book._id}`])
  }

}
