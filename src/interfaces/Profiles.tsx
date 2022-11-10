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

export interface Patient {
  id: number;
  cpf: string;
  email: string;
  login: string;
  phone: string;
  sus_card: string | null;
  fullname: string;
  first_access: boolean;
  birthdate: string;
  profile_picture: string | null;
  created_at: string;
  updated_at: string;
}
