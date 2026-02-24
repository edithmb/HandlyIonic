import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-professional-profile',
  templateUrl: './professional-profile.page.html',
  styleUrls: ['./professional-profile.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ProfessionalProfilePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
