import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { FormRequestJobComponent } from '../components/form-request-job/form-request-job.component';

@Component({
  selector: 'app-professional-profile',
  templateUrl: './professional-profile.page.html',
  styleUrls: ['./professional-profile.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class ProfessionalProfilePage implements OnInit {

  constructor(private navCtrl: NavController) { }
  regresar() {
  this.navCtrl.back();
  }

  ngOnInit() {
  }

}
