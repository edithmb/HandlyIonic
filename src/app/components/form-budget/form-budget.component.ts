import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-form-budget',
  templateUrl: './form-budget.component.html',
  styleUrls: ['./form-budget.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class FormBudgetComponent  implements OnInit {

  notasProfesional: string = "La taza del baño esta completamente rota y se necesitara un reemplazo, además de una instalación completa para arreglar su problema.";
  precioOferta: number = 100;
  incluyeMateriales: boolean = true;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  regresar() {
    this.modalCtrl.dismiss();
  }

  enviarPresupuesto() {
    console.log('Enviando presupuesto...', {
      precio: this.precioOferta,
      notas: this.notasProfesional,
      materiales: this.incluyeMateriales
    });
    // Aquí conectarías con la API de tu compañera
    this.modalCtrl.dismiss({ enviado: true });
  }

  // Función para que solo uno de los checkboxes esté activo (tipo radio button)
  toggleMateriales(opcion: boolean) {
    this.incluyeMateriales = opcion;
  }

}
