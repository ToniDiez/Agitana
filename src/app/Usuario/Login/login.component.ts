import { Component } from '@angular/core';
import { AuthService } from '../../Servicios/auth.service';
import { Router } from '@angular/router';
import { DatosService } from '../../Servicios/Datos/datos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent {
  username!: string;
  password!: string;
  rol!: string;
  loginForm!: FormGroup;
  touched = {
   username: false,
   password: false
 };

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}
 
  ngOnInit(){
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
 

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        if(response.token==null){
          console.log("entro en null")
          window.alert(response.message);
        }else
        {
          console.log('Username', response);
        console.log('Username', this.username);
        console.log('password', this.password);
        console.log('response', response.rol);
        console.log('response', response.token);
        console.log('response', response.idPersona);
        window.alert(response.message);
        this.authService.setAuthToken(response.token);
        this.authService.setAuthRol(response.rol);
        this.authService.setAuthNombre(this.username);
        this.authService.setAuthId(response.id);
        this.authService.setAuthIdPersona(response.idPersona);
        if (response.rol) {
          if (response.rol == 'ADMIN') {
            console.log('Usuario Admin');
            this.router.navigate(['/Admin/Alta']).then(() => {
              window.location.href = '/Admin/Alta';
            });
            
          } else if (
            response.rol == 'USER') {
            this.authService.setAuthUserType(response.tipo);
            if(response.tipo=='RECIBIDOR'){
              console.log('Usuario User Recibidor');
              this.router.navigate(['/User/InicioRecibidor']).then(() => {
                window.location.href = '/User/InicioRecibidor';
              });
            }else
            console.log('Usuario User Donante');
            this.router.navigate(['/User/InicioDonante']).then(() => {
              window.location.href = '/User/InicioDonante';
            });
          }
        }
        
    return console.log('Falso perrrrrrrrrrrrrrrrrrrrro');
  }
      },
      (error) => {
        console.log('Username', this.username);
        console.log('password', this.password);
        console.log(error);
      }
    );
  }
}
