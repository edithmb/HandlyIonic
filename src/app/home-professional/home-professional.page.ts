import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { IonicModule } from '@ionic/angular';
import { SharedMenuComponent } from '../components/shared-menu/shared-menu.component';
import { RouterLink, Route, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { DetailsJobComponent } from '../components/details-job/details-job.component'; // Verifica que la ruta sea la correcta
import { notificationsOutline, constructOutline, home, calendarOutline, chatbubblesOutline, personOutline } from 'ionicons/icons';

addIcons({ notificationsOutline, constructOutline, home, calendarOutline, chatbubblesOutline, personOutline });

@Component({
  selector: 'app-home-professional',
  templateUrl: './home-professional.page.html',
  styleUrls: ['./home-professional.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, SharedMenuComponent, RouterLink]
})
export class HomeProfessionalPage {

  constructor(private modalCtrl: ModalController, private router: Router) {
  }

  async abrirDetalles() {
    const modal = await this.modalCtrl.create({
      component: DetailsJobComponent,
      cssClass: 'modal-detalles-job' 
    });
    return await modal.present();
  }

    cerrarSesion() {
    // 1. Limpiamos el rastro del usuario en el navegador
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // 2. Lo mandamos de vuelta al login
    this.router.navigate(['/sign-in']);
  }

}
