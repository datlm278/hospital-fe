import {Component, Inject, OnInit} from '@angular/core';
import {BaseAddOrUpdateDialogComponent, BaseAddOrUpdateDialogData} from "../base/hospital.base";
import {PatientModel} from "../model/patient.model";
import {
  MAT_DIALOG_DATA,
  MatDialogActions, MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {NgSelectModule} from "@ng-select/ng-select";

export interface AddOrUpdatePatientData extends BaseAddOrUpdateDialogData {
  patient: PatientModel;
}
@Component({
  selector: 'app-add-or-edit-patient',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    FormsModule,
    MatDialogActions,
    MatDialogClose,
    NgIf,
    NgSelectModule
  ],
  templateUrl: './add-or-edit-patient.component.html',
  styleUrl: './add-or-edit-patient.component.css'
})
export class AddOrEditPatientComponent extends
  BaseAddOrUpdateDialogComponent<AddOrUpdatePatientData> implements OnInit {

  constructor(public override dialogRef: MatDialogRef<typeof self>,
              @Inject(MAT_DIALOG_DATA) public override data: AddOrUpdatePatientData ) {
    super(dialogRef, data);
  }

  ngOnInit(): void {
  }

}
