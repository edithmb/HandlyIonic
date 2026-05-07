import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterLink, Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { ApiService } from '../services/api';
import { SharedMenuComponent } from '../components/shared-menu/shared-menu.component';
import { 
  notificationsOutline, 
  searchOutline, 
  constructOutline, 
  chevronForwardOutline, 
  home, 
  calendarOutline, 
  chatbubblesOutline, 
  personOutline,
  logOutOutline
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
  searchTerm: string = '';
  professionalJobs: any[] = [];

  constructor(private router: Router, private apiService: ApiService) { 
    // Registramos los iconos para que se vean en el HTML
    addIcons({ 
      notificationsOutline, 
      searchOutline, 
      constructOutline, 
      chevronForwardOutline, 
      home, 
      calendarOutline, 
      chatbubblesOutline, 
      personOutline,
      logOutOutline // Si quieres usar el icono de logout, lo registramos con un nombre personalizado
    });
  }

  ngOnInit() {

    const userKeeped = localStorage.getItem('user');
    if (userKeeped) {
      const user = JSON.parse(userKeeped);
      this.userName = user.name;
    }

    this.loadProfessionalJobs();
  }

  loadProfessionalJobs() {
    this.apiService.getProfessionalJobs().subscribe({
      next:(response: any) => {
        console.log("Professional jobs loaded:", response);
        this.professionalJobs = response.data || response;
      },
      error: (error) => {
        console.log("Error loading professional jobs:", error);
      }
    });
  }

  //Filtro al tocar una profesión

  professionsFiltered(prof: any) {
    this.router.navigate(['/search-a-professional'], {
    queryParams: { profesion_id: prof.id, name_profession: prof.name_profession } 
    });
  }

  //Función al escribir y darle enter o la lupa
  search() {
    if (this.searchTerm.trim().length > 0) {
      this.router.navigate(['/search-a-professional'], {
        queryParams: { search: this.searchTerm }
      })
    }
  }


  cerrarSesion() {
    // 1. Limpiamos el rastro del usuario en el navegador
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // 2. Lo mandamos de vuelta al login
    this.router.navigate(['/sign-in']);
  }

}