import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import * as L from 'leaflet';

@Component({
  selector: 'app-search-a-professional',
  templateUrl: './search-a-professional.page.html',
  styleUrls: ['./search-a-professional.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterLink]
})
export class SearchAProfessionalPage implements OnInit {
  map!: L.Map;

  constructor() { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.initMap();
  }

  initMap() {
    // 1. Centrar el mapa (Latitud, Longitud) - Aquí puse Barcelona como ejemplo
    this.map = L.map('mapId').setView([41.3851, 2.1734], 13);

    // 2. Cargar los dibujos del mapa (Capa gratuita de OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // 3. Añadir marcadores de prueba (Los profesionales)
    const prof1 = L.marker([41.3951, 2.1834]).addTo(this.map);
    prof1.bindPopup('<b>Electricista Juan</b><br>Disponible ahora.').openPopup();

    const prof2 = L.marker([41.3751, 2.1634]).addTo(this.map);
    prof2.bindPopup('<b>Fontanero Carlos</b>');
  }

}
