import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
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

  constructor(private router: Router) { }

  ngOnInit() {
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

  registrarCliente() {
    if (!this.validateForm()) {
      alert('Por favor, introduce un documento válido antes de continuar.');
      return;
    }

    if(this.registerData.fullName === '' || this.registerData.email === '' || this.registerData.password === '' || this.registerData.address === '' || this.registerData.zipCode === '') {
      alert('Por favor, rellena todos los campos');
      return; 
    }

    console.log('Registrando cliente perfecto:', this.registerData);
    alert('¡Registro exitoso! Datos validados.');
  }
}

