import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router'; 
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.page.html',
  styleUrls: ['./verify-email.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class VerifyEmailPage implements OnInit {

  // Variables
  userEmail: string = 'email@gmail.com'; 
  otpCode: string[] = ['', '', '', '', '', '']; // Array para los 6 dígitos

  constructor(private router: Router, private toastController: ToastController) { }

  ngOnInit() {
  }

  // === LA MAGIA DEL SALTO AUTOMÁTICO ===
  onKeyUp(event: any, index: number) {
    const input = event.target;
    const value = input.value;
    const key = event.key;

    // Si escribe un número y no está en la última caja, salta a la siguiente
    if (value.length === 1 && index < 5 && key !== 'Backspace') {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }

    // Si presiona borrar (Backspace) y la caja está vacía, salta a la anterior
    if (key === 'Backspace' && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
      }
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

  // === ACCIONES DE LOS BOTONES ===
  async verifyCode() {
    // Unimos los 6 pedazos del array en un solo string (ej: "123456")
    const fullCode = this.otpCode.join('');

    // Validamos que hayan llenado las 6 cajas
    if (fullCode.length < 6) {
      this.presentToast('Por favor, ingresa los 6 dígitos del código.', 'aviso');
      return;
    }

    console.log('Enviando código al backend para verificar:', fullCode);

    // Simulación de éxito (Aquí iría la llamada a tu ApiService)
    await this.presentToast('¡Correo verificado con éxito!', 'exito');

    this.router.navigate(['/verify-identity']);
  }

  resendCode() {
    console.log('Solicitando nuevo código para:', this.userEmail);
    // Limpiamos las cajas para que vuelvan a escribir
    this.otpCode = ['', '', '', '', '', ''];
    this.presentToast('Te hemos enviado un nuevo código.', 'aviso');
    
  }
}
