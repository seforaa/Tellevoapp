import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-viaje',
  templateUrl: './viaje.page.html',
  styleUrls: ['./viaje.page.scss'],
})
export class ViajePage implements OnInit {

  viaje = {
    patente: '',
    duenno: '',
    destino: '',
    salida: '',
    capacidad: null,
    precio: null,
  };
  vacio: boolean=false;

  constructor(private authService: AuthService, private router: Router, private location: Location) { }

  ngOnInit() {
  }

  guardarViaje() {
    if(this.viaje.patente=="" || this.viaje.duenno=="" || this.viaje.destino=="" || this.viaje.salida=="" || this.viaje.capacidad==null || this.viaje.precio==null){
      this.vacio = true;
    }else{
    this.authService.postViaje(this.viaje).subscribe(
      (response) => {
        console.log('Viaje guardado correctamente:', response);
        this.router.navigate(['/home']).then(() => {
          console.log('Vista de /home recargada');
        });
        // Puedes realizar acciones adicionales después de guardar el viaje
      },
      (error) => {
        console.error('Error al guardar el viaje:', error);
        console.log('este es el viaje');
        console.log(this.viaje)
      }
    );
  }
  }

}
