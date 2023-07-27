import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { HotelService } from 'src/app/services/hotel.service';
import { Hotel } from 'src/app/models/hotel.model';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { BedroomService } from 'src/app/services/bedroom.service';
import { CreateBedroomPopupComponent } from '../create-bedroom-popup/create-bedroom-popup.component';
import { UpdateBedroomPopupComponent } from '../update-bedroom-popup/update-bedroom-popup.component';
import { ReservePopupComponent } from '../reserve-popup/reserve-popup.component';

@Component({
  selector: 'app-bedroom-management',
  templateUrl: './bedroom-management.component.html',
  styleUrls: ['./bedroom-management.component.scss'],
})
export class BedroomManagementComponent {
  displayedColumns: string[] = [
    'name',
    'enabled',
    'reserved',
    'amount',
    'actions',
  ];
  dataSource = new MatTableDataSource<Hotel>();
  hotels: Hotel[] = [];
  selectedHotelId: number | any;
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
    this.bedRoomService
      .getAllBedroom(this.selectedHotelId)
      .subscribe((rooms: any[]) => {
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
          this.bedRoomService
            .deleteBedroom(this.selectedHotelId, room.id)
            .subscribe(() => {
              this.dataSource.data = this.dataSource.data.filter(
                (h: Hotel) => h.id !== room.id
              );
            });
        }
      });
    } else {
      console.error('El ID del hotel es undefined.');
    }
  }

  createRoom(newRoom: any) {
    this.bedRoomService
      .createBedroom(this.selectedHotelId, newRoom)
      .subscribe((createdRoom: any) => {
        this.dataSource.data.push(createdRoom);
        this.dataSource.data = this.dataSource.data.slice();
        this.dialog.closeAll();
        Swal.fire('Creado correctamente', '', 'success');
      });
  }

  openCreateRoomDialog() {
    if (this.selectedHotelId) {
      const dialogRef = this.dialog.open(CreateBedroomPopupComponent, {
        width: '45%',
      });

      dialogRef.afterClosed().subscribe((result: any) => {
        if (result) {
          this.createRoom(result);
        }
      });
    } else {
      Swal.fire({
        title: 'No disponible',
        text: `Tienes que seleccionar un hotel para crear una habitacion`,
        icon: 'warning',
        confirmButtonColor: '#38d39f',
      });
    }
  }

  editHotel(hotel: Hotel) {
    this.selectedHotel = { ...hotel };
    this.openUpdateHotelDialog(hotel);
  }

  openUpdateHotelDialog(room: any) {
    const dialogRef = this.dialog.open(UpdateBedroomPopupComponent, {
      width: '45%',
      data: room,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.updateRoom(result);
      }
    });
  }

  updateRoom(updatedRoom: any) {
    debugger;
    this.bedRoomService
      .updateBedroom(this.selectedHotelId, updatedRoom.id, updatedRoom)
      .subscribe((updatedRoom: any) => {
        const index = this.dataSource.data.findIndex(
          (room: any) => room.id === updatedRoom.id
        );

        if (index !== -1) {
          this.dataSource.data[index] = updatedRoom;
          this.dataSource.data = this.dataSource.data.slice();
        }
        this.getBedrooms();
        Swal.fire('Actualizado correctamente', '', 'success');
      });
  }

  openReservePopup(room: any) {
    // Aquí debes abrir el popup de reserva, ya sea creando un componente específico o utilizando MatDialog para abrir un diálogo
    // Ejemplo con MatDialog:
    const dialogRef = this.dialog.open(ReservePopupComponent, {
      width: '45%',
      data: room, // Puedes pasar los datos de la habitación seleccionada al popup si es necesario
    });
  
    dialogRef.afterClosed().subscribe((result: any) => {
      // Aquí puedes realizar acciones después de que se cierre el popup de reserva, si es necesario
    });
  }
  
}
