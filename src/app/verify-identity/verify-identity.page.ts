import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router'; 
import { FormsModule } from '@angular/forms';

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

  constructor(private router: Router, private toastController: ToastController) { 
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
      // this.misArchivos[type] = file;

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

    // Aquí iría la llamada final a tu ApiService para subir las fotos al servidor de Laravel
    console.log('Enviando fotos al servidor...');
    
    await this.presentToast('¡Identidad verificada! Bienvenido a HandLy.', 'exito');
    
    // Redirigir al inicio (Cambia la ruta según necesites)
    this.router.navigate(['/home-client']);
  }
}