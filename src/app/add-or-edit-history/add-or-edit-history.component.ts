import {Component, Inject, OnInit} from '@angular/core';
import {BaseAddOrUpdateDialogComponent, BaseAddOrUpdateDialogData} from "../base/hospital.base";
import {
  MAT_DIALOG_DATA,
  MatDialogActions, MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {HospitalService} from "../service/hospital.service";
import {MessageService} from "primeng/api";
import {StaffModel} from "../model/staff.model";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {NgSelectModule} from "@ng-select/ng-select";
import {DailyRecordModel} from "../model/daily-record.model";

export interface AddOrUpdateHistoryData extends BaseAddOrUpdateDialogData {
  patientId: Number;
  dailyRecord: DailyRecordModel;
}

@Component({
  selector: 'app-add-or-edit-history',
  standalone: true,
  imports: [
    FormsModule,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    NgIf,
    NgSelectModule,
    ReactiveFormsModule,
    MatDialogClose,
    NgForOf
  ],
  templateUrl: './add-or-edit-history.component.html',
  styleUrl: './add-or-edit-history.component.css',
  providers: [MessageService]
})
export class AddOrEditHistoryComponent
  extends BaseAddOrUpdateDialogComponent<AddOrUpdateHistoryData>
  implements OnInit {

  doctors: StaffModel[] = []
  nurses: StaffModel[] = []

  ngOnInit(): void {
    this.getDoctors();
    this.getNurses();
  }

  constructor(public override dialogRef: MatDialogRef<typeof self>,
              private hospitalService: HospitalService,
              private toastService: MessageService,
              @Inject(MAT_DIALOG_DATA) public override data: AddOrUpdateHistoryData) {
    super(dialogRef, data);
  }

  private getDoctors(): void {
    this.hospitalService.getStaff('BAC_SI')
      .subscribe({
        next: (res) => {
          this.doctors = res
        }, error: err => {
          console.log("error", err);
          this.toastService.add({
            severity: 'error',
            summary: "Thất bại",
            detail: 'Không thể lấy dữ liệu bác sĩ',
            life: 15000
          })
        }
      })
  }

  private getNurses(): void {
    this.hospitalService.getStaff('Y_TA')
      .subscribe({
        next: (res) => {
          this.nurses = res
        }, error: err => {
          console.log("error", err);
          this.toastService.add({
            severity: 'error',
            summary: "Thất bại",
            detail: 'Không thể lấy dữ liệu y tá',
            life: 15000
          })
        }
      })
  }

}
