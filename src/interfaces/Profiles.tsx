export enum ProfessionalProfiles {
  doctor = "doctor",
  health_professional = "health_professional",
}

export interface AdminNurseCreate {
  email: string | null;
  fullname: string | null;
  cpf: string | null;
  phone: string | null;
  main_attendance_location: string | null;
}

export type ReadDoctors = {
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

export interface ProfessionalCreate {
  email: string | null;
  fullname: string | null;
  phone: string | null;
  cpf: string | null;
}

export interface ProfessionalRead {}
