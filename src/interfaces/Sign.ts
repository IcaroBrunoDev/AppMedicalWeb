/** @type {Object} */
export interface Credentials {
  email: string;
  password: string;
}

/** @type {Object} */
export interface SignUpProfile {
  fullname: string;
  email: string;
  phone: string;
  password: string;
  cpf: string;
  password_confirmation: string;
  attendance_local: string;
}

/** @type {Object} */
export interface AttendanceLocal {
  id?: number;
  local_name: string;
  local_address: LocalAddress;
  is_specialized: boolean;
  create_at: Date;
  updated_at: Date;
}

/** @type {Object} */
export type LocalAddress = {
  cep: string;
  state: string;
  city: string;
  street: string;
  neighborhood: string;
  number?: number | null;
};
