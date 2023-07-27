import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { HotelService } from 'src/app/services/hotel.service';
import { Hotel } from 'src/app/models/hotel.model';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { BedroomService } from 'src/app/services/bedroom.service';

@Component({
  selector: 'app-reserve-management',
  templateUrl: './reserve-management.component.html',
  styleUrls: ['./reserve-management.component.scss'],
})
export class ReserveManagementComponent {
  displayedColumns: string[] = ['name', 'enabled', 'amount', 'reservas', 'actions'];
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
    const reservasHtml = this.generateReservasHtml(room.reserved);
    Swal.fire({
      title: 'Reservas de la habitación',
      html: reservasHtml,
      icon: 'info',
      showCloseButton: true,
      showConfirmButton: false,
    });
  }

  generateReservasHtml(reservas: any[]) {
    let html = '';
    if (reservas && reservas.length > 0) {
      html += '<ul>';
      reservas.forEach((reserva) => {
        html += `<li><strong>Fecha de reserva:</strong> ${reserva.fechaReserva}</li>`;
        html += `<li><strong>Usuario:</strong> ${reserva.userName}</li>`;
        html += '<br>';
      });
      html += '</ul>';
    } else {
      html += '<p>No hay reservas para esta habitación.</p>';
    }
    return html;
  }
}
