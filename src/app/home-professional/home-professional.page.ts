import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { IonicModule } from '@ionic/angular';
import { SharedMenuComponent } from '../components/shared-menu/shared-menu.component';
import { RouterLink, Route, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { DetailsJobComponent } from '../components/details-job/details-job.component'; // Verifica que la ruta sea la correcta
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { notificationsOutline, constructOutline, home, calendarOutline, chatbubblesOutline, personOutline } from 'ionicons/icons';

addIcons({ notificationsOutline, constructOutline, home, calendarOutline, chatbubblesOutline, personOutline });

@Component({
  selector: 'app-home-professional',
  templateUrl: './home-professional.page.html',
  styleUrls: ['./home-professional.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, SharedMenuComponent, RouterLink]
})
export class HomeProfessionalPage implements OnInit {

  // Variables para la vista
  userName: string = 'Profesional';
  tareasPendientes: any[] = [];

  constructor(
    private modalCtrl: ModalController, 
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    // nombre del usuario logueado
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const userObj = JSON.parse(userStr);
      this.userName = userObj.name || 'Profesional';
    }
    // pedimos tareas al backend
    this.cargarTareas();
  }

  cargarTareas() {
    const token = localStorage.getItem('token');
    
    // enviar token porque es una ruta protegida
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const apiUrl = `${environment.apiUrl}/tasks/professional`;

    this.http.get(apiUrl, { headers }).subscribe({
      next: (response: any) => {
        // 'succes' o 'success' por culpa del backend (por si se corrige)
        if (response.status === 'succes' || response.status === 'success') {
          this.tareasPendientes = response.data;
          console.log('Tareas recibidas:', this.tareasPendientes);
        }
      },
      error: (err) => {
        console.error('Error al obtener las tareas:', err);
      }
    });
  }

  async abrirDetalles(tarea: any) {
    console.log('Abriendo detalles de:', tarea.title);
    const modal = await this.modalCtrl.create({
      component: DetailsJobComponent,
      cssClass: 'modal-detalles-job',
      componentProps: {
        tareaDatos: tarea // le pasamos los datos al componente hijo
      }
    });
    return await modal.present();
  }

    cerrarSesion() {
    // 1. Limpiamos el rastro del usuario en el navegador
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // 2. Lo mandamos de vuelta al login
    this.router.navigate(['/sign-in']);
  }

}
