import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { ApiService } from '../services/api';
import { ReceiveBudgetComponent } from '../components/receive-budget/receive-budget.component';
import { SharedMenuComponent } from '../components/shared-menu/shared-menu.component';
import { SuccessModalComponent } from '../components/success-modal/success-modal.component'; 
import { ModalController } from '@ionic/angular';
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
  imports: [IonContent, IonHeader, SharedMenuComponent, IonTitle, IonToolbar, IonIcon, CommonModule, FormsModule]
})
export class NotificationsPage implements OnInit {

  notifications: any[] = [];

  constructor(
    private apiService: ApiService,
    private router: Router,
    private modalController: ModalController
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

  async openNotification(notif: any) {
    notif.is_read = 1;
    const titulo = notif.title.toLowerCase();

    console.log('1. Clic en notificación:', titulo);
    console.log('2. ID de la tarea a buscar:', notif.task_id);

    if (titulo.includes('presupuesto')) {
      const modal = await this.modalController.create({
        component: ReceiveBudgetComponent,
        componentProps: { taskId: notif.task_id }
      });
      await modal.present();
    } 
    
    // AQUÍ ES DONDE ENTRA EL PROFESIONAL
    else if (titulo.includes('aceptado')) {
      console.log('3. ¡Detectó que es aceptado! Llamando a la API...');
      
      this.apiService.getTaskDetails(notif.task_id).subscribe({
        next: async (res: any) => {
          console.log('4. API respondió con éxito:', res);
          const tarea = res.data;

          const modal = await this.modalController.create({
            component: SuccessModalComponent,
            componentProps: {
              isProfessional: true,
              namePerson: `${tarea.client_name} ${tarea.client_surname}`, 
              titleTask: tarea.title,
              setTime: tarea.accorded_time ? `Hoy, ${tarea.accorded_time}` : 'Lo antes posible',
              tokenQr: tarea.token_qr 
            }
          });
          
          console.log('5. Abriendo modal verde/azul...');
          await modal.present();
        },
        error: (err) => {
          // Si el modal no se abre, este error rojo nos dirá EXACTAMENTE por qué
          console.error('ERROR FATAL al descargar detalles de la tarea:', err);
          alert('Hubo un error de conexión con el servidor.');
        }
      });
    } 
    
    else {
      this.router.navigate(['/task-details'], { queryParams: { id: notif.task_id } });
    }
  }
}
