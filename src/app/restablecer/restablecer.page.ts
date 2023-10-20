import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restablecer',
  templateUrl: './restablecer.page.html',
  styleUrls: ['./restablecer.page.scss'],
})
export class RestablecerPage implements OnInit {
  hide = true;
  user : string ='';

  constructor(private router: Router) { }

  ngOnInit() {

  }

  ingresar() {
    this.router.navigate(['/home', this.user]);
    this.limpiar()
  }


  limpiar() {
    this.user = '';
  }

}
