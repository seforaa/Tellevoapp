import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restablecer',
  templateUrl: './restablecer.page.html',
  styleUrls: ['./restablecer.page.scss'],
})
export class RestablecerPage implements OnInit {
  hide = true;
  public alertButtons = ['OK'];
  username: string ="";
  error: boolean = false;
  mensaje: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  restablecer() {
    if(this.username ==""){
      this.error = true;
    }else{
      this.mensaje = true;
      this.router.navigate(['/home']);
    }
  }
}
