import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ApiService } from '../services/api'; // <-- 1. Importa tu servicio

// Importamos el icono para el botón de prueba
import { addIcons } from 'ionicons';
import { flashOutline } from 'ionicons/icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule, TranslateModule]
})
export class LoginPage implements OnInit {

  // 2. Inyectamos el servicio en el constructor
  constructor(private apiService: ApiService) {
    addIcons({ flashOutline });
  }

  ngOnInit() {
  }

  // 3. La función que se dispara al tocar el botón amarillo
hacerPrueba() {
    console.log('Llamando a la puerta del backend...');
    
    this.apiService.probarConexion().subscribe({
      // ¡Añadimos : any aquí!
      next: (respuesta: any) => { 
        console.log('¡ÉXITO! El backend respondió esto:', respuesta);
        alert('¡Conexión exitosa con el servidor!');
      },
      // ¡Y añadimos : any aquí!
      error: (error: any) => { 
        console.error('Mmm, algo falló. Detalles del error:', error);
        alert('Fallo al conectar. Revisa la consola (F12).');
      }
    });
  }
}