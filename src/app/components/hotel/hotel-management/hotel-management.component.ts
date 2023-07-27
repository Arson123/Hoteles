import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { HotelService } from 'src/app/services/hotel.service';
import { Hotel } from 'src/app/models/hotel.model';
import { MatDialog } from '@angular/material/dialog';
import { CreateHotelPopupComponent } from '../create-hotel-popup/create-hotel-popup.component';
import { UpdateHotelPopupComponent } from '../update-hotel-popup/update-hotel-popup.component';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-hotel-management',
  templateUrl: './hotel-management.component.html',
  styleUrls: ['./hotel-management.component.scss'],
})
export class HotelManagementComponent implements OnInit {
  displayedColumns: string[] = ['name', 'enabled', 'createdAt', 'actions'];
  dataSource = new MatTableDataSource<Hotel>();
  selectedHotel: Hotel | null = null;

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

  deleteHotel(hotel: Hotel | any) {
    if (hotel.id !== undefined) {
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
          this.hotelService.deleteHotel(hotel.id).subscribe(() => {
            this.dataSource.data = this.dataSource.data.filter(
              (h: Hotel) => h.id !== hotel.id
            );
          });
        }
      });
    } else {
      console.error('El ID del hotel es undefined.');
    }
  }

  createHotel(newHotel: Hotel) {
    this.hotelService.createHotel(newHotel).subscribe((createdHotel: Hotel) => {
      this.dataSource.data.push(createdHotel);
      this.dataSource.data = this.dataSource.data.slice();
      this.dialog.closeAll();
    });
  }

  openCreateHotelDialog() {
    const dialogRef = this.dialog.open(CreateHotelPopupComponent, {
      width: '45%',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        if (result.name && result.enabled) {
          this.createHotel(result);
        }
      }
    });
  }

  editHotel(hotel: Hotel) {
    this.selectedHotel = { ...hotel };
    this.openUpdateHotelDialog(hotel);
  }

  openUpdateHotelDialog(hotel: Hotel) {
    const dialogRef = this.dialog.open(UpdateHotelPopupComponent, {
      width: '45%',
      data: hotel,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        if (result.name && result.enabled) {
          this.updateHotel(result);
        }
      }
    });
  }

  updateHotel(updatedHotel: Hotel) {
    this.hotelService
      .updateHotel(updatedHotel)
      .subscribe((updatedHotel: Hotel) => {
        const index = this.dataSource.data.findIndex(
          (hotel: Hotel) => hotel.id === updatedHotel.id
        );

        if (index !== -1) {
          this.dataSource.data[index] = updatedHotel;
          this.dataSource.data = this.dataSource.data.slice();
        }
      });
  }
}
