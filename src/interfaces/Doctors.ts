export interface CreateDoctorProps {
  open: boolean;
  onClose: () => void;
  onRefresh: () => void;
}

export interface Doctor {
  id: string;
  fullname: string;
  email: string;
  crm: string;
  cpf: string;
  phone: string;
  specialty?: string | any;
  profile_picture: string;
  created_at: Date;
  updated_at: Date;
}
