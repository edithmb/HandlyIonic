import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, RouterLink, IonHeader, IonTitle, IonToolbar, IonButton, CommonModule, FormsModule, TranslateModule]
})
export class LoginPage implements OnInit {

  constructor() { }

  ngOnInit() {
    
  }

}
