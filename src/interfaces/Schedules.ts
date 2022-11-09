import { Doctor } from "./Doctors";

export interface Schedules {
  created_at: string;
  date: string;
  doctor: Doctor;
  event_name: string;
  hour: string;
  id: number;
  notes: string | null;
  patient: any;
  status: string;
  updated_at: string;
}
