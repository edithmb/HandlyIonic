import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { ApiService } from '../services/api';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon } from '@ionic/angular/standalone';

import { 
  documentTextOutline, 
  closeCircleOutline, 
  briefcaseOutline, 
  checkmarkCircleOutline, 
  notificationsOutline,
  notificationsOffOutline
} from 'ionicons/icons';



@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, CommonModule, FormsModule]
})
export class NotificationsPage implements OnInit {

  notifications: any[] = [];

  constructor(
    private apiService: ApiService,
    private route: Router
  ) {
    addIcons({ 
      documentTextOutline, 
      closeCircleOutline, 
      briefcaseOutline, 
      checkmarkCircleOutline, 
      notificationsOutline,
      notificationsOffOutline
    });
   }

  ionViewWillEnter() {
    this.loadNotifications();
  }

  ngOnInit() {
  }

  loadNotifications() {
    this.apiService.getNotificaciones().subscribe({
      next: (res: any) => {
        this.notifications = res.data;
      },
      error: (err) => console.error('Error loading notifications:', err)
    });
  }

  getIconName(title: string): string {
    const titulo = title.toLowerCase();
    if (titulo.includes('presupuesto')) return 'document-text-outline';
    if (titulo.includes('rechazada') || titulo.includes('rechazado')) return 'close-circle-outline';
    if (titulo.includes('nueva solicitud')) return 'briefcase-outline';
    if (titulo.includes('aceptado')) return 'checkmark-circle-outline';
    return 'notifications-outline'; // Icono por defecto
  }

  getIconColor(title: string): string {
    const titulo = title.toLowerCase();
    // Naranja (Primary) para presupuestos
    if (titulo.includes('presupuesto')) return 'var(--ion-color-primary)';
    // Gris/Rojo suave (Medium) para rechazos
    if (titulo.includes('rechazada') || titulo.includes('rechazado')) return 'var(--ion-color-medium)';
    // Verde (Secondary) para aceptados
    if (titulo.includes('aceptado')) return 'var(--ion-color-secondary)';
    // Azul (Tertiary) para nuevas solicitudes
    if (titulo.includes('nueva solicitud')) return 'var(--ion-color-tertiary)';
    
    return 'var(--ion-color-dark)';
  }

  openNotification(notif: any) {
    notif.is_read = 1;

    // 2. Aquí puedes redirigir a los detalles de la tarea para ver el presupuesto
    // this.router.navigate(['/task-details'], { queryParams: { id: notif.task_id } });
  }
}
