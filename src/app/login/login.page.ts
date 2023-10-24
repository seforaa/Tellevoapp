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

  hide = true;
  usuarios : any = [];
  autos : any = [];
  users: any = [];
  loginerror: boolean = false;
  loginvacio: boolean = false;

  constructor(private router: Router, private http: HttpClient, private authService: AuthService) { }

  ngOnInit(){
    this.cargaUsuarios()
    this.cargaAutos()
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

  cargaAutos(){
    this.authService.getAutos().subscribe(
      (res)=>{
        console.log(res);
        this.autos = res;
      }
      ,
      (error)=>{
        console.log(error);
      }
    )
  }

  
  entrar(){
    for(const usuario of this.usuarios){
      if(usuario.user===this.credentials.username && usuario.password === this.credentials.password){
        localStorage.setItem('ingresado','true');
        let navegationExtras: NavigationExtras = {
          state: {
            credentials: this.credentials
          }
        }
        this.router.navigate(['/home'], navegationExtras)
        console.log("correcto");
      }
      else if(this.credentials.username == "" || this.credentials.password  == ""){
        this.loginvacio = true;
        this.loginerror = false;
      }
      else {
        this.loginerror = true;
        this.loginvacio = false;
      }
    }
  }
}