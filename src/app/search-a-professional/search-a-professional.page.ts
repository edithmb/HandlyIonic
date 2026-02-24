import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-search-a-professional',
  templateUrl: './search-a-professional.page.html',
  styleUrls: ['./search-a-professional.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class SearchAProfessionalPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
