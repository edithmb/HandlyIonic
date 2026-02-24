import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-chat-professional',
  templateUrl: './chat-professional.page.html',
  styleUrls: ['./chat-professional.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ChatProfessionalPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
