import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage{
  credentials = {
    username :  "",
    password :  ""
  }
 
  hide = true;
  
  usuarios : any = [];
  autos : any = [];



  constructor(private router: Router, private http: HttpClient, private authService: AuthService) {}

  ngOnInit(){
    this.cargaUsuarios()
    this.cargaAutos()
  }

  ingresar() {
    localStorage.setItem('ingresado','true');
    let navegationExtras: NavigationExtras = {
      state: {
        credentials: this.credentials
      }
    }
    this.router.navigate(['/home'], navegationExtras)
    
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
    }
  }
}
