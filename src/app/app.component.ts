import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {MatDialog} from "@angular/material/dialog";
import {MessageService} from "primeng/api";
import {HospitalService} from "./service/hospital.service";
import {PatientModel} from "./model/patient.model";
import moment from 'moment';
import {NgForOf} from "@angular/common";
import {AddOrEditPatientComponent} from "./add-or-edit-patient/add-or-edit-patient.component";
import {ToastModule} from "primeng/toast";
import {DailyRecordModel} from "./model/daily-record.model";
import {HistoryDialogComponent} from "./history-dialog/history-dialog.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatTabGroup, MatTab, MatIcon, MatIconButton, MatTooltip, MatButton, NgForOf, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [MessageService]
})
export class AppComponent implements OnInit {

  data?: PatientModel;
  patients: PatientModel[] = [];

  dailyRecord: DailyRecordModel[] = [];
  ngOnInit(): void {
    this.getAllPatient();
  }
  constructor(private dialog: MatDialog,
              private messageService: MessageService,
              private hospitalService: HospitalService) {
  }
  private getAllPatient() {
    this.hospitalService.getAllPatient().subscribe({
      next: (res) => {
        this.patients = res;

        console.log("patients", res)

      }, error: (err) => {
        console.log(err);
      }
    })
  }

  convertTime(time: string | undefined): any {
    if (time) {
      let datetime = time.split('T');
      console.log(datetime);
      return moment(new Date(datetime[0])).format('DD/MM/YYYY ');
    }
  }

  showCreate() {
    this.data = {
      fullName: '',
      dob: '',
      address: '',
      cccdNumber: '',
      phoneNumber: ''
    }
    setTimeout(() => {
      const createWorkflow = this.dialog.open(AddOrEditPatientComponent, {
        data: {
          isCreate: true,
          patient: this.data,
        },
        disableClose: true,
        width: '40%'
      });
      createWorkflow.afterClosed().subscribe((data: PatientModel) => {
        if (data === undefined) return;

        console.log("data", data);

        this.data = {
          fullName: data.fullName,
          dob: data.dob,
          address: data.address,
          cccdNumber: data.cccdNumber,
          phoneNumber: data.phoneNumber,
          gender: data.gender
        }

        console.log('dataRequest', this.data);

        this.hospitalService.createPatient(this.data).subscribe({
          next: (res: any) => {
            console.log("newWorkflow", res);

            this.messageService.add({
              severity: 'success',
              summary: 'Thành công',
              detail: "Thêm mới bệnh nhân thành công",
              icon: "pi pi-check",
              life: 15000
            });

            this.getAllPatient();

          }, error: (err: any) => {
            console.log("create error", err);
          }
        })
      })
    }, 100)
  }

  showUpdate(id: number | undefined) {
    if (id != undefined) {
      this.hospitalService.getDetailPatient(id).subscribe({
        next: res => {
          this.data = res;

          console.log("workflowById", res);
          setTimeout(() => {
            const updateWorkflow = this.dialog.open(AddOrEditPatientComponent, {
              data: {
                patient: this.data,
                isCreate: false,
              },
              disableClose: true,
              width: '40%'
            })
            updateWorkflow.afterClosed().subscribe((data : PatientModel) => {
              if (data === undefined) return;

              console.log("data", data);

              this.data = {
                fullName: data.fullName,
                dob: data.dob,
                address: data.address,
                cccdNumber: data.cccdNumber,
                phoneNumber: data.phoneNumber,
                gender: data.gender
              }

              console.log("updateWorkflowRequest", this.data);

              this.hospitalService.updatePatient(id, this.data).subscribe({
                next: (res: any) => {
                  console.log("updateWorkflow", res);

                  this.messageService.add({
                    severity: 'success',
                    summary: 'Thành công',
                    detail: "Cập nhật thông tin bệnh nhân thành công",
                    icon: "pi pi-check",
                    life: 15000
                  });

                  this.getAllPatient();

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

  showHistory(id: number | undefined) {
    if (id) {
      this.hospitalService.getAllDailyRecord(id).subscribe({
        next: res => {
          this.dailyRecord = res;
        }, error: err => {
          console.log("history-error", err);
        }
      })
      setTimeout(() => {
        this.dialog.open(HistoryDialogComponent, {
          data: {
            dailyRecord: this.dailyRecord
          },
          width: '60%',
        });
      }, 100)
    }
  }
}
