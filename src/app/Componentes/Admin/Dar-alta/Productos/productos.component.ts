import { Component } from '@angular/core';
import { UserService } from '../../../../Servicios/Service/user.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {
  nombre!: string;
  tipoDTO!: BigInteger;
  idCategoria: any;
  idTipo:any;
  categoria: any;
  tipo:any;
  productoForm!: FormGroup;
  touched = {
    nombre: false,
    idCategoria: false,
    idTipo: false
  };

  constructor(private userService: UserService,private fb: FormBuilder) {
    this.productoForm = new FormGroup({
      descripcion_producto: new FormControl('', [
        Validators.required,
        Validators.minLength(15),
      ]),
    });
  }
  capitalizeFirstLetter() {
    this.nombre = this.nombre.charAt(0).toUpperCase() + this.nombre.slice(1);
  }

  ngOnInit(): void {
    this.userService.getCategoria().subscribe(
      (response) => {
        console.log('response', response);
        this.categoria = response;
      },
      (error) => {
        console.log('error', error);
      }
    );

    this.userService.getTipo().subscribe(
      (response) => {
        console.log('response', response);
        this.tipo = response;
      },
      (error) => {
        console.log('error', error);
      }
    );
    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      idCategoria: ['', Validators.required],
      idTipo: ['', Validators.required],
    })
  }

crearProducto(){
  this.userService.crearProducto(this.nombre,this.idCategoria,this.idTipo).subscribe(
    (response) => {
      console.log('response', response);
      window.alert("Nuevo Producto Creado")
    },
    (error) => {
      console.log('error', error);
          
    }
  );
}

}
