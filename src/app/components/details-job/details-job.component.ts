import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { FormBudgetComponent } from '../form-budget/form-budget.component';

@Component({
  selector: 'app-details-job',
  templateUrl: './details-job.component.html',
  styleUrls: ['./details-job.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class DetailsJobComponent  implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  regresar() {
    this.modalCtrl.dismiss();
  }

  enviarMensaje() {
    console.log('Ir al chat');
    // this.modalCtrl.dismiss();
  }

async hacerOferta() {
  const modal = await this.modalCtrl.create({
    component: FormBudgetComponent,
  });
  
  await modal.present();

  // Si quieres que al enviar el presupuesto se cierren AMBOS modales:
  const { data } = await modal.onDidDismiss();
  if (data && data.enviado) {
    this.modalCtrl.dismiss(); // Cierra el modal de detalles también
  }
}

  rechazar() {
    console.log('Solicitud rechazada');
    this.modalCtrl.dismiss();
  }

}
