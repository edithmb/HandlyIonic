import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { IonicModule } from '@ionic/angular';
import { notificationsOutline, constructOutline, home, calendarOutline, chatbubblesOutline, personOutline } from 'ionicons/icons';

addIcons({ notificationsOutline, constructOutline, home, calendarOutline, chatbubblesOutline, personOutline });

@Component({
  selector: 'app-home-professional',
  templateUrl: './home-professional.page.html',
  styleUrls: ['./home-professional.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class HomeProfessionalPage implements OnInit {

  constructor() {
  }
  ngOnInit() {
  }

}
