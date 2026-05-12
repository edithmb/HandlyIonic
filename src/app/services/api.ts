import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  // Apuntamos al puerto 80 donde vive el contenedor de Laravel de tu compañera
  private baseUrl = environment.apiUrl; 

  constructor(private http: HttpClient) { }

  // Función de login que envía las credenciales al backend
  login(credenciales: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credenciales);
  }

  // Función para obtener las profesiones disponibles
  getProfessionalJobs(): Observable<any> {
    return this.http.get(`${this.baseUrl}/professions`);
  }

  // Función para obtener profesionales por categoría
  getProfessionalsByCategory(professionId: string) {
    return this.http.get(`${this.baseUrl}/professionals?profession_id=${professionId}`);
  }

  getProfessionalById(id: string) {
    return this.http.get(`${this.baseUrl}/professionals/${id}`);
  }

  createTask(taskData: any) {
    // Obtenemos el token del cliente que inició sesión (asumiendo que lo guardaste en localStorage al hacer login)
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(`${this.baseUrl}/tasks`, taskData, { headers });
  }
}