import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-sign-up-professional',
  templateUrl: './sign-up-professional.page.html',
  styleUrls: ['./sign-up-professional.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class SignUpProfessionalPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
