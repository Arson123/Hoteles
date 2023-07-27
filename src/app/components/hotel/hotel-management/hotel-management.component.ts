import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { HotelService } from 'src/app/services/hotel.service';
import { Hotel } from 'src/app/models/hotel.model';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { CreateHotelPopupComponent } from '../create-hotel-popup/create-hotel-popup.component';

@Component({
  selector: 'app-hotel-management',
  templateUrl: './hotel-management.component.html',
  styleUrls: ['./hotel-management.component.scss'],
})
export class HotelManagementComponent implements OnInit {
  displayedColumns: string[] = ['name', 'enabled', 'createdAt', 'actions'];
  dataSource = new MatTableDataSource<Hotel>();

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private hotelService: HotelService, public dialog: MatDialog) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getHotels();
  }

  applyFilter(event: any) {
    const filterValue = event.target.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getHotels() {
    this.hotelService.getAllHotels().subscribe((hotels: Hotel[]) => {
      this.dataSource.data = hotels;
    });
  }

  editHotel(hotel: Hotel | any) {}

  deleteHotel(hotel: Hotel | any) {
    const hotelId = parseInt(hotel.id);
    if (isNaN(hotelId)) {
      console.error('El ID del hotel no es un número válido.');
      return;
    }

    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Estás seguro de que deseas eliminar el hotel "${hotel.name}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.hotelService.deleteHotel(hotelId).subscribe(() => {
          this.getHotels();
        });
      }
    });
  }

  createHotel(newHotel: Hotel) {
    this.hotelService.createHotel(newHotel).subscribe((createdHotel: Hotel) => {
      this.dataSource.data.push(createdHotel);
      this.dataSource.data = this.dataSource.data.slice();
    });
  }

  openCreateHotelDialog() {
    const dialogRef = this.dialog.open(CreateHotelPopupComponent, {
      width: '45%',
    });

    dialogRef.afterClosed().subscribe((result: any) => {   
      console.log(result);
         
      if (result) {
        if (result.name && result.enabled) {
          this.createHotel(result);
        }
      }
    });
  }
}
