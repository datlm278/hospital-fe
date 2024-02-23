import {Component, Inject, OnInit} from '@angular/core';
import {BaseAddOrUpdateDialogComponent, BaseAddOrUpdateDialogData} from "../base/hospital.base";
import {DailyRecordModel} from "../model/daily-record.model";
import moment from "moment";
import {NgForOf, NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MessageService} from "primeng/api";
import {HospitalService} from "../service/hospital.service";
import {PatientModel} from "../model/patient.model";
import {AddOrEditPatientComponent} from "../add-or-edit-patient/add-or-edit-patient.component";
import {AddOrEditHistoryComponent} from "../add-or-edit-history/add-or-edit-history.component";

export interface DailyRecordData extends BaseAddOrUpdateDialogData {
  patientId: number;
  dailyRecord: DailyRecordModel[];
}

@Component({
  selector: 'app-history-dialog',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    MatIcon,
    MatIconButton,
    MatTooltip,
    MatButton
  ],
  templateUrl: './history-dialog.component.html',
  styleUrl: './history-dialog.component.css',
  providers: [MessageService]
})
export class HistoryDialogComponent extends BaseAddOrUpdateDialogComponent<DailyRecordData> implements OnInit {

  dailyRecords: DailyRecordModel[] = []
  dailyRecord?: DailyRecordModel;
  ngOnInit(): void {
    this.getAllDailyRecord();
  }

  constructor(private dialog: MatDialog,
              public override dialogRef: MatDialogRef<typeof self>,
              private messageService: MessageService,
              @Inject(MAT_DIALOG_DATA) public override data: DailyRecordData,
              private hospitalService: HospitalService) {
    super(dialogRef, data);
  }

  convertTime(time: string | undefined): any {
    if (time) {
      let datetime = time.split('T');
      return moment(new Date(datetime[0])).format('DD-MM-YYYY');
    }
  }

  private getAllDailyRecord() {
    this.hospitalService.getAllDailyRecord(this.data.patientId).subscribe({
      next: (res) => {
        this.dailyRecords = res;

        console.log("patients", res)

      }, error: (err) => {
        console.log(err);
      }
    })
  }

  showCreate() {
    this.dailyRecord = {
      note: '',
      result: '',
    }
    setTimeout(() => {
      const createHistory = this.dialog.open(AddOrEditHistoryComponent, {
        data: {
          isCreate: true,
          dailyRecord: this.data,
        },
        disableClose: true,
        width: '40%'
      });
      createHistory.afterClosed().subscribe((dailyRecord: DailyRecordModel) => {
        if (dailyRecord === undefined) return;

        console.log("data", dailyRecord);

        this.dailyRecord = {
          patientId: this.data.patientId,
          doctorId: dailyRecord.doctorId,
          nurseId: dailyRecord.nurseId,
          note: dailyRecord.note,
          result: dailyRecord.result
        }

        console.log('dataRequest', this.dailyRecord);

        this.hospitalService.createDailyRecord(this.dailyRecord).subscribe({
          next: (res: any) => {
            console.log("newWorkflow", res);

            this.messageService.add({
              severity: 'success',
              summary: 'Thành công',
              detail: "Thêm mới lịch sử thành công",
              icon: "pi pi-check",
              life: 15000
            });

            this.getAllDailyRecord();

          }, error: (err: any) => {
            console.log("create error", err);
          }
        })
      })
    }, 100)
  }

  showUpdate(id: number | undefined) {
    if (id != undefined) {
      this.hospitalService.getDetailDailyRecord(id).subscribe({
        next: res => {
          this.dailyRecord = res;

          setTimeout(() => {
            const updateWorkflow = this.dialog.open(AddOrEditHistoryComponent, {
              data: {
                dailyRecord: this.dailyRecord,
                isCreate: false,
              },
              disableClose: true,
              width: '40%'
            })
            updateWorkflow.afterClosed().subscribe((dailyRecord : DailyRecordModel) => {
              if (dailyRecord === undefined) return;


              this.dailyRecord = {
                patientId: this.data.patientId,
                doctorId: dailyRecord.doctorId,
                nurseId: dailyRecord.nurseId,
                note: dailyRecord.note,
                result: dailyRecord.result
              }

              console.log("updateWorkflowRequest", this.dailyRecord);

              this.hospitalService.updateDailyRecord(id, this.dailyRecord).subscribe({
                next: (res: any) => {
                  console.log("updateWorkflow", res);

                  this.messageService.add({
                    severity: 'success',
                    summary: 'Thành công',
                    detail: "Cập nhật thông tin lịch sử thành công",
                    icon: "pi pi-check",
                    life: 15000
                  });

                  this.getAllDailyRecord();

                }, error: (err: any) => {
                  console.log("error update", err);
                }
              })
            })
          }, 100)
        }
      })
    }
  }
}
