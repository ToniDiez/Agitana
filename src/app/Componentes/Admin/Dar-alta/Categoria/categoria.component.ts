import { Component } from '@angular/core';
import { UserService } from '../../../../Servicios/Service/user.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css'],
})
export class CategoriaComponent {
  nombre!: string;
  descripcion!: string;
  cateForm!: FormGroup;
  touched = {
    nombre: false,
    descripcion: false,
  };

  constructor(private userService: UserService, private fb: FormBuilder) {
    this.cateForm = new FormGroup({
      descripcion_producto: new FormControl('', [
        Validators.required,
        Validators.minLength(15),
      ]),
    });
  }

  capitalizeFirstLetter() {
    this.nombre = this.nombre.charAt(0).toUpperCase() + this.nombre.slice(1);
    this.descripcion = this.descripcion.charAt(0).toUpperCase() + this.descripcion.slice(1);
  }

  ngOnInit(){
    this.cateForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
    })
  }

  crearCategoria() {
    this.userService.crearCategoria(this.nombre, this.descripcion).subscribe(
      (response) => {
        console.log('response', response);
        window.alert('Nueva Categoria Creada');
      },
      (error) => {
        console.log('error', error);
      }
    );
  }
}
