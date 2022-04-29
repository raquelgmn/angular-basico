import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { nombreApellidoPattern, emailPattern } from '../../../shared/validator/validaciones';
import { ValidatorService } from '../../../shared/validator/validator.service';
import { EmailValidatorService } from '../../../shared/validator/email-validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern( this.vs.nombreApellidoPattern )]],
    email: ['', [Validators.required, Validators.pattern( this.vs.emailPattern ) ], [ this.emailValidator]],
    username: ['', [Validators.required,  this.vs.noPuedeSerStrider ]],
    password: ['', [Validators.required,  Validators.minLength(6) ]],
    password2: ['', [Validators.required,  this.vs.noPuedeSerStrider ]],

  }, {
    validators: [ this.vs.camposIguales('password', 'password2') ]
  });

  get emailErrorMsg() {
    
    const errors = this.miFormulario.get('email')?.errors;

    if( errors?.['required'] ){
      return 'Email es obligatorio';
    } else if ( errors?.['pattern'] ){
      return 'El valor introducido no tiene el formato correcto';
    } else if ( errors?.['emailTomado'] ){
      return 'El email ya existe';
    }

    return '';
  }

  constructor( private fb:FormBuilder,
              private vs: ValidatorService,
              private emailValidator: EmailValidatorService ) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'Raquel Garcia',
      email: 'test1@test.com',
      username: 'raquel94',
      password: '123456',
      password2: '123456',
    })
  }

  campoNoValido( campo: string ){

    return this.miFormulario.get(campo)?.invalid &&
            this.miFormulario.get(campo)?.touched;
  }

  submitFormulario() {

    console.log(this.miFormulario.value);

    this.miFormulario.markAllAsTouched();
  }



}
