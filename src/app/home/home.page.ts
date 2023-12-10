import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../service/auth.service';
import { NavController } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  credentials: any = {
    username: '',
    password: ''
  }
  state: any;
  viajes: any = [];
  tipo_user: any;

  userGeoloca: any;
  Tomado: boolean = false;


  correo : any;

  destinatario: any;
  asunto: string = 'Viaje';
  cuerpo: string = 'Tu Viaje ya esta listo';

  constructor(private navCtrl: NavController, private authService: AuthService, private http: HttpClient, private activeroute: ActivatedRoute, private router: Router) {
    this.activeroute.queryParams.subscribe(params => {
      this.state = this.router.getCurrentNavigation()?.extras.state;
      this.credentials = this.state.credentials
      this.tipo_user = this.state.tipo_user
      console.log(this.credentials.username + ' desde el home El tipo es:', this.tipo_user);
    });
  }

  ngOnInit() {
    this.cargaViaje()
    console.log("Hola Mundo")
    console.log(this.state.credentials.username)
  }

  cargaViaje() {
    this.authService.getViajes().subscribe(
      (res) => {
        console.log(res);
        this.viajes = res;
      }
      ,
      (error) => {
        console.log(error);
      }
    )
  }


  salir() {
    localStorage.removeItem('ingresado');
    this.Tomado = false;
    this.router.navigate(['/login']);
  }

  Viaje() {
    console.log("Boton funciona")
    const nuevoState = {
      datos: this.credentials
    };
    const nuevoTipo = {
      tipo: this.tipo_user
    }
    let navegationExtras: NavigationExtras = {
      state: {
        credentials: nuevoState.datos,
        tipo_user: nuevoTipo.tipo
      }
    }
    console.log('Estado enviado:', nuevoState.datos);
    console.log("Hola Mundo")
    console.log(nuevoState)
    console.log('tipo user ' + nuevoTipo)
    this.router.navigate(['/viaje'], navegationExtras);
  }

  tomarViaje(patente: string, user : string) {
    console.log('Patente a tomar:', patente);
    for (const viaje of this.viajes) {
      if (viaje.patente == patente) {
        console.log("Hola Mundo")
        viaje.capacidad -= 1;
        this.Tomado = true;
        this.authService.putViaje(viaje.patente, viaje).subscribe(
          response => {
            console.log('Capacidad actualizada con éxito:', response);
            console.log('esta es la nueva capacidad ' + viaje.capacidad)
            
            if (viaje.capacidad == 0){
              console.log("deberia estar eliminado")
              viaje.estado_viaje = 0;
              this.authService.eliminarViaje(viaje.patente, viaje).subscribe(
                response =>{
                  console.log("Eliminado", response)
                }
              );
            }
            this.authService.obtenerCorreo(user).subscribe(
              (data) => {
                const mail = data.mail; // Ajusta según la estructura de la respuesta de tu API
                console.log(mail);const correo = {
                    destinatario : mail,
                    asunto : this.asunto,
                    cuerpo : this.cuerpo
                  }
                  this.authService.enviarCorreo(correo).subscribe(
                    (respuesta) => {
                      console.log(respuesta);
                    },
                    (error) => {
                      console.error('Error al enviar el correo', error);
                      // Puedes manejar el error aquí, por ejemplo, mostrar un mensaje al usuario.
                    }
                  );

              },
              (error) => {
                console.error('Error al obtener el correo', error);
              }
            )
           // this.router.navigate(['/correo'], navegationExtras)
          },
          error => {
            console.error('Error al actualizar la capacidad:', error);
          }
        );

      }
    }

  }


  async geolocalizar() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      this.userGeoloca = coordinates;
      console.log('Posicion Actual:', coordinates);
    } catch (error) {
      console.error('Error al obtener la ubicación:', error);
    }
  }

  obtenerCorreo(usuario : string){
    this.authService.obtenerCorreo(usuario).subscribe(
      data =>{
        console.log(data.mail)
      }
    )

  }

}