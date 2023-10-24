import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
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

  users: any = [];
  loginerror: boolean = false;
  loginvacio: boolean = false;

  constructor(private router: Router, private http: HttpClient, private authService: AuthService) { }

  ngOnInit() {
    this.getUsers().subscribe(res => {
      console.log("Res", res)
      this.users = res;
      console.log("hola", this.users)
    });
  }

  ionViewWillEnter() {
    // Limpiar los campos de entrada al volver a la página de inicio
    this.credentials.username = "";
    this.credentials.password = "";

    // Restablecer las banderas de error
    this.loginerror = false;
    this.loginvacio = false;
  }

  getUsers() {
    return this.http.get("assets/files/db.json").pipe(
      map((res: any) => {
        return res.data;
      })
    )
  }


  entrar() {
    for (const usuario of this.users) {
      if (usuario.user === this.credentials.username && usuario.password === this.credentials.password) {
        localStorage.setItem('ingresado', 'true');
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
      }
      else {
        this.loginerror = true;
      }
    }
  }
}
