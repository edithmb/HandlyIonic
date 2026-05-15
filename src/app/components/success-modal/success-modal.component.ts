import { Component, OnInit, Input } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { QRCodeComponent } from 'angularx-qrcode';

@Component({
  selector: 'app-success-modal',
  templateUrl: './success-modal.component.html',
  styleUrls: ['./success-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, QRCodeComponent]
})
export class SuccessModalComponent  implements OnInit {

  @Input() isProfessional!: boolean;
  @Input() namePerson!: string;
  @Input() titleTask!: string;
  @Input() timeSet!: string;
  @Input() tokenQr?: string;

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  close() {
    this.modalController.dismiss();
  }

  seeDetails() {
    // Cerramos el modal y le avisamos a la página anterior que queremos ir a detalles
    this.modalController.dismiss({ accion: 'recieve-budget' });
  }

}
