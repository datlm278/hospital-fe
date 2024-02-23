import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {HttpClient} from "@angular/common/http";
import {HospitalUrl} from "../constant/hospital-url";
import {PatientModel} from "../model/patient.model";
import {DailyRecordModel} from "../model/daily-record.model";

@Injectable({
  providedIn: 'root'
})
export class HospitalService extends BaseService{

  constructor(readonly http: HttpClient) {
    super(http);
  }

  getAllPatient() {
    return this.get(HospitalUrl.PATIENT.BASE);
  }

  createPatient(body: PatientModel) {
    return this.post(HospitalUrl.PATIENT.BASE, body, {});
  }

  updatePatient(id: number, body: PatientModel) {
    return this.put(`${HospitalUrl.PATIENT.BASE}/${id}`, body,);
  }

  dischargePatient(id: number) {
    return this.put(`${HospitalUrl.PATIENT.BASE}/discharge/${id}`);
  }

  getDetailPatient(id: number) {
    return this.get(`${HospitalUrl.PATIENT.BASE}/${id}`, {})
  }

  getStaff(type: string) {
    return this.get(HospitalUrl.STAFF.BASE, {type: type});
  }

  getAllDailyRecord(id: number) {
    return this.get(HospitalUrl.DAILY_RECORD.BASE, {id: id});
  }

  createDailyRecord(body: DailyRecordModel) {
    return this.post(HospitalUrl.DAILY_RECORD.BASE, body, {});
  }

  updateDailyRecord(id: number, body: DailyRecordModel) {
    return this.put(`${HospitalUrl.DAILY_RECORD.BASE}/${id}`, body,);
  }

  getDetailDailyRecord(id: number) {
    return this.get(`${HospitalUrl.DAILY_RECORD.BASE}/${id}`, {})
  }
}
