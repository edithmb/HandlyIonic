import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router'; 
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-selection-rol',
  templateUrl: './selection-rol.page.html',
  styleUrls: ['./selection-rol.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, TranslateModule]
})
export class SelectionRolPage implements OnInit {

  rolSelected: string = '';

  constructor(private router: Router) { }

  selectRole(role: string) {
    this.rolSelected = role;
  }

  continue() {
    if(this.rolSelected === 'Client') {
      this.router.navigate(['/sign-up-client']);
    } else if(this.rolSelected === 'Professional') {
      this.router.navigate(['/sign-up-professional']);
    }
  }

  navigateToSignIn() {
    this.router.navigate(['/sign-in']);
  }

  ngOnInit() {
  }

}