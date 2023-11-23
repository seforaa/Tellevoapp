import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

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

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  guardarViaje() {
    this.authService.postViaje(this.viaje).subscribe(
      (response) => {
        console.log('Viaje guardado correctamente:', response);
        this.router.navigate(['/home'])
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
