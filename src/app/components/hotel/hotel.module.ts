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
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { HotelManagementComponent } from './hotel-management/hotel-management.component';
import { HotelService } from 'src/app/services/hotel.service';
import { CreateHotelPopupComponent } from './create-hotel-popup/create-hotel-popup.component';
import { UpdateHotelPopupComponent } from './update-hotel-popup/update-hotel-popup.component';
import { BedroomManagementComponent } from './bedrooms/bedroom-management/bedroom-management.component';
import { CreateBedroomPopupComponent } from './bedrooms/create-bedroom-popup/create-bedroom-popup.component';
import { UpdateBedroomPopupComponent } from './bedrooms/update-bedroom-popup/update-bedroom-popup.component';
import { ReservePopupComponent } from './bedrooms/reserve-popup/reserve-popup.component';

const hotelRoutes: Routes = [
  { path: 'hotel', component: HotelManagementComponent },
  { path: 'bedroom', component: BedroomManagementComponent },
];

@NgModule({
  declarations: [
    HotelManagementComponent,
    CreateHotelPopupComponent,
    UpdateHotelPopupComponent,
    BedroomManagementComponent,
    CreateBedroomPopupComponent,
    UpdateBedroomPopupComponent,
    ReservePopupComponent,
  ],
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
    MatNativeDateModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
  providers: [HotelService],
})
export class HotelModule {}
