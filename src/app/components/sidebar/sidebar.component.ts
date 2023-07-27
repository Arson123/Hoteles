import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  isOpen = false;
  hasContent = false;

  constructor(
    private sidebarService: SidebarService,
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
  }
}

