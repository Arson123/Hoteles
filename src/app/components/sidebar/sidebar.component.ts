import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';
import { Router, NavigationEnd } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  isOpen = false;
  hasContent = false;
  showClientesOptions = false;
  showAgentsOptions = false;

  constructor(
    private sidebarService: SidebarService,
    private loginService: LoginService,
    private router: Router
  ) {
    this.sidebarService.isOpen$.subscribe((isOpen) => {
      this.isOpen = isOpen;
    });

    this.hasContent = this.router.url !== '/Home';

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.hasContent = this.router.url !== '/Home';
      }
    });

    // Verificar si el usuario tiene permisos para ver opciones de clientes y agents
    const user = this.loginService.getUserFromSessionStorage();
    if (user) {
      this.showClientesOptions = user.client === true;
      this.showAgentsOptions = user.agent === true;      
    }
  }
}