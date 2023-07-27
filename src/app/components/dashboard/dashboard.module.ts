import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AppBarComponent } from '../app-bar/app-bar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
    path: 'Home',
    component: DashboardComponent,
    children: [
      {
        path: 'hotel-management',
        loadChildren: () =>
          import('../hotel/hotel.module').then(
            (m) => m.HotelModule
          ),
      },
      // Agrega otras rutas secundarias para los demás componentes del sidebar
    ],
  },
];

@NgModule({
  declarations: [DashboardComponent, AppBarComponent, SidebarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  providers: [AuthGuard],
  exports: [RouterModule],
})
export class DashboardModule {}
