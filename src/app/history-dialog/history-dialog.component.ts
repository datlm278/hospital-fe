import { Component } from '@angular/core';
import {BaseAddOrUpdateDialogComponent, BaseAddOrUpdateDialogData} from "../base/hospital.base";
import {DailyRecordModel} from "../model/daily-record.model";
import moment from "moment";
import {NgForOf, NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";

export interface DailyRecordData extends BaseAddOrUpdateDialogData {
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
  styleUrl: './history-dialog.component.css'
})
export class HistoryDialogComponent extends
  BaseAddOrUpdateDialogComponent<DailyRecordData> {

  convertTime(time: string | undefined): any {
    if (time) {
      let datetime = time.split('T');
      return moment(new Date(datetime[0])).format('DD-MM-YYYY');
    }
  }

}
