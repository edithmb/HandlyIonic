import { Component, OnInit } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';
import { CommonModule} from '@angular/common';

@Component({
  selector: 'app-form-request-job',
  templateUrl: './form-request-job.component.html',
  styleUrls: ['./form-request-job.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class FormRequestJobComponent  implements OnInit {

  constructor(
    private modalCtrl: ModalController
  ) { }

  cerrar() {
  this.modalCtrl.dismiss();
}

enviar() {
  // Aquí iría la lógica para conectar con la API de tu compañera
  console.log('Solicitud enviada');
  this.modalCtrl.dismiss();
}

  ngOnInit() {}


}