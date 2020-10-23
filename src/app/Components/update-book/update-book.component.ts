import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BookService } from '../../Services/book.service';
import { GenreService } from '../../Services/genre.service';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent implements OnInit {
  updateBookForm: FormGroup
  idBook;
  dataBook;
  allGenre;
  genres;
  genreBook: Array<any> = [];
  public file: File;

  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private genreService: GenreService,
    private routeParams: ActivatedRoute,
    private router: Router
  ) {
    this.idBook = this.routeParams.snapshot.paramMap.get('id');
    let storageBook = localStorage.getItem(`book-${this.idBook}`)
    this.dataBook = JSON.parse(storageBook)
    this.gerGenre()
    this.validator()
  }

  ngOnInit(): void {
    
  }

  validator() {
    this.dataBook.genre.forEach(g => {
      this.genreBook.push(g._id)
    });
    this.file = this.dataBook.image
    
    this.updateBookForm = this.formBuilder.group({
      name: [this.dataBook.name, Validators.required ],
      author: [this.dataBook.author, Validators.required ],
      numberPages: [this.dataBook.numberPages],
      genre: [this.genreBook, Validators.required],
      publsher: [this.dataBook.publsher, Validators.required],
      image: [null],
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

  updateBook() {
    if(this.updateBookForm.valid){

      const book = this.updateBookForm.value;
      const formData = new FormData();
      formData.append('name', book.name);
      formData.append('author', book.author);
      formData.append('numberPages', book.numberPages);
      formData.append('genre', book.genre);
      formData.append('publsher', book.publsher);
      formData.append('image', this.file);

      this.bookService.updateBook(formData, this.dataBook._id).subscribe(
        (userBook) => {
          alert('Creación exitosa')
          this.router.navigate(['/lista-libros'])
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
    this.updateBookForm.get('genre').setValue(value);
  }

  prepareImage(event: any) {
    this.file = <File>event.target.files[0];
  }

}
