import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonLabel, IonItem,  } from '@ionic/angular/standalone';

@Component({
  selector: 'app-selection-rol',
  templateUrl: './selection-rol.page.html',
  styleUrls: ['./selection-rol.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, RouterLink, FormsModule, TranslateModule, IonButton, IonLabel, IonItem]
})
export class SelectionRolPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
