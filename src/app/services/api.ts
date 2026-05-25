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

  //Para que el cliente descargue sus notificaciones
  getNotificaciones() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.get(`${this.baseUrl}/notifications`, { headers });
  }

// Para que el profesional envíe el presupuesto (Actualizado para recibir el payload completo)
  enviarPresupuesto(taskId: number, payload: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.post(`${this.baseUrl}/tasks/${taskId}/budget`, payload, { headers });
  }

  //Para que el profesional rechace la tarea (Cambia el estado a 3 = Rechazado)
  rechazarSolicitud(taskId: number) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.patch(`${this.baseUrl}/tasks/${taskId}/status`, { task_state_id: 3 }, { headers });
  }

  acceptBudget(budgetId: number) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.patch(`${this.baseUrl}/budgets/${budgetId}/accept`, {}, { headers });
  }

  getTaskDetails(taskId: number) {
    const token = localStorage.getItem('token'); // Sacamos el token de la sesión
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    
    // Llamamos a la ruta exacta que tiene tu compañera en el api.php
    return this.http.get(`${this.baseUrl}/tasks/${taskId}/details`, { headers });
  }

  getClientTasks() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.get(`${this.baseUrl}/tasks/client`, { headers });
  }

  // Para verificar el email con el código OTP
  verifyEmail(payload: any) {
    return this.http.post(`${this.baseUrl}/verify-email`, payload);
  }

  // Función para subir los documentos de identidad (recibe FormData)
  uploadDocuments(formData: FormData) {
    return this.http.post(`${this.baseUrl}/upload-documents`, formData);
  }

  // Para actualizar el estado de una tarea 
  updateTaskStatus(taskId: number, statusId: number) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.patch(`${this.baseUrl}/tasks/${taskId}/status`, { task_state_id: statusId }, { headers });
  }
  // Función para registrar a un cliente
  registerClient(payload: any) {
    return this.http.post(`${this.baseUrl}/register/client`, payload);
  }
}