import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { BookService } from '../../Services/book.service';
import { GenreService } from '../../Services/genre.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  createBookForm: FormGroup
  allGenre;
  genreBook: Array<any> = [];

  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private genreService: GenreService
  ) {
    this.gerGenre()
    this.validator()
  }

  ngOnInit(): void {
  }

  validator() {
    this.createBookForm = this.formBuilder.group({
      name: ['', Validators.required ],
      author: ['', Validators.required ],
      numberPages: [''],
      genre: ['', Validators.required],
      publsher: ['', Validators.required]
    })
  }

  gerGenre(){
    this.genreService.getAll().subscribe(
      (Genre) => {
        this.allGenre = Genre
        console.log(Genre)
      },
      (error) => {
        console.error('Error: ', error)
      }
    )
  }

  saveBook() {
    if(this.createBookForm.valid){
      this.bookService.createBook(this.createBookForm.value).subscribe(
        (userBook) => {
          console.log(userBook)
          alert('Creación exitosa')
        },
        (error) => {
          console.error('Error: ', error)
        }
      )
    }else{
      alert('Se deben llenar todos los campos')
    }
  }

  saveGenre(event){
    if(this.genreBook.includes(event.target.value)){
      const index = this.genreBook.indexOf(event.target.value);
      this.genreBook.splice(index, 1)
    }else{
      this.genreBook.push(event.target.value);
    }

    let value: any = ''

    if(this.genreBook.length > 0){
      value = this.genreBook
    }
    this.createBookForm.get('genre').setValue(value);
  }

}
