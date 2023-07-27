import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Hotel } from 'src/app/models/hotel.model';

@Component({
  selector: 'app-update-bedroom-popup',
  templateUrl: './update-bedroom-popup.component.html',
  styleUrls: ['./update-bedroom-popup.component.scss']
})
export class UpdateBedroomPopupComponent {
  roomForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<UpdateBedroomPopupComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.roomForm = this.formBuilder.group({
      id: [data.id, Validators.required],
      name: [data.name, Validators.required],
      cost: [data.cost, Validators.required],
      amountPeople: [data.amountPeople, [Validators.required, Validators.min(1)]],
      enabled: [data.enabled, Validators.required],
      reserved: [data.reserved]
    });
  }

  ngOnInit(): void {}

  updateRoom() {
    if (this.roomForm.valid) {
      const updatedRoom: any = this.roomForm.value;
      this.dialogRef.close(updatedRoom);
    } else {
      console.log('Invalid form');
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
