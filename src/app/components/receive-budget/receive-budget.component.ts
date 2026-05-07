import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-receive-budget',
  templateUrl: './receive-budget.component.html',
  styleUrls: ['./receive-budget.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class ReceiveBudgetComponent  implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  regresar() {
    this.modalCtrl.dismiss();
  }

  aceptar() {
    console.log('Presupuesto aceptado');
    this.modalCtrl.dismiss({ accion: 'aceptar' });
  }

  rechazar() {
    console.log('Presupuesto rechazado');
    this.modalCtrl.dismiss({ accion: 'rechazar' });
  }

}
