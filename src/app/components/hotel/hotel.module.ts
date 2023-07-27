import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select'; 
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms'; 
import { MatDialogModule } from '@angular/material/dialog';
import { HotelManagementComponent } from './hotel-management/hotel-management.component';
import { HotelService } from 'src/app/services/hotel.service';
import { CreateHotelPopupComponent } from './create-hotel-popup/create-hotel-popup.component';
import { UpdateHotelPopupComponent } from './update-hotel-popup/update-hotel-popup.component';

const hotelRoutes: Routes = [
  { path: '', component: HotelManagementComponent },
];

@NgModule({
  declarations: [HotelManagementComponent, CreateHotelPopupComponent, UpdateHotelPopupComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(hotelRoutes),
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatPaginatorModule,
    MatSelectModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  providers: [HotelService],
})
export class HotelModule {}
