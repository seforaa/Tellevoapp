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

  presentingElement : any = null;

  credentials: any = {
    username: '',
    password: ''
  }
  state: any;
  viajes: any = [];
  tipo_user: any;
  viaje_ida : number = 0;
  viaje_vuelta : number = 0;

  viajes_tomados : any = [];

  userGeoloca: any;
  Tomado: boolean = false;



  correo : any;


  destinatario: any;
  asunto: string = 'Viaje';
  cuerpo: string = 'Tu Viaje ya esta listo';

  viajesVisiblesIda: number = 0;
  viajesVisiblesVuelta: number = 0;

  constructor(private navCtrl: NavController, private authService: AuthService, private http: HttpClient, private activeroute: ActivatedRoute, private router: Router) {
    this.activeroute.queryParams.subscribe(params => {
      this.state = this.router.getCurrentNavigation()?.extras.state;
      this.credentials = this.state.credentials
      this.tipo_user = this.state.tipo_user
    });
  }

  ngOnInit() {
    this.presentingElement = document.querySelector('.ion-page');
    this.cargaViaje()
    this.cargaViajeTomados()
    this.cargaUsuario(this.credentials.username)
    console.log("Hola Mundo")
    console.log(this.state.credentials.username)
  }

  cargaUsuario(user : string){
    this.authService.obtenerCorreo(user).subscribe(
      (data) =>{
        this.viaje_ida = data.viaje_ida
        this.viaje_vuelta = data.viaje_vuelta
      },
      error =>{
        console.log(error)
      }
    )

  }

  cargaViajeTomados(){
    this.authService.getViajesTomado().subscribe(
      (res) => {
        console.log(res);
        this.viajes_tomados = res;
      },
      error =>{
        console.log(error)
      }
    )
  }

  cargaViaje() {
    this.authService.getViajes().subscribe(
      (res) => {
        console.log(res);
        this.viajes = res;
        this.viajes.forEach((n : any) => {
          if (n.estado_viaje == 1 && n.tipo_viaje == 0) {
            this.viajesVisiblesIda++;
          }
        });
        this.viajes.forEach((n : any) => {
          if (n.estado_viaje == 1 && n.tipo_viaje == 1) {
            this.viajesVisiblesVuelta++;
          }
        });
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
        //Obtener Correo
            this.authService.obtenerCorreo(user).subscribe(
              (data) => {
                const mail = data.mail; 
                console.log(mail);
                const correo = {
                    destinatario : mail,
                    asunto : this.asunto,
                    cuerpo : this.cuerpo
                  }
                  //Ingresar Viaje Tomado
                  this.authService.ingresarViajeTomado(data.user, viaje.patente).subscribe(
                    response =>{
                      console.log("Viaje Tomado weon conchetumare", response)
                      //Put de Viaje
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
                          if (viaje.tipo_viaje == 0){
                            data.viaje_ida = 1;
                            this.authService.putUsuario(data.user, data).subscribe(
                              response => {
                                console.log("Viaje Tomado Correctamente ", response)
                                window.location.reload()
                              },
                              error =>{
                                console.log("Error al tomar viaje ida ", error)
                              }
                            )
                          }else {
                            data.viaje_vuelta = 1;
                            this.authService.putUsuario(data.user, data).subscribe(
                              response => {
                                console.log("Viaje Tomado Correctamente ", response)
                                window.location.reload()
                              },
                              error =>{
                                console.log("Error al tomar viaje vuelta ", error)
                              }
                            )
                          }
                          //Enviar Correo
                          this.authService.enviarCorreo(correo).subscribe(
                            response => {
                              console.log(response);
                              window.location.reload();
                            },
                            error => {
                              console.error('Error al enviar el correo', error);
                              window.location.reload();
                            }
                          );
                    },
                    error => {
                      console.error('Error en las solicitudes PUT:', error);
                    }
                  );
              },
              error  => {
                console.error('Error al Ingresar Viaje Tomado', error);
                window.location.reload()
              }
            )
           // this.router.navigate(['/correo'], navegationExtras)
          },
          error => {
            console.error('Error al Obtener Correo:', error);
          }
        );

      }
    }

  }

  cancelarViaje(id : number, patente : string){
    for (const viaje of this.viajes) {
      if (viaje.patente == patente){
        viaje.capacidad += 1;
        viaje.estado_viaje = 1;
        if (viaje.tipo_viaje == 0){
          this.authService.obtenerCorreo(this.credentials.username).subscribe(
            (data) =>{
              data.viaje_ida = 0;
              this.authService.putUsuario(data.user, data).subscribe(
                response =>{
                  console.log("Usuario Modificado Correctamente ", response)
                  window.location.reload()
                },
                error => {
                  console.log("Error al modificar user viaje ida ", error)
                }
              )
            }
          )
        }else{
          this.authService.obtenerCorreo(this.credentials.username).subscribe(
            (data) =>{
              data.viaje_vuelta = 0;
              this.authService.putUsuario(data.user, data).subscribe(
                response =>{
                  console.log("Usuario Modificado Correctamente ", response)
                },
                error => {
                  console.log("Error al modificar user viaje vuelta ", error)
                }
              )
            }
          )

        }
        this.authService.putViaje(viaje.patente, viaje).subscribe(
          Response =>{
            console.log("Viaje Cancelado ", Response)
            for (const viaje_tomado of this.viajes_tomados){
              if (viaje_tomado.id_viaje == id){
                viaje_tomado.estado = 0;
                console.log(viaje_tomado.estado);
                this.authService.deleteViajeTomado(viaje_tomado.id_viaje).subscribe(
                  Response =>{

                    console.log("Viaje Cancelado ", Response)
                    window.location.reload()
                  }
                )
              }else{
                this.authService.obtenerCorreo(this.credentials.username).subscribe(
                  (data) =>{
                    data.viaje_vuelta = 0;
                    this.authService.putUsuario(data.user, data).subscribe(
                      response =>{
                        console.log("Usuario Modificado Correctamente ", response)
                      },
                      error => {
                        console.log("Error al modificar user viaje vuelta ", error)
                      }
                    )
                  }
                )
      
              }
            }
          },
          error =>{
            console.log("Error al cancelar el viaje ", error)
          }
        )
      }
    } 

  }

  finalizarViaje(id : number, patente : string){
    for (const viaje of this.viajes){
      if (viaje.capacidad !=0){
        console.log("Viaje no puede ser realizado ya que aun hay capacidad")
      }else{
        if (viaje.tipo_viaje == 0){
          this.authService.obtenerCorreo(this.credentials.username).subscribe(
            (data) =>{
              data.viaje_ida = 0;
              this.authService.putUsuario(data.user, data).subscribe(
                response =>{
                  console.log("Usuario Modificado Correctamente ", response)
                  this.authService.deleteViajeTomado(id).subscribe(
                    response =>{
                      console.log(response)
                      window.location.reload()
                    }
                  )
                  
                },
                error => {
                  console.log("Error al modificar user viaje ida ", error)
                }
              )
            }
          )

        }else {
          this.authService.obtenerCorreo(this.credentials.username).subscribe(
            (data) =>{
              data.viaje_vuelta = 0;
              this.authService.putUsuario(data.user, data).subscribe(
                response =>{
                  this.authService.deleteViajeTomado(id).subscribe(
                    response =>{
                      console.log(response)
                      window.location.reload()
                    }
                  )
                  console.log("Usuario Modificado Correctamente ", response)
                },
                error => {
                  console.log("Error al modificar user viaje vuelta ", error)
                }
              )
            }
          )

        }
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