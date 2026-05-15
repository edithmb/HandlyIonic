import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { ApiService } from '../services/api';
import { SuccessModalComponent } from '../components/success-modal/success-modal.component';
import { ReceiveBudgetComponent } from '../components/receive-budget/receive-budget.component';
import { SharedMenuComponent } from '../components/shared-menu/shared-menu.component';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonSpinner, 
  IonList, IonItemSliding, IonItem, IonAvatar, IonLabel, 
  IonBadge, IonIcon 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { documentTextOutline, walletOutline, chevronForwardOutline } from 'ionicons/icons';

@Component({
  selector: 'app-chat-client',
  templateUrl: './chat-client.page.html',
  styleUrls: ['./chat-client.page.scss'],
  standalone: true,
  imports: [
    CommonModule, SharedMenuComponent, IonHeader, IonToolbar, IonTitle, 
    IonContent, IonSpinner, IonList, IonItemSliding, IonItem, 
    IonAvatar, IonLabel, IonBadge, IonIcon
  ]
})
export class ChatClientPage implements OnInit {

  tasks: any[] = [];
  loading: boolean = true;

  constructor(
    private apiService: ApiService,
    private modalCtrl: ModalController
  ) { 
    addIcons({ documentTextOutline, walletOutline, chevronForwardOutline });
  }

  ngOnInit() {
    this.loadClientBudgets();
  }

  ionViewWillEnter() {
    this.loadClientBudgets();
  }

  loadClientBudgets() {
    this.loading = true;
    this.apiService.getClientTasks().subscribe({
      next: (res: any) => {
        // Filtramos para mostrar solo las que tienen un presupuesto (id_estado = 1 o similar según tu BD)
        // O simplemente mostramos todas y destacamos las que tienen presupuesto.
        this.tasks = res.data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar tareas', err);
        this.loading = false;
      }
    });
  }

  async seeBudget(taskId: number) {
    const modal = await this.modalCtrl.create({
      component: ReceiveBudgetComponent,
      componentProps: {
        taskId: taskId
      }
    });

    modal.onDidDismiss().then(async (result) => {
      // Si el cliente le dio a "Aceptar presupuesto" y la API respondió bien
      if (result.data && result.data.accion === 'aceptado') {
        
        // 1. Recargamos la lista del fondo
        this.loadClientBudgets();

        // 2. Sacamos los datos de la tarea que nos devolvió el receive-budget
        const tarea = result.data.tarea;

        // 3. ¡ABRIMOS EL MODAL VERDE DE ÉXITO!
        const successModal = await this.modalCtrl.create({
          component: SuccessModalComponent,
          componentProps: {
            isProfessional: false, // Falso porque es la vista del Cliente (Color Verde, sin QR)
            namePerson: tarea.professional_name || 'el profesional', // Usamos el nombre real
            titleTask: tarea.title,
            setTime: tarea.accorded_time ? tarea.accorded_time : 'Lo antes posible'
          }
        });

        await successModal.present();
      }
    });

    await modal.present();
  }
}
