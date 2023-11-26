import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router, ActivatedRoute, NavigationExtras, RouterLink} from '@angular/router';

@Component({
  selector: 'app-correo',
  templateUrl: './correo.page.html',
  styleUrls: ['./correo.page.scss'],
})
export class CorreoPage implements OnInit {

  correo : any;

  state: any;
  credentials: any;
  tipo_user : any;
  
  destinatario: any;
  asunto: string = 'Viaje';
  cuerpo: string = 'Tu Viaje ya esta listo';

  constructor(private authService: AuthService, private router: Router, private activeroute: ActivatedRoute) { 
    this.activeroute.queryParams.subscribe(params => {
      this.state = this.router.getCurrentNavigation()?.extras.state;
      this.credentials = this.state.credentials
      this.tipo_user = this.state.tipo_user
      console.log(this.credentials.username+' desde el home El tipo es:', this.tipo_user);
    });
  }

  ngOnInit() {
  }

  enviar(){
    console.log(this.correo);
  
    
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
    };

    const correo = {
      destinatario : this.correo,
      asunto : this.asunto,
      cuerpo : this.cuerpo
    }
    this.authService.enviarCorreo(correo).subscribe(
      (respuesta) => {
        console.log(respuesta);
        this.router.navigate(['/home'], navegationExtras).then(() => {
          console.log('Vista de /home recargada');
          window.location.reload();
        });
      },
      (error) => {
        console.error('Error al enviar el correo', error);
        // Puedes manejar el error aquí, por ejemplo, mostrar un mensaje al usuario.
      }
    );

    console.log(correo);
    
  }

}
