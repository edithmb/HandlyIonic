import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api';
import { addIcons } from 'ionicons';
import { Geolocation } from '@capacitor/geolocation';
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
  myLat: number = 0;
  myLng: number = 0;

  professionId: string | null = null;
  professionName: string = '';
  alltheProfessionals: any[] = [];
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
      this.getCurrentLocation(); // Centrar en la ubicación actual del usuario
      this.drawMarkers();
    } else {
      console.error('No se encontró el contenedor del mapa (id="mapId") en el HTML');
    }
  }

  loadProfessionals() {
    if(!this.professionId) return;

    this.apiService.getProfessionalsByCategory(this.professionId).subscribe({
      next: (response: any) => {
        console.log('Professionals received:', response);

        const realData = response.data || response;

        if (Array.isArray(realData)) {
          this.alltheProfessionals = realData;
          this.professionals = [];
          this.drawMarkers();

        } else {
          console.error("The response format is unexpected. Expected an array but got:", realData);
          this.professionals = [];
        }
      }, 
      error: (error) => {
        console.error('Error fetching professionals:', error);
      }
    });
  }

  drawMarkers() {
    // IMPORTANTE: Ahora comprobamos alltheProfessionals en lugar de professionals
    if (!this.map || this.alltheProfessionals.length === 0) return;

    this.markersGoogle.forEach(marker => marker.setMap(null));
    this.markersGoogle = [];
    
    // Vaciamos la lista visible en el HTML antes de empezar a filtrar
    this.professionals = [];

    // Iniciamos el traductor de direcciones
    const geocoder = new google.maps.Geocoder();

    // Recorremos la lista COMPLETA de profesionales (Madrid, Valencia, etc.)
    this.alltheProfessionals.forEach(prof => {
      
      // Unimos la dirección en texto
      const direccionCompleta = `${prof.street_number}, ${prof.postal_code}, ${prof.city}, España`;

      // Traducimos la dirección a coordenadas
      geocoder.geocode({ address: direccionCompleta }, (resultados: any, status: string) => {
        
        if (status === 'OK') {
          // Extraemos latitud y longitud numéricas de la casa del profesional
          const latReal = resultados[0].geometry.location.lat();
          const lngReal = resultados[0].geometry.location.lng();

          //CALCULAMOS LA DISTANCIA ENTRE EL CLIENTE Y EL PROFESIONAL
          const distanciaKm = this.calculateDistance(this.myLat, this.myLng, latReal, lngReal);

          //Solo continuamos si el profesional está a menos de 50km
          if (distanciaKm <= 50) {
            
            prof.distancia = `a ${Math.round(distanciaKm)} km`; 
            
            const yaExiste = this.professionals.find(p => p.professional_id === prof.professional_id);
            if (!yaExiste) {
              this.professionals.push(prof); 
            }

            const ubicacionAproximada = this.hideCurrentLocation(latReal, lngReal);

            const circuloProfesional = new google.maps.Circle({
              strokeColor: "#FF7A45",
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: "#FF7A45",
              fillOpacity: 0.35,
              map: this.map,
              center: ubicacionAproximada,
              radius: 300
            });

            const infoWindow = new google.maps.InfoWindow({
              content: `<div style="color:black; padding:5px;">
                          <b>${prof.name} ${prof.surname}</b><br>
                          ${this.professionName}<br>
                          <i>Ubicación aproximada en ${prof.city}</i>
                        </div>`
            });

            circuloProfesional.addListener('click', (evento: any) => {
              infoWindow.setPosition(evento.latLng);
              infoWindow.open(this.map);
            });

            this.markersGoogle.push(circuloProfesional);
          }
        } else {
          console.error(`No se pudo encontrar la calle de ${prof.name}:`, status);
        }
      });
    });
  }

  async getCurrentLocation() {
    try{
      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
      });

      this.myLat = position.coords.latitude;
      this.myLng = position.coords.longitude;

      if(this.map){
        this.map.setCenter({ lat: this.myLat, lng: this.myLng });
        this.map.setZoom(14);

        new google.maps.Marker({
          position: { lat: this.myLat, lng: this.myLng },
          map: this.map,
          icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
          title: 'Tú estás aquí'
        });
      }
    } catch (error) {
      console.error('Error al obtener la ubicación actual:', error);
    }
  }

  hideCurrentLocation(latOriginal: number, lngOriginal: number) {
    const maxDistance = 0.0003;
    const ruidoLat = (Math.random() * (maxDistance * 2)) - maxDistance;
    const ruidoLng = (Math.random() * (maxDistance * 2)) - maxDistance;

    return {
      lat: latOriginal + ruidoLat,
      lng: lngOriginal + ruidoLng
    };
  }

  calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {

    const R = 6371; // Radio de la Tierra en km
    const dLat = this.gradosARadianes(lat2 - lat1);
    const dLon = this.gradosARadianes(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.gradosARadianes(lat1)) * Math.cos(this.gradosARadianes(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; 
  }

  gradosARadianes(grados: number): number {
    return grados * (Math.PI / 180);
  }

}