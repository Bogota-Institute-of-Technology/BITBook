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
  public file: File;

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
      publsher: ['', Validators.required],
      image: [null, Validators.required],
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

      const song = this.createBookForm.value;
      const formData = new FormData();
      formData.append('name', song.name);
      formData.append('author', song.author);
      formData.append('numberPages', song.numberPages);
      formData.append('genre', song.genre);
      formData.append('publsher', song.publsher);
      formData.append('image', this.file);

      this.bookService.createBook(formData).subscribe(
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

  prepareImage(event: any) {
    this.file = <File>event.target.files[0];
  }

}
