import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-form-budget',
  templateUrl: './form-budget.component.html',
  styleUrls: ['./form-budget.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class FormBudgetComponent  implements OnInit { 

  @Input() taskId!: number;
  @Input() tareaCompleta: any;

  notasProfesional: string = "";
  precioOferta: number | null = null;
  incluyeMateriales: boolean = true;
  enviando: boolean = false;

  constructor(
    private modalCtrl: ModalController,
    private http: HttpClient,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    console.log('Haciendo presupuesto para la tarea ID:', this.taskId);
    console.log('Datos de la tarea:', this.tareaCompleta);
  }

  regresar() {
    this.modalCtrl.dismiss();
  }

  async presentToast(message: string, tipo: 'error' | 'exito' | 'aviso') {
    let clasePersonalizada = 'toast-handly ';
    if (tipo === 'error') clasePersonalizada += 'toast-error';
    if (tipo === 'exito') clasePersonalizada += 'toast-exito';
    if (tipo === 'aviso') clasePersonalizada += 'toast-aviso';

    const toast = await this.toastController.create({
      message: message, duration: 3000, position: 'bottom', cssClass: clasePersonalizada
    });
    toast.present();
  }

  enviarPresupuesto() {
    // validamos que haya puesto precio
    if (!this.precioOferta || this.precioOferta <= 0) {
      this.presentToast('Por favor, indica un precio válido.', 'aviso');
      return;
    }
    this.enviando = true;

    // Preparamos los datos
    const payload = {
      agreed_price: this.precioOferta,
      notes: this.notasProfesional,
      includes_materials: this.incluyeMateriales
    };

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // llamada a api
    const apiUrl = `${environment.apiUrl}/tasks/${this.taskId}/budget`;

    // Hacemos el POST 
    this.http.post(apiUrl, payload, { headers }).subscribe({
      next: (response: any) => {
        this.enviando = false;
        this.presentToast('¡Presupuesto enviado con éxito!', 'exito');
        // Cerramos y avisamos que se envió bien
        this.modalCtrl.dismiss({ enviado: true });
      },
      error: (err) => {
        this.enviando = false;
        console.error('Error al enviar presupuesto:', err);
        const mensajeError = err.error?.message || 'Error al enviar el presupuesto.';
        this.presentToast(mensajeError, 'error');
      }
    });
  }

  // Función para que solo uno de los checkboxes esté activo (tipo radio button)
  toggleMateriales(opcion: boolean) {
    this.incluyeMateriales = opcion;
  }

}
