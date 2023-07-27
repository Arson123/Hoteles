import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  isOpen = false;

  constructor(private sidebarService: SidebarService) {
    this.sidebarService.isOpen$.subscribe((isOpen) => {
      this.isOpen = isOpen;
    });
  }
}
