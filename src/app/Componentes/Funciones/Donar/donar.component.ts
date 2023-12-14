import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../Servicios/Service/user.service'; 
import { AuthService } from '../../../Servicios/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-donar',
  templateUrl: './donar.component.html',
  styleUrls: ['./donar.component.css'],
})
export class DonarComponent {
  categoria: any;
  descripcion_producto!: string;
  idPersona: any;
  idCategoria: any;
  donaForm!: FormGroup;
  touched = {
   idCategoria: false,
   descripcion_producto: false
  };


  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder
  ) {this.donaForm = new FormGroup({
    descripcion_producto: new FormControl('', [
      Validators.required,
      Validators.minLength(15),
    ]),
  });}
  capitalizeFirstLetter() {
    this.descripcion_producto = this.descripcion_producto.charAt(0).toUpperCase() + this.descripcion_producto.slice(1);
  }
 

  ngOnInit(): void {
    if (this.idPersona == '') {
      this.idPersona = '';
    } else this.idPersona = this.authService.getAuthIdPersona();
    this.userService.comprobarUser().subscribe(
      (response) => {
        console.log('response', response);
      },
      (error) => {
        console.log('error', error);
        this.router.navigate(['../../403']).then(() => {
          window.location.href = '../../403';
        });
      }
    );

    this.userService.getCategoriaUSER().subscribe(
      (response) => {
        console.log('response', response);
        this.categoria = response;
      },
      (error) => {
        console.log('error', error);
        this.router.navigate(['../../403']).then(() => {
          window.location.href = '../../403';
        });
      }
    );

    this.donaForm = this.fb.group({
      idCategoria: ['', Validators.required],
      descripcion_producto: ['', Validators.required],
    })
 
  }

  onSubmit() {
    this.userService
      .crearDonacion(this.idCategoria, this.descripcion_producto, this.idPersona)
      .subscribe(
        (response) => {
          console.log('response', response);
          window.alert("Nueva Donación Creada")
          window.location.reload();
        },
        (error) => {
          console.log('error', error);
        }
      );
  }
}
