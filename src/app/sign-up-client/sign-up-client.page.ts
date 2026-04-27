import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router'; 
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-sign-up-client',
  templateUrl: './sign-up-client.page.html',
  styleUrls: ['./sign-up-client.page.scss'],
  standalone: true,
  imports: [IonicModule, TranslateModule, CommonModule, FormsModule]
})
export class SignUpClientPage implements OnInit {

  registerData = {
    fullName:'',
    email: '',
    password: '',
    documentType: '',
    documentNumber: '',
    address: '',
    zipCode: '',
  };

  errorMessage: string = '';

  constructor(private router: Router, private toastController: ToastController) { }

  ngOnInit() {
  }

  async presentToast(message: string, tipo: 'error' | 'exito' | 'aviso') {
    // Dependiendo del tipo, le asignamos una clase CSS diferente
    let clasePersonalizada = 'toast-handly ';
    if (tipo === 'error') clasePersonalizada += 'toast-error';
    if (tipo === 'exito') clasePersonalizada += 'toast-exito';
    if (tipo === 'aviso') clasePersonalizada += 'toast-aviso';

    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom',
      cssClass: clasePersonalizada // ¡Aquí pasamos nuestra clase!
    });
    toast.present();
  }

  validateForm(): boolean {
    const type = this.registerData.documentType;
    let num = this.registerData.documentNumber.toUpperCase().trim();

    if (!type || !num) {
      this.errorMessage = '';
      return false;
    }

    if (type === 'DNI') {

      const dniRegex = /^[0-9]{8}[A-Z]$/;
      if(!dniRegex.test(num)) {
        this.errorMessage = 'Please enter a valid DNI.';
        return false;
      }

      const letrasValidas = "TRWAGMYFPDXBNJZSQVHLCKE";
      const numerosDelDNI = parseInt(num.substring(0, 8), 10);
      const letraDelDNI = num.charAt(8);
      if (letrasValidas.charAt(numerosDelDNI % 23) !== letraDelDNI) {
        this.errorMessage = 'La letra del DNI no es correcta.';
        return false;

      }
    } else if (type === 'NIE') {
      const nieRegex = /^[XYZ][0-9]{7}[A-Z]$/;
      if(!nieRegex.test(num)) {
        this.errorMessage = 'Please enter a valid NIE.';
        return false;
      }

      let prefijo = num.charAt(0).replace('X', '0').replace('Y', '1').replace('Z', '2');
      const numerosDelNIE = parseInt(prefijo + num.substring(1, 8), 10);
      const letrasValidas = "TRWAGMYFPDXBNJZSQVHLCKE";
      if (letrasValidas.charAt(numerosDelNIE % 23) !== num.charAt(8)) {
        this.errorMessage = 'La letra del NIE no es correcta.';
        return false;
      }
    } else if (type === 'PASAPORTE') {
      const regexPasaporte = /^[A-Z0-9]{6,15}$/;
      if (!regexPasaporte.test(num)) {
        this.errorMessage = 'El pasaporte no tiene un formato válido.';
        return false;
      }
    }

    this.errorMessage = '';
    return true;

  }

  async registerClient() {
    if (!this.validateForm()) {
      this.presentToast('Revisa el formato de tu documento antes de continuar.', 'error');
      return;
    }

    if(this.registerData.fullName === '' || this.registerData.email === '' || this.registerData.password === '' || this.registerData.address === '' || this.registerData.zipCode === '') {
      this.presentToast('Por favor, rellena todos los campos para crear tu cuenta.', 'aviso');
      return; 
    }

    console.log('Registrando cliente perfecto:', this.registerData);
    await this.presentToast('¡Registro exitoso!.', 'exito');

    this.router.navigate(['/verify-email']);
  }

    navigateToSignIn() {
    this.router.navigate(['/sign-in']);
  }
}