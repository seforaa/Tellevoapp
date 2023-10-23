import { Component } from '@angular/core';
import { Router, ActivatedRoute, RouterLinkWithHref} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  state: any;
  credentials: any;
 
  autos: any = [];

  constructor( private authService: AuthService, private http: HttpClient, private activeroute: ActivatedRoute, private router: Router) {
    this.activeroute.queryParams.subscribe(params => {
      this.state = this.router.getCurrentNavigation()?.extras.state;
      this.credentials = this.state.credentials
      console.log(this.credentials);
    });
  }

  ngOnInit(){
    this.cargaAutos()
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
 
  
  salir(){
    localStorage.removeItem('ingresado');
    this.router.navigate(['/login']);
  }

  
}
