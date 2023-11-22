import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})


export class LoginPage {
  credentials = {
    username: "",
    password: ""
  }

  tipo_user : any;

  hide = true;
  usuarios : any = [];
  viajes : any = [];
  users: any = [];
  loginerror: boolean = false;
  loginvacio: boolean = false;
  error: boolean = false;

  constructor(private router: Router, private http: HttpClient, private authService: AuthService) { }

  ngOnInit(){
    this.cargaUsuarios()
    this.cargaViajes()
  }

  ionViewWillEnter() {
    // Limpiar los campos de entrada al volver a la página de inicio
    this.credentials.username = "";
    this.credentials.password = "";

    // Restablecer las banderas de error
    this.loginerror = false;
    this.loginvacio = false;
  }

  login(){
    return this.http.get("http://127.0.0.1:8000/lista_usuarios/").subscribe(
      data=>{
        console.log(data)
      }
    )
  }

  cargaUsuarios(){
    this.authService.getUsuarios().subscribe(
      (res)=>{
        console.log(res);
        this.usuarios = res;
      }
      ,
      (error)=>{
        console.log(error);
      }
    )
  }

  cargaViajes(){
    this.authService.getViajes().subscribe(
      (res)=>{
        console.log(res);
        this.viajes = res;
      }
      ,
      (error)=>{
        console.log(error);
      }
    )
  }

  
  entrar(){
    if(this.credentials.username == "" || this.credentials.password  == ""){
      this.loginvacio = true;
      this.loginerror = false;
      this.error = false;
      console.log("vacio")
    }
    else if (this.usuarios.length>0){
      for(const usuario of this.usuarios){
        if(usuario.user===this.credentials.username && usuario.password === this.credentials.password){
          localStorage.setItem('ingresado','true');
          let navegationExtras: NavigationExtras = {
            state: {
              credentials: this.credentials,
              tipo : usuario.tipo_user
              
            }
          }
          this.router.navigate(['/home'], navegationExtras)
          console.log("correcto");
        }
        else {
          this.loginvacio = false;
          this.loginerror = true;
          this.error = false;
          console.log("ta mal")
    
        }
      }
    }
    else {
      this.loginvacio = false;
      this.loginerror = false;
      this.error = true;
      console.log("No hay Usuarios Registrados")

    }
  }
}