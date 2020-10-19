import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import * as moment from 'moment'; //npm install moment --save
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  createUserForm: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.validator()
  }

  ngOnInit(): void {
  }

  validator() {
    this.createUserForm = this.formBuilder.group({
      firstName: ['', Validators.required ],
      lastName: ['', Validators.required ],
      email: ['', [Validators.required, Validators.email] ],
      password: ['', [Validators.required, Validators.minLength(6)] ],
      birthDate: ['', [Validators.required, this.validateBirthDateField]],
      role: ['User', Validators.required ],
    })
  }

  saveUser() {
    if(this.createUserForm.valid){
      this.userService.createUser(this.createUserForm.value).subscribe(
        (userCreated) => {
          console.log(userCreated)
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

  validateBirthDateField(control: AbstractControl){
    const currentDate = moment(new Date(), 'YYYY-MM-DD').unix()
    //const menosEdad = moment(new Date(), 'YYYY-MM-DD').subtract('17', 'years').unix()
    const theDate = moment(control.value, 'YYYY-MM-DD').unix()

    if (currentDate < theDate){
      return {birthDateInvalid: true}
    }

    /*if (menosEdad < theDate){
      return {menorEdad: true}
    }*/
    return null;
  }

}
