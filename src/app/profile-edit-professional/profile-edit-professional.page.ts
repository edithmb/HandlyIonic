import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-profile-edit-professional',
  templateUrl: './profile-edit-professional.page.html',
  styleUrls: ['./profile-edit-professional.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ProfileEditProfessionalPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
