import { AttendanceLocal } from "./Sign";

export interface SessionToken {
  type: string;
  token: string;
  expires_at: Date;
}

export interface ProfileInterface {
  id: number;
  fullname: string;
  email: string;
  phone: string;
  created_at: Date;
  updated_at: Date;
  attendance_local: AttendanceLocal;
}

export interface AwaitedApiToken {
  response: SessionToken;
}

export interface AwaitedApiProfile {
  response: ProfileInterface;
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

export type Doctor = {
  id: string;
  fullname: string;
  email: string;
  crm: string;
  cpf: string;
  phone: string;
  profile_picture: string;
  created_at: Date;
  updated_at: Date;
};
