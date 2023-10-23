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

  private apiURL = 'http://127.0.0.1:8000/'; 

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> { 
    return this.http.get(this.apiURL + 'lista_usuarios/').
    pipe(retry(10)); 
  }

  Ingresado(): boolean {
    return localStorage.getItem('usuarioLogeado') === 'true';
  }

}
