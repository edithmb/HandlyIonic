import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { FormBudgetComponent } from '../form-budget/form-budget.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ApiService } from '../../services/api';
// Importamos iconos 
import { addIcons } from 'ionicons';
import { arrowBackOutline, locationOutline, timeOutline, playCircleOutline, calendarOutline } from 'ionicons/icons';

addIcons({ arrowBackOutline, locationOutline, timeOutline, playCircleOutline, calendarOutline });

@Component({
  selector: 'app-details-job',
  templateUrl: './details-job.component.html',
  styleUrls: ['./details-job.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class DetailsJobComponent  implements OnInit {

  // resumen desde home
  @Input() tareaDatos: any;
 // lo que falta de la tarea
  tareaCompleta: any = null;
  cargandoMultimedia: boolean = true;

  constructor(
    private modalCtrl: ModalController,
    private http: HttpClient,
    private toastController: ToastController,
    private apiService: ApiService

  ) { }

  

  ngOnInit() {
    this.tareaCompleta = this.tareaDatos; // datos basicos mostrados al instante
    this.cargarDetallesCompletos(); //pedimos los que faltan
  }

  cargarDetallesCompletos() {
    this.apiService.getTaskDetails(this.tareaDatos.task_id).subscribe({
      next: (response: any) => {
        if (response.status === 'success') {
          this.tareaCompleta = response.data;
          this.cargandoMultimedia = false;
        }
      },
      error: (err) => {
        console.error('Error al cargar detalles extra:', err);
        this.cargandoMultimedia = false;
      }
    });
  }

  regresar() {
    this.modalCtrl.dismiss();
  }

  enviarMensaje() {
    console.log('Ir al chat de la tarea:', this.tareaCompleta.task_id);
  }

async hacerOferta() {
  const modal = await this.modalCtrl.create({
    component: FormBudgetComponent,
    componentProps: { 
        taskId: this.tareaCompleta.task_id,
        tareaCompleta: this.tareaCompleta
      }
  });
  
  await modal.present();

  // Si quieres que al enviar el presupuesto se cierren AMBOS modales:
  const { data } = await modal.onDidDismiss();
  if (data && data.enviado) {
    this.modalCtrl.dismiss(); // Cierra el modal de detalles también
  }
}

  async rechazar() {
    this.apiService.updateTaskStatus(this.tareaCompleta.task_id, 6).subscribe({
      next: async (response: any) => {
        // Mostramos el mensaje de éxito
        const toast = await this.toastController.create({
          message: 'Solicitud rechazada correctamente.',
          duration: 3000,
          position: 'bottom',
          color: 'dark'
        });
        await toast.present();

        // Cerramos el modal y podemos pasarle un aviso al Home para que recargue la lista
        this.modalCtrl.dismiss({ recargar: true });
      },
      error: async (err) => {
        console.error('Error al rechazar:', err);
        const toast = await this.toastController.create({
          message: 'Error al rechazar la solicitud.',
          duration: 3000,
          position: 'bottom',
          color: 'danger'
        });
        await toast.present();
      }
    });
  }

}
