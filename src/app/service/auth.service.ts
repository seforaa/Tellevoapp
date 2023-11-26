import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/internal/operators/retry';

interface User {
  user: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiURL = 'http://127.0.0.1:8000/';//https://f2g52rkf-8000.brs.devtunnels.ms/ 

  //private apiURL = 'https://f2g52rkf-8000.brs.devtunnels.ms/';

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<any> { 
    return this.http.get(this.apiURL + 'lista_usuarios/').
    pipe(retry(2)); 
  }

  getViajes():Observable<any> {
    return this.http.get(this.apiURL+'lista_viaje/').
    pipe(retry(2))
  }

  postViaje(data: any) {
    return this.http.post(this.apiURL+'lista_viaje/', data);
  }

  putViaje(patente : any, data : any){
    return this.http.put(this.apiURL+'detalle_viaje/'+patente, data);
  }

  enviarCorreo(data : any){
    return this.http.post(this.apiURL+'enviar_correo/', data);
  }

  eliminarViaje(patente : any, data:any){
    return this.http.delete(this.apiURL+'detalle_viaje/'+patente, data);
  }
}
