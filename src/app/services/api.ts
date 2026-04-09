import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Api {
  private baseUrl = 'http://127.0.0.1:8000/api/login';

  constructor(private http: HttpClient) { }

  // 1. INICIAR SESIÓN
  // Le enviamos el correo y contraseña, y la API nos devuelve los datos y el ROL
  login(credenciales: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, credenciales);
  }
}
