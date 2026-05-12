import { Component, OnInit, Input } from '@angular/core';
import { ModalController, IonicModule, ToastController } from '@ionic/angular';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-form-request-job',
  templateUrl: './form-request-job.component.html',
  styleUrls: ['./form-request-job.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule]
})
export class FormRequestJobComponent  implements OnInit {

  @Input() professionalId!: number;
  @Input() professionId!: number;

  titulo: string = '';
  descripcion: string = '';
  fotosBase64: string[] = [];

  constructor(
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private apiService: ApiService
  ) { }

  cerrar() {
  this.modalCtrl.dismiss();
}

send() {
// 1. Validaciones básicas
    if (!this.titulo || !this.descripcion) {
      this.showMessage('Por favor, añade un título y una descripción.');
      return;
    }

    // 2. Preparamos los datos EXACTAMENTE como los pide Laravel
    const taskData = {
      professional_id: this.professionalId,
      profession_id: this.professionId, // Idealmente esto también viene del perfil
      title: this.titulo,
      description: this.descripcion,
      photo_1: this.fotosBase64[0] || null, // Si hay primera foto, se envía, si no, null
      photo_2: this.fotosBase64[1] || null  // Igual para la segunda
    };

    // 3. Enviamos a la base de datos
    this.apiService.createTask(taskData).subscribe({
      next: (res: any) => {
        this.showMessage('¡Solicitud enviada con éxito!');
        this.modalCtrl.dismiss({ success: true }); // Cerramos y avisamos que todo salió bien
      },
      error: (err) => {
        console.error(err);
        this.showMessage('Error al enviar la solicitud. Revisa la consola.');
      }
    });
  }

  async showMessage(mensaje: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2500,
      position: 'bottom'
    });
    toast.present();
  }

  ngOnInit() {}

  async takeFoto() {
    if (this.fotosBase64.length >= 2) {
      this.showMessage('Solo puedes subir hasta 2 fotos por ahora.');
      return;
    }

    try {
      const image = await Camera.getPhoto({
        quality: 70,
        allowEditing: false,
        resultType: CameraResultType.Base64, // Tu compañera lo preparó para recibir Base64
        source: CameraSource.Prompt // Pregunta si quiere usar cámara o galería
      });

      if (image.base64String) {
        // Le añadimos el encabezado para que se pueda mostrar en un <img> en HTML si queremos
        this.fotosBase64.push(`data:image/jpeg;base64,${image.base64String}`);
      }
    } catch (error) {
      this.showMessage('El usuario canceló la foto');
      console.log('El usuario canceló la foto', error);
    }
  }

  deletePhoto(index: number) {
    this.fotosBase64.splice(index, 1);
  }


}