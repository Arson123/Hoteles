import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Hotel } from 'src/app/models/hotel.model';

@Component({
  selector: 'app-create-bedroom-popup',
  templateUrl: './create-bedroom-popup.component.html',
  styleUrls: ['./create-bedroom-popup.component.scss'],
})
export class CreateBedroomPopupComponent {
  roomForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<CreateBedroomPopupComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Hotel
  ) {
    this.roomForm = this.formBuilder.group({
      amountPeople: [null, [Validators.required, Validators.min(1)]],
      enabled: [true, Validators.required],
      reserved: [false, Validators.required]
    });

    if (data) {
      this.roomForm.patchValue(data);
    }
  }

  ngOnInit(): void {}

  createHotel() {
    if (this.roomForm.valid) {
      const newRoom: any = this.roomForm.value;
      this.dialogRef.close(newRoom);
    } else {
      console.log('Invalid form');
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
