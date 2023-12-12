import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/internal/operators/retry';
import { forkJoin } from 'rxjs';

interface User {
  user: string;
  password: string;
  mail : string;
  tipo_user : number;
  viaje_ida : number;
  viaje_vuelta : number;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //private apiURL = 'http://127.0.0.1:8000/';//https://f2g52rkf-8000.brs.devtunnels.ms/ 

  private apiURL = 'https://f2g52rkf-8000.brs.devtunnels.ms/';

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<any> { 
    return this.http.get(this.apiURL + 'lista_usuarios/').
    pipe(retry(2)); 
  }

  getViajes():Observable<any> {
    return this.http.get(this.apiURL+'lista_viaje/').
    pipe(retry(2))
  }

  getViaje(patente : string){
    return this.http.get(this.apiURL+'detalle_viaje/'+patente)
  }

  getViajesTomado():Observable<any> {
    return this.http.get(this.apiURL+'viajeTomado')
  }

  postViaje(data: any) {
    return this.http.post(this.apiURL+'lista_viaje/', data);
  }

  putUsuario(user : string , data : any){
    return this.http.put(this.apiURL+'detalle_usuarios/'+user, data)
  }

  putViaje(patente : any, data : any){
    return this.http.put(this.apiURL+'detalle_viaje/'+patente, data);
  }  
  
  deleteViajeTomado(id : number){
    return this.http.delete(this.apiURL+'detalle_viaje_tomado/'+id);
  }

  deteleViaje(patente : string){
    return this.http.delete(this.apiURL+'detalle_viaje/'+patente);
  }

  enviarCorreo(data : any){
    return this.http.post(this.apiURL+'enviar_correo/', data);
  }

  eliminarViaje(patente : any, data:any){
    return this.http.put(this.apiURL+'detalle_viaje/'+patente, data);
  }

  obtenerCorreo(user : string): Observable<User>{
    return this.http.get<User>(this.apiURL+'detalle_usuarios/'+user);
  }

  ingresarViajeTomado(user: string, patente: string): Observable<any> {
    const viajeTomado = {
      usuario : user,
      viaje : patente,
      estado : 1
    }

    return this.http.post(this.apiURL+'viajeTomado', viajeTomado)
  }
  /*
  ingresarViajeTomado(user : string , patente : string){
    const usuarioObservable = this.http.get(this.apiURL + '/detalle_usuarios/' + user);
    const viajeObservable = this.http.get(this.apiURL + '/detalle_viaje/' + patente);

    // Utilizamos forkJoin para combinar ambas solicitudes en un solo Observable
    return forkJoin([usuarioObservable, viajeObservable]).subscribe(
      ([usuario, viaje]) => {
        // Las respuestas de las solicitudes están disponibles aquí
        const estado = 1;

        const viajeTomado = {
          usuario,
          viaje,
          estado
        };

        // Luego, realizamos la solicitud POST con el objeto construido
        this.http.post(this.apiURL + 'viajeTomado', viajeTomado).subscribe(
          response => {
            console.log('Solicitud POST exitosa:', response);
          },
          error => {
            console.error('Error en la solicitud POST:', error);
          }
        );
      },
      error => {
        console.error('Error en las solicitudes GET:', error);
      }
    )
  }}*/
}
