import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { 
  notificationsOutline, 
  searchOutline, 
  constructOutline, 
  chevronForwardOutline, 
  home, 
  calendarOutline, 
  chatbubblesOutline, 
  personOutline 
} from 'ionicons/icons';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

addIcons({
  notificationsOutline,
  searchOutline,
  constructOutline,
  chevronForwardOutline,
  home,
  calendarOutline,
  chatbubblesOutline,
  personOutline
});

@Component({
  selector: 'app-home-client',
  templateUrl: './home-client.page.html',
  styleUrls: ['./home-client.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class HomeClientPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
