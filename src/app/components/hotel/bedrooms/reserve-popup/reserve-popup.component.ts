import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsersService } from 'src/app/services/users.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reserve-popup',
  templateUrl: './reserve-popup.component.html',
  styleUrls: ['./reserve-popup.component.scss'],
})
export class ReservePopupComponent implements OnInit {
  room: any; // Variable para almacenar los datos de la habitación
  userList: any[] = []; // Lista de usuarios
  reserveForm: FormGroup; // Formulario de reserva

  // Variable para la fecha de reserva
  // Puedes inicializarla con la fecha actual u otra fecha por defecto si lo deseas
  reserveDate: Date = new Date();

  constructor(
    public dialogRef: MatDialogRef<ReservePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private usersService: UsersService,
    private fb: FormBuilder
  ) {
    this.room = data;
    this.reserveForm = this.fb.group({
      selectedUser: ['', Validators.required],
      selectedUserName: [''],
      fechaReserva: [this.reserveDate, Validators.required],
    });
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.usersService.getUsers().subscribe((users: any[]) => {
      this.userList = users;
    });
  }

  // Función para realizar la reserva
  reserveRoom() {
    const selectedUserId = this.reserveForm.get('selectedUser')?.value;
    const selectedUser = this.userList.find(
      (user) => user.id === selectedUserId
    );
    if (selectedUser) {
      this.reserveForm.get('selectedUserName')?.setValue(selectedUser.name);
    }
    if (this.reserveForm.valid) {
      const selectedUserId = this.reserveForm.value.selectedUser;
    } else {
      Swal.fire(
        'Formulario inválido',
        'Por favor, complete los campos requeridos.',
        'error'
      );
    }
  }

  // Función para cerrar el diálogo
  closeDialog() {
    this.dialogRef.close();
  }
}
