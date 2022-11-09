export interface SessionToken {
  type: string;
  token: string;
  expires_at: Date;
}

export interface Specialtie {
  id: number;
  name: string;
  subspecialtie: boolean;
  created_at: Date;
  updated_at: Date;
}

export enum AlertType {
  success = "success",
  danger = "danger",
  warning = "warning",
}

export interface WeekDays {
  name: string;
  shortname: string;
  objectName: string;
}

export enum Providers {
  doctor = "doctor",
}
