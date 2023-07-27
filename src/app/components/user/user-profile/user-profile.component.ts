import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userProfileData: any;

  constructor() { }

  ngOnInit(): void {
    const userData = sessionStorage.getItem('user');
    debugger
    if (userData) {
      this.userProfileData = JSON.parse(userData);
    } else {
      // Implementa las acciones necesarias si no hay datos disponibles
    }
  }

}
