import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-receive-budget',
  templateUrl: './receive-budget.component.html',
  styleUrls: ['./receive-budget.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class ReceiveBudgetComponent  implements OnInit {

  @Input() taskId!: number;
  taskDetails: any = null;
  loading: boolean = true;

  constructor(
    private modalCtrl: ModalController, 
    private apiService: ApiService) { }

  ngOnInit() {
    this.loadTaskDetails();
  }


  regresar() {
    this.modalCtrl.dismiss();
  }

  aceptar() {
    if (!this.taskDetails || !this.taskDetails.budget_id) return;

    // Llamamos a la API real de tu compañera
    this.apiService.acceptBudget(this.taskDetails.budget_id).subscribe({
      next: (res) => {
        console.log('Presupuesto aceptado con éxito en BD');
        // Cerramos el modal enviando un mensaje de éxito a la pantalla principal
        this.modalCtrl.dismiss({ accion: 'aceptado', tarea: this.taskDetails });
      },
      error: (err) => console.error('Error al aceptar', err)
    });
  }

  rechazar() {
    console.log('Presupuesto rechazado');
    this.modalCtrl.dismiss({ accion: 'rechazar' });
  }

  loadTaskDetails() {
    this.apiService.getTaskDetails(this.taskId).subscribe({
      next: (res: any) => {
        this.taskDetails = res.data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading budget details:', err);
        this.loading = false;
      }
    });
  }
}