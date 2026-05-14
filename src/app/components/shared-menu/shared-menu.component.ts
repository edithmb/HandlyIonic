import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { addIcons } from 'ionicons';
import { ApiService } from '../../services/api';
import { TranslateModule } from '@ngx-translate/core';
import { home, notificationsOutline, chatbubblesOutline, personOutline } from 'ionicons/icons';

addIcons({ home, notificationsOutline, chatbubblesOutline, personOutline });

@Component({
  selector: 'app-shared-menu',
  templateUrl: './shared-menu.component.html',
  styleUrls: ['./shared-menu.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterLink, RouterLinkActive, TranslateModule]
})
export class SharedMenuComponent  implements OnInit {

  startRoute: string = '/home-client';
  profileRoute: string = '/client-profile';
  newNotifications: boolean = false;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    const userKeeped = localStorage.getItem('user');

    if (userKeeped) {
      const user = JSON.parse(userKeeped);

      if (user.rol_id === 2) {
      this.startRoute = '/home-professional';
      this.profileRoute = '/professional-profile';
      }
    }
  }

  checkNotifications() {
    this.apiService.getNotificaciones().subscribe({
      next: (res: any) => {
        const notificaciones = res.data;
        this.newNotifications = notificaciones.some((n: any) => n.is_read === 0 || n.is_read === false);
      },
      error: (err) => console.error(err)
    });
  }
}
