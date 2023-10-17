import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage{
  user = {
    username :  "",
    password :  ""
  }
  hide = true;
  

  constructor(private router: Router) {}

  ingresar() {
    let navegationExtras: NavigationExtras = {
      state: {
        user: this.user
      }
    }
    this.router.navigate(['/home'], navegationExtras)
  }
}
