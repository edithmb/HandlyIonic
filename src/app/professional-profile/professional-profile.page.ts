import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../services/api';
import { FormRequestJobComponent } from '../components/form-request-job/form-request-job.component';

@Component({
  selector: 'app-professional-profile',
  templateUrl: './professional-profile.page.html',
  styleUrls: ['./professional-profile.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterLink]
})
export class ProfessionalProfilePage implements OnInit {

professional: any = null;

  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private apiService: ApiService
  ) { }

  regresar() {
    this.navCtrl.back();
  }

  async abrirSolicitud() {
    const modal = await this.modalCtrl.create({
      component: FormRequestJobComponent,
      componentProps: {
        professionalId: this.professional.professional_id, // Enviamos el ID al modal
        professionId: 1 // Aquí deberías mandar el ID de la profesión que estás buscando
      }
    });
    await modal.present();
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const id= params['id'];
      if(id){
        this.loadProfessional(id);
      }
    });
  }

  loadProfessional(id: string) {
    this.apiService.getProfessionalById(id).subscribe({
      next: (response: any) => {
        console.log('Loaded professional:', response);
        this.professional = response.data;
      },
      error: (error) => {
        console.error('Error loading professional:', error);
      }
    })
  }
}
