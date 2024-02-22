export class HospitalUrl {
  public static readonly CONTEXT_PATH = '/hospital';

  public static readonly STAFF = {
    BASE: `${this.CONTEXT_PATH}/staff`,
  }

  public static readonly PATIENT = {
    BASE: `${this.CONTEXT_PATH}/patient`,
  }

  public static readonly DAILY_RECORD = {
    BASE: `${this.CONTEXT_PATH}/daily-record`,
  }

  public static readonly PatientStatus = {
    DANG_DIEU_TRI: "DANG_DIEU_TRI",
    XUAT_VIEN: "XUAT_VIEN"
  }

  public static readonly StaffType = {
    BAC_SI: "BAC_SI",
    Y_TA: "Y_TA"
  }
}
