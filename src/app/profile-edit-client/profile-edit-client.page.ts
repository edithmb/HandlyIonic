import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-profile-edit-client',
  templateUrl: './profile-edit-client.page.html',
  styleUrls: ['./profile-edit-client.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ProfileEditClientPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
