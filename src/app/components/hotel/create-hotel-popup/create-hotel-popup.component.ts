import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Hotel } from 'src/app/models/hotel.model';

@Component({
  selector: 'app-create-hotel-popup',
  templateUrl: './create-hotel-popup.component.html',
  styleUrls: ['./create-hotel-popup.component.scss'],
})
export class CreateHotelPopupComponent implements OnInit {
  hotelForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<CreateHotelPopupComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Hotel
  ) {
    this.hotelForm = this.formBuilder.group({
      name: ['', Validators.required],
      enabled: [true, Validators.required],
      createdAt: [new Date(), Validators.required],
      bedrooms: [[]],
    });

    if (data) {
      this.hotelForm.patchValue(data);
    }
  }

  ngOnInit(): void {}

  createHotel() {
    if (this.hotelForm.valid) {
      const newHotel: Hotel = this.hotelForm.value;
      this.dialogRef.close(newHotel);
    } else {
      console.log('Invalid form');
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
