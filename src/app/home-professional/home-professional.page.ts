import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { notificationsOutline, constructOutline, home, calendarOutline, chatbubblesOutline, personOutline } from 'ionicons/icons';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

addIcons({ notificationsOutline, constructOutline, home, calendarOutline, chatbubblesOutline, personOutline });

@Component({
  selector: 'app-home-professional',
  templateUrl: './home-professional.page.html',
  styleUrls: ['./home-professional.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class HomeProfessionalPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
