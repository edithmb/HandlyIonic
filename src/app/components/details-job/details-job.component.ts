import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { FormBudgetComponent } from '../form-budget/form-budget.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
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
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.tareaCompleta = this.tareaDatos; // datos basicos mostrados al instante
    this.cargarDetallesCompletos(); //pedimos los que faltan
  }

  cargarDetallesCompletos() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const apiUrl = `${environment.apiUrl}/tasks/${this.tareaDatos.task_id}/details`;

    this.http.get(apiUrl, { headers }).subscribe({
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
  });
  
  await modal.present();

  // Si quieres que al enviar el presupuesto se cierren AMBOS modales:
  const { data } = await modal.onDidDismiss();
  if (data && data.enviado) {
    this.modalCtrl.dismiss(); // Cierra el modal de detalles también
  }
}

  rechazar() {
    console.log('Solicitud rechazada');
    this.modalCtrl.dismiss();
  }

}
