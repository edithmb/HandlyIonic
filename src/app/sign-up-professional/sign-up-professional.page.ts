import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router'; 
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { TranslateModule } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { addCircle, trashOutline, alertCircleOutline, chevronDownOutline } from 'ionicons/icons';
import { ApiService } from '../services/api';

addIcons({
  addCircle,
  trashOutline,
  alertCircleOutline,
  chevronDownOutline
});

@Component({
  selector: 'app-sign-up-professional',
  templateUrl: './sign-up-professional.page.html',
  styleUrls: ['./sign-up-professional.page.scss'],
  standalone: true,
  imports: [IonicModule, TranslateModule, CommonModule, FormsModule]
})
export class SignUpProfessionalPage implements OnInit {

  registerData = {
    fullName:'',
    email: '',
    password: '',
    documentType: '',
    documentNumber: '',
    address: '',
    zipCode: '',
    professions: ['']
  };

  errorMessage: string = '';

  profesionesDB: any[] = []; 
  profesionesFiltradas: any[] = [];
  inputActivoIndex: number = -1;

  constructor(private router: Router, 
    private toastController: ToastController,
    private http: HttpClient,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    // cargar profesiones
    this.obtenerProfesionesDeBD();
  }

  obtenerProfesionesDeBD() {
    this.apiService.getProfessionalJobs().subscribe({
      next: (response: any) => {
        this.profesionesDB = response.data || response; 
        console.log('Profesiones cargadas desde la BD:', this.profesionesDB);
      },
      error: (err) => {
        console.error('Error al cargar profesiones:', err);
        this.presentToast('No se pudieron cargar las profesiones.', 'error');
      }
    });
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
      cssClass: clasePersonalizada
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

  addProfession() {
    if(this.registerData.professions.length < 5 ){
      this.registerData.professions.push('');
    } else {
      this.presentToast('Solo puedes agregar hasta 5 profesiones.', 'aviso');
    }
  }

  removeProfession(index: number) {
    this.registerData.professions.splice(index, 1);
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  searchProfessions(event: any, index: number) {
    const text = event.target.value.toLowerCase().trim();
    this.inputActivoIndex = index;

    if(text=== '') {
      this.profesionesFiltradas = [];
      return;
    }

    this.profesionesFiltradas = this.profesionesDB.filter(profesion => 
      profesion.name_profession.toLowerCase().includes(text));
  }

  selectProfession(profession: any, index: number) {
    this.registerData.professions[index] = profession.name_profession;
    this.profesionesFiltradas = [];
    this.inputActivoIndex = -1;
  }

  async registerProfessional() {
    if (!this.validateForm()) {
      this.presentToast('Revisa el formato de tu documento antes de continuar.', 'error');
      return;
    }

    if(this.registerData.fullName === '' || this.registerData.email === '' || this.registerData.password === '' || this.registerData.address === '' || this.registerData.zipCode === '') {
      this.presentToast('Por favor, rellena todos los campos para crear tu cuenta.', 'aviso');
      return; 
    }

    const cleanProfessions = this.registerData.professions.filter(prof => prof.trim() !== '');
    if (cleanProfessions.length === 0) {
      this.presentToast('Debes seleccionar al menos una profesión.', 'aviso');
      return;
    }

    const professionIds = cleanProfessions.map(name => {
      const encontrada = this.profesionesDB.find(p => p.name_profession === name);
      return encontrada ? encontrada.id : null;
    }).filter(id => id !== null); // Quitamos los null por si escribieron algo que no existe

    if (professionIds.length === 0) {
      this.presentToast('Por favor, selecciona profesiones válidas de la lista.', 'aviso');
      return;
    }

    const nameParts = this.registerData.fullName.trim().split(' ');
    const firstName = nameParts[0] || 'Usuario';
    const lastName = nameParts.slice(1).join(' ') || '-';
    const addressParts = this.registerData.address.split(',');
    const streetNumber = addressParts[0] ? addressParts[0].trim() : this.registerData.address;
    const city = addressParts[1] ? addressParts[1].trim() : 'No especificada';
    const country = addressParts[2] ? addressParts[2].trim() : 'España';

    const payload = {
      name: firstName,
      surname: lastName,
      dni: this.registerData.documentNumber, 
      email: this.registerData.email,
      password: this.registerData.password, 
      street_number: streetNumber,
      city: city,
      postal_code: this.registerData.zipCode,
      country: country,
      professions: professionIds // Enviamos [1, 3] al backend
    };

    const apiUrl = `${environment.apiUrl}/register/professional`;

    this.http.post(apiUrl, payload).subscribe({
      next: async (response: any) => {
        console.log('Respuesta del servidor:', response);
        localStorage.setItem('registro_email', this.registerData.email);
        await this.presentToast('¡Registro exitoso!', 'exito');
        
        // Mismo flujo que el cliente
        this.router.navigate(['/verify-email']);
      },
      error: (err) => {
        console.error('Error al registrar profesional:', err);
        const mensajeError = err.error?.message || 'Error al conectar con el servidor.';
        this.presentToast(mensajeError, 'error');
      }
    });
  }

    navigateToSignIn() {
    this.router.navigate(['/sign-in']);
  }
}