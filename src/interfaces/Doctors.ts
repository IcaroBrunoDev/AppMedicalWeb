export interface CreateDoctorProps {
  open: boolean;
  onClose: () => void;
  onRefresh: () => void;
}

export interface Doctor {
  email: string | null;
  fullname: string | null;
  cpf: string | null;
  crm: string | null;
  phone: string | null;
  specialty: string | any;
  main_attendance_location: string | null;
}
