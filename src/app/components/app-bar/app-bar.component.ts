import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from 'src/app/services/sidebar.service'; 

@Component({
  selector: 'app-app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.scss'],
})
export class AppBarComponent {
  constructor(private sidebarService: SidebarService, private router: Router) {}

  toggleSidebar() {
    this.sidebarService.toggle();
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

}