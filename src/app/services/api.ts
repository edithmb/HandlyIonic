import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  // Apuntamos al puerto 80 donde vive el contenedor de Laravel de tu compañera
  private baseUrl = 'http://localhost:80/api'; 

  constructor(private http: HttpClient) { }

  // Esta función es la que "llama a la puerta" de la URL de prueba
  probarConexion(): Observable<any> {
    return this.http.get(`${this.baseUrl}/professions`);
  }
}