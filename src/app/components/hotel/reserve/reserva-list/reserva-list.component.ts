import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { BedroomService } from 'src/app/services/bedroom.service';

@Component({
  selector: 'app-reserva-list',
  templateUrl: './reserva-list.component.html',
  styleUrls: ['./reserva-list.component.scss'],
})
export class ReservaListComponent implements OnInit {
  reservas: any[] = [];
  roomName: string | undefined;

  constructor(
    public dialogRef: MatDialogRef<ReservaListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private bedRoomService: BedroomService
  ) {
    this.reservas = data.reservas;
    this.roomName = data.roomName;
  }

  ngOnInit(): void {}

  eliminarReserva(reservaId: string | any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Estás seguro de que deseas eliminar esta reserva?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        // Llamamos al servicio para eliminar la reserva
        this.bedRoomService
          .deleteReservation(this.data.hotelId, this.data.roomId, reservaId)
          .subscribe(
            () => {
              // Actualizamos la lista de reservas después de eliminar una
              this.reservas = this.reservas.filter((r) => r.id !== reservaId);
              Swal.fire('¡Reserva eliminada!', '', 'success');
            },
            (error) => {
              Swal.fire('Error al eliminar la reserva', 'Por favor, inténtelo nuevamente.', 'error');
            }
          );
      }
    });
  }
}