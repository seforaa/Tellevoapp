import { Component } from '@angular/core';
import { Router, ActivatedRoute, RouterLinkWithHref} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  state: any;
  credentials: any;
 
  autos: any = [];

  constructor( private http: HttpClient, private activeroute: ActivatedRoute, private router: Router) {
    this.activeroute.queryParams.subscribe(params => {
      this.state = this.router.getCurrentNavigation()?.extras.state;
      this.credentials = this.state.credentials
      console.log(this.credentials);
    });
  }

  ngOnInit(){
    this.getAutos().subscribe(res=>{
      console.log("res", res)
      this.autos = res;
    })
  }

  getAutos(){
    return this.http.get("assets/files/autos.json").pipe(
      map((res:any)=>{
        return res.data;
      })
    )
  }
  
  salir(){
    localStorage.removeItem('ingresado');
    this.router.navigate(['/login']);
  }

  
}
