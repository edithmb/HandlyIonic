import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { SharedMenuComponent } from '../components/shared-menu/shared-menu.component';
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

@Component({
  selector: 'app-home-client',
  templateUrl: './home-client.page.html',
  styleUrls: ['./home-client.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink, SharedMenuComponent]
})
export class HomeClientPage implements OnInit {

  userName: string = '';

  constructor() { 
    // Registramos los iconos para que se vean en el HTML
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
  }

  ngOnInit() {

    const userKeeped = localStorage.getItem('user');

    if (userKeeped) {
      const user = JSON.parse(userKeeped);
      this.userName = user.name;
    }
  }

}
