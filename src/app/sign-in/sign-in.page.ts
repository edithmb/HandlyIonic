import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ApiService } from '../services/api';
import { ToastController } from '@ionic/angular';
import { IonInputPasswordToggle } from '@ionic/angular/standalone';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonInput, IonItem, IonLabel } from '@ionic/angular/standalone';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
  standalone: true,
  imports: [RouterLink,IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonInput, TranslateModule, IonItem, IonLabel, IonInputPasswordToggle]
})
export class SignInPage {

  loginData = {
    email: '',
    password: ''
  }

  constructor(
    private apiService: ApiService,
    private router: Router,
    private toastController: ToastController
  ) {}

  // notis
  async presentToast(message: string, tipo: 'error' | 'exito' | 'aviso') {
    let clasePersonalizada = 'toast-handly ';
    if (tipo === 'error') clasePersonalizada += 'toast-error';
    if (tipo === 'exito') clasePersonalizada += 'toast-exito';
    if (tipo === 'aviso') clasePersonalizada += 'toast-aviso';

    const toast = await this.toastController.create({
      message: message,
      duration: 3500, // 3.5 segundos para que les dé tiempo a leer
      position: 'bottom',
      cssClass: clasePersonalizada
    });
    toast.present();
  }

  signIn() {
    console.log('TRYING TO SIGN IN WITH', this.loginData);

    this.apiService.login(this.loginData).subscribe({
      next: (response) => {
        console.log('Login successful:', response);

        localStorage.setItem('token', response.token);

        localStorage.setItem('user', JSON.stringify(response.user));

        const userRoleId = response.user.rol_id;

        if (userRoleId === 1) {
          this.router.navigate(['/home-client']);
        }
        else if (userRoleId === 2) {
          this.router.navigate(['/home-professional']);
        }
        else {
          console.error('Unknown user role:', userRoleId);
        }
      },
      error: (error) => {
        console.error('Login failed:', error);
        if (error.error && error.error.message) {
          // mensajes del backend
          const tipoMensaje = error.status === 403 ? 'aviso' : 'error';

          this.presentToast(error.error.message, tipoMensaje);

      } else {
        this.presentToast('Error al conectar con el servidor. Inténtalo de nuevo.', 'error');
      }
    }
    });
  }
}