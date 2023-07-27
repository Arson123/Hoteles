import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { HotelService } from 'src/app/services/hotel.service';
import { Hotel } from 'src/app/models/hotel.model';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { BedroomService } from 'src/app/services/bedroom.service';
import { ReservaListComponent } from '../reserva-list/reserva-list.component'; // Importar el componente ReservaListComponent

@Component({
  selector: 'app-reserve-management',
  templateUrl: './reserve-management.component.html',
  styleUrls: ['./reserve-management.component.scss'],
})
export class ReserveManagementComponent implements OnInit {
  displayedColumns: string[] = ['name', 'enabled', 'amount', 'reservas'];
  dataSource = new MatTableDataSource<Hotel>();
  hotels: Hotel[] = [];
  selectedHotelId: number | any;
  selectedBedroomId: number | any;
  selectedHotel: Hotel | null = null;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private hotelService: HotelService,
    private bedRoomService: BedroomService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getHotels();
  }

  applyFilter(event: any) {
    console.log(event);

    const filterValue = event.target.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getHotels() {
    this.hotelService.getAllHotels().subscribe((hotels: Hotel[]) => {
      this.hotels = hotels;
    });
  }

  getBedrooms() {
    this.bedRoomService.getAllBedroom(this.selectedHotelId).subscribe((rooms: any[]) => {
      this.dataSource.data = rooms;
    });
  }

  deleteHotel(room: any) {
    if (room !== undefined) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: `¿Estás seguro de que deseas eliminar la habitacion "${room.ability}"?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.bedRoomService.deleteBedroom(this.selectedHotelId, room.id).subscribe(() => {
            this.dataSource.data = this.dataSource.data.filter((h: Hotel) => h.id !== room.id);
          });
        }
      });
    } else {
      console.error('El ID del hotel es undefined.');
    }
  }

  showReservas(room: any) {
    // Abrir el popup ReservaListComponent y pasarle las reservas y el nombre de la habitación
    this.dialog.open(ReservaListComponent, {
      data: {
        reservas: room.reserved,
        roomName: room.name,
        hotelId: this.selectedHotelId,
        roomId: room.id,
      },
      width: '50%', // Ajustar el ancho del popup según sea necesario
    });
  }
}