import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ApiService } from '../services/api';
import { IonInputPasswordToggle } from '@ionic/angular/standalone';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonInput, IonItem, IonLabel } from '@ionic/angular/standalone';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonInput, TranslateModule, IonItem, IonLabel, IonInputPasswordToggle]
})
export class SignInPage {

  loginData = {
    email: '',
    password: ''
  }

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

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
        alert('Login failed. Please check your credentials and try again.');
      }
    });
  }
}