import { Component, OnInit, Input, ViewChild, ElementRef, NgZone } from '@angular/core';
import { ModalController, IonicModule, ToastController } from '@ionic/angular';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Geolocation } from '@capacitor/geolocation';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ApiService } from '../../services/api';

declare var google: any;

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
  videoBase64: string[] = [];

  direccionVisual: string = 'Obteniendo ubicación actual...';
  tiempoSeleccionado: string = 'Lo antes posible';

  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private apiService: ApiService,
    private ngZone: NgZone
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
      photo_2: this.fotosBase64[1] || null,
      video_1: this.videoBase64[0] || null,
      video_2: this.videoBase64[1] || null,
      address: this.direccionVisual,
      scheduled_time: this.tiempoSeleccionado // Igual para la segunda
    };

    //Enviamos a la base de datos
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

  loadMultimedia(event: Event) {

    const input = event.target as HTMLInputElement;
  
    if (!input.files || input.files.length === 0) return;
    const file = input.files[0];

    const isVideo = file.type.startsWith('video/');
    const isImage = file.type.startsWith('image/');

    // Validamos límites
    if (isImage && this.fotosBase64.length >= 2) {
      this.showMessage('Solo puedes subir un máximo de 2 fotos.');
      return;
    }
    if (isVideo && this.videoBase64.length >= 2) {
      this.showMessage('Solo puedes subir un máximo de 2 videos.');
      return;
    }

    // Convertimos el archivo a Base64 para enviarlo al backend
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64 = reader.result as string;
      if (isImage) this.fotosBase64.push(base64);
      if (isVideo) this.videoBase64.push(base64);
    };

    // Limpiamos el input
    input.value = '';
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click(); // Simula un clic en el input oculto
  }

  async getLocation() {
    try {
      // 1. Pedimos las coordenadas al GPS
      const position = await Geolocation.getCurrentPosition();
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      console.log("Coordenadas obtenidas:", lat, lng);

      // 2. Traducimos a calle con Google
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: { lat, lng } }, (resultados: any, status: string) => {
        
        // 3. ¡Despertamos a Angular para que actualice la pantalla!
        this.ngZone.run(() => {
          if (status === 'OK' && resultados[0]) {
            // Ponemos la dirección real (Ej: "Carrer de Mallorca 401, Barcelona")
            this.direccionVisual = resultados[0].formatted_address;
            console.log("Calle encontrada:", this.direccionVisual);
          } else {
            this.direccionVisual = 'No se pudo traducir la ubicación. Escribe tu calle.';
          }
        });

      });
    } catch (error) {
      // Si el usuario no dio permisos de GPS o falla algo
      this.ngZone.run(() => {
        console.error("Error obteniendo GPS:", error);
        this.direccionVisual = 'Ubicación denegada. Por favor, escribe tu dirección manualmente.';
      });
    }
  }

  ngOnInit() {
    this.getLocation();
  }

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

  deleteVideo(index: number) {
    this.videoBase64.splice(index, 1);
  }
}