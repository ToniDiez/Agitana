import { Component } from '@angular/core';
import { UserService } from '../../../../Servicios/Service/user.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tipo',
  templateUrl: './tipo.component.html',
  styleUrls: ['./tipo.component.css'],
})
export class TipoComponent {
  nombre!: string;
  tipoForm!: FormGroup;
  touched = {
    nombre: false,
  };

  constructor(private userService: UserService, private fb: FormBuilder) {
    this.tipoForm = new FormGroup({
      descripcion_producto: new FormControl('', [
        Validators.required,
        Validators.minLength(15),
      ]),
    });
  }
  
  capitalizeFirstLetter() {
    this.nombre = this.nombre.charAt(0).toUpperCase() + this.nombre.slice(1);
  }
  ngOnInit(){
    this.tipoForm = this.fb.group({
      nombre: ['', Validators.required],
    })
  }

  crearTipo() {
    this.userService.crearTipo(this.nombre).subscribe(
      (response) => {
        console.log('response', response);
        window.alert('Nuevo Tipo Creado');
      },
      (error) => {
        console.log('error', error);
      }
    );
    
  }
}
