import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Hotel } from 'src/app/models/hotel.model';

@Component({
  selector: 'app-update-hotel-popup',
  templateUrl: './update-hotel-popup.component.html',
  styleUrls: ['./update-hotel-popup.component.scss'],
})
export class UpdateHotelPopupComponent implements OnInit {
  hotelForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<UpdateHotelPopupComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Hotel
  ) {
    this.hotelForm = this.formBuilder.group({
      id: [data.id, Validators.required],
      name: [data.name, Validators.required],
      enabled: [data.enabled, Validators.required],
      createdAt: [data.createdAt, Validators.required],
      bedrooms: [data.bedrooms],
    });
  }

  ngOnInit(): void {}

  updateHotel() {
    if (this.hotelForm.valid) {
      const updatedHotel: Hotel = this.hotelForm.value;
      this.dialogRef.close(updatedHotel);
    } else {
      console.log('Invalid form');
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}