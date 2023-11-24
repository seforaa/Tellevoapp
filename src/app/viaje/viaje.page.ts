import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router, NavigationExtras, ActivatedRoute} from '@angular/router';
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
    capacidad: 0,  // Corregido: Asigna null como número
    precio: 0,  
  };
  vacio: boolean=false;

  state: any;
  credentials: any;
  tipo_user : any;


  constructor(private authService: AuthService, private router: Router, private location: Location, private activeroute: ActivatedRoute) { 
    this.activeroute.queryParams.subscribe(params => {
      this.state = this.router.getCurrentNavigation()?.extras.state;
      this.credentials = this.state.credentials
      this.tipo_user = this.state.tipo_user
      console.log(this.credentials+' desde el home El tipo es:', this.tipo_user);
    });
   }

  ngOnInit() {
    console.log('este es el usuario q llega'+this.state.credentials.username)
  }

  guardarViaje() {
    if(this.viaje.patente=="" || this.viaje.duenno=="" || this.viaje.destino=="" || this.viaje.salida=="" || this.viaje.capacidad>0 || this.viaje.precio>0){
      this.vacio = true;
    }else{
    this.authService.postViaje(this.viaje).subscribe(
      (response) => {
        console.log('Viaje guardado correctamente:', response);
        const nuevoState = {
          datos: this.credentials
        };
        const nuevoTipo = {
          tipo: this.tipo_user
        }
        let navegationExtras: NavigationExtras = {
          state: {
            credentials: nuevoState.datos,
            tipo_user : nuevoTipo.tipo
          }
        }
        console.log('Estado enviado:', navegationExtras.state);
        console.log("Hola Mundo")
        console.log(nuevoState)
        console.log('TIPO USER QUE WEA'+nuevoTipo.tipo)
        this.router.navigate(['/home'], navegationExtras).then(() => {
          console.log('Vista de /home recargada');
          window.location.reload();
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
