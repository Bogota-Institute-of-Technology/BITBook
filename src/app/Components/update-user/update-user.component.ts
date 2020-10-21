/**
 * Se debe comentar el campo de la contraseña en la API.
 * Al momento de actualiza, enviar el token en la API: res.send({ toke: jwtServi.createToken(dataUser) })
 */

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import * as moment from 'moment'; //npm install moment --save
import { UserService } from '../../Services/user.service';
import { StorageService } from '../../Services/storage.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  updateUserForm: FormGroup;
  userData;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private storageService: StorageService
  ) {
    this.userData = this.storageService.dataUser();
    this.validator()
  }

  ngOnInit(): void {
  }

  validator() {
    const date = moment(this.userData.birthDate).format('YYYY-MM-DD');
    this.updateUserForm = this.formBuilder.group({
      firstName: [this.userData.firstName, Validators.required ],
      lastName: [this.userData.lastName, Validators.required ],
      email: [this.userData.email, [Validators.required, Validators.email] ],
      birthDate: [date, [Validators.required, this.validateBirthDateField]],
      role: ['User', Validators.required ],
    })
  }

  updateUser() {
    if(this.updateUserForm.valid){
      this.userService.updateUser(this.updateUserForm.value, this.userData.sub).subscribe(
        (userUpdated) => {
          this.storageService.saveToken(userUpdated['toke']);
          alert('Actualización exitosa')
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
