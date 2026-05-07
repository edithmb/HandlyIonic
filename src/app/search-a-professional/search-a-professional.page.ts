import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api';
import { addIcons } from 'ionicons';
import { arrowBackOutline, searchOutline, personCircleOutline } from 'ionicons/icons';

declare var google: any;

@Component({
  selector: 'app-search-a-professional',
  templateUrl: './search-a-professional.page.html',
  styleUrls: ['./search-a-professional.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterLink]
})
export class SearchAProfessionalPage implements OnInit {

  map: any;
  markersGoogle: any[] = [];

  professionId: string | null = null;
  professionName: string = '';
  professionals: any[] = [];

  constructor(private route: ActivatedRoute, private apiService: ApiService) { 
    addIcons({ arrowBackOutline, searchOutline, personCircleOutline });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.professionId = params['profesion_id'];
      this.professionName = params['name_profession'] || 'Profesionales';
      this.loadProfessionals();
    })
  }

  //Inicializar el mapa al entrar a la vista
  ionViewDidEnter() {
    this.initMap();
  }

  initMap() {
const barcelonaCoords = { lat: 41.3851, lng: 2.1734 };
    const mapOptions = {
      center: barcelonaCoords,
      zoom: 13,
      disableDefaultUI: true, 
      mapTypeControl: false
    };

    // 3. Buscamos el div "a prueba de fallos"
    const mapElement = document.getElementById('mapId');

    // 4. Solo inicializamos Google Maps si encontramos el Div
    if (mapElement) {
      this.map = new google.maps.Map(mapElement, mapOptions);
      this.drawMarkers();
    } else {
      console.error('No se encontró el contenedor del mapa (id="mapId") en el HTML');
    }
  }

  loadProfessionals() {
    /* NOTA: Aquí iría tu petición real al backend cuando la API esté lista.
    this.apiService.getProfesionalesPorCategoria(this.profesionId).subscribe(...)
    */

    // DATOS DE PRUEBA SIMULADOS (Para que veas la magia ahora mismo)
    this.professionals = [
      { id: 1, nombre: 'Electricista Juan', lat: 41.3951, lng: 2.1834, distancia: 'a 2,0km', rating: 5, profesion: this.professionName },
      { id: 2, nombre: 'Fontanero Carlos', lat: 41.3751, lng: 2.1634, distancia: 'a 3,5km', rating: 4, profesion: this.professionName }
    ];

    this.drawMarkers();
  }

  drawMarkers() {
    // Si el mapa aún no carga o no hay profesionales, no hacemos nada
    if (!this.map || this.professionals.length === 0) return;

    // Limpiar marcadores viejos (útil si el usuario vuelve a buscar otra cosa)
    this.markersGoogle.forEach(marker => marker.setMap(null));
    this.markersGoogle = [];

    // Añadir los nuevos
    this.professionals.forEach(prof => {
      const marker = new google.maps.Marker({
        position: { lat: prof.lat, lng: prof.lng },
        map: this.map,
        title: prof.nombre,
        animation: google.maps.Animation.DROP // Efecto bonito al caer
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `<div style="color:black; padding:5px;"><b>${prof.nombre}</b><br>${prof.profesion}</div>`
      });

      marker.addListener('click', () => {
        infoWindow.open(this.map, marker);
      });

      this.markersGoogle.push(marker);
    });
  }

}
