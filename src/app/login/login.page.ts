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
  
  users : any = [];

  constructor(private router: Router, private http: HttpClient, private authService: AuthService) {}

  ngOnInit(){
    this.LoadUsers()
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

  LoadUsers(){
    this.authService.getUsers().subscribe(
      (res)=>{
        console.log(res);
        this.users = res;
      }
      ,
      (error)=>{
        console.log(error);
      }
    )
  }

  
  entrar(){
    for(const usuario of this.users){
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
