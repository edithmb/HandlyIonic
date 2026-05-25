import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router'; 
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api';
import { environment } from '../../environments/environment';

// Importamos los iconos
import { addIcons } from 'ionicons';
import { cameraOutline, idCardOutline, checkmarkCircle, cloudUploadOutline } from 'ionicons/icons';

@Component({
  selector: 'app-verify-identity',
  templateUrl: './verify-identity.page.html',
  styleUrls: ['./verify-identity.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})

export class VerifyIdentityPage implements OnInit {

  // Variables para saber si ya subieron las fotos
  selfieUploaded: boolean = false;
  docFrontUploaded: boolean = false;
  docBackUploaded: boolean = false;

  // variables para saber si ya subieron los archivos reales
  archivos: { selfie: File | null, front: File | null, back: File | null } = {
    selfie: null,
    front: null,
    back: null
  };

  constructor(
    private router: Router, 
    private toastController: ToastController,
    private apiService: ApiService 
  ) { 
    // Registramos los iconos
    addIcons({ cameraOutline, idCardOutline, checkmarkCircle, cloudUploadOutline });
  }

  ngOnInit() {
  }

  // Función que se dispara cuando el usuario elige un archivo de su galería/cámara
  onFileSelected(event: any, type: 'selfie' | 'front' | 'back') {
    const file = event.target.files[0];
    if (file) {
      // Aquí podrías guardar el archivo real en una variable si necesitas enviarlo al backend
      this.archivos[type] = file;

      // Cambiamos el estado visual
      if (type === 'selfie') this.selfieUploaded = true;
      if (type === 'front') this.docFrontUploaded = true;
      if (type === 'back') this.docBackUploaded = true;
    }
  }

  // === NOTIFICACIONES ===
  async presentToast(message: string, tipo: 'error' | 'exito' | 'aviso') {
    let clasePersonalizada = 'toast-handly ';
    if (tipo === 'error') clasePersonalizada += 'toast-error';
    if (tipo === 'exito') clasePersonalizada += 'toast-exito';
    if (tipo === 'aviso') clasePersonalizada += 'toast-aviso';

    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom',
      cssClass: clasePersonalizada
    });
    toast.present();
  }

  // Función final
  async verifyIdentity() {
    if (!this.selfieUploaded || !this.docFrontUploaded || !this.docBackUploaded) {
      this.presentToast('Por favor, sube las 3 fotografías requeridas.', 'aviso');
      return;
    }

    // datos en formato formdata
    const formData = new FormData();
    formData.append('selfie', this.archivos.selfie as Blob);
    formData.append('document_front', this.archivos.front as Blob);
    formData.append('document_back', this.archivos.back as Blob);
    const emailUsuario = localStorage.getItem('registro_email') || 'correo_de_prueba@gmail.com'; 
    formData.append('email', emailUsuario);
    console.log('Enviando fotos al servidor...');
    
    // peticion a la api 
    const apiUrl = `${environment.apiUrl}/upload-documents`;

    this.apiService.uploadDocuments(formData).subscribe({
      next: async (response: any) => {
        console.log('Fotos subidas con éxito:', response);
        localStorage.removeItem('registro_email');
        await this.presentToast('¡Documentos enviados! Por favor, inicia sesión para comprobar tu estado.', 'exito');
        this.router.navigate(['/sign-in']); // Lo mandamos al login a esperar
      },
      error: (err) => {
        console.error('Error al subir fotos:', err);
        this.presentToast('Hubo un error al subir los documentos. Inténtalo de nuevo.', 'error');
      }
    });

  }
}