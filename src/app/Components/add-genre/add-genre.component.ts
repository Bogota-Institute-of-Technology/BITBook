import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { GenreService } from '../../Services/genre.service'

@Component({
  selector: 'app-add-genre',
  templateUrl: './add-genre.component.html',
  styleUrls: ['./add-genre.component.css']
})
export class AddGenreComponent implements OnInit {

  genreForm: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private genreService: GenreService
  ) {
    this.validator()
  }

  ngOnInit(): void {
  }

  validator() {
    this.genreForm = this.formBuilder.group({
      name: ['', Validators.required ]
    })
  }

  saveGenre() {
    if(this.genreForm.valid){
      this.genreService.createGenre(this.genreForm.value).subscribe(
        (genreCreated) => {
          console.log(genreCreated)
          alert('Genero creado correctamente')
        },
        (error) => {
          console.error('Error al crear el genero ', error)
        }
      )
    }else{
      alert('Se deben llenar todos los campos')
    }
  }

}
