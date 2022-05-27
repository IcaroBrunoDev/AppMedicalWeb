import { WeekDays } from "../interfaces/General";

export const daysOfWeek: WeekDays[] = [
  {
    name: "Domingo",
    shortname: "Dom.",
    objectName: "domingo",
  },
  {
    name: "Segunda-Feira",
    shortname: "Seg.",
    objectName: "segunda_feira",
  },
  {
    name: "Terca-Feira",
    shortname: "Ter.",
    objectName: "terca_feira",
  },
  {
    name: "Quarta-Feira",
    shortname: "Qua.",
    objectName: "quarta_feira",
  },
  {
    name: "Quinta-Feira",
    shortname: "Qui.",
    objectName: "quinta_feira",
  },
  {
    name: "Sexta-Feira",
    shortname: "Sex.",
    objectName: "sexta_feira",
  },
  {
    name: "Sábado",
    shortname: "Sab.",
    objectName: "sabado",
  },
];

export const signup_credentials = {
  email: "",
  phone: "",
  cpf: "",
  fullname: "",
  password: "",
  password_confirmation: "",
  attendance_local: "",
};

export const create_doctor = {
  email: null,
  fullname: null,
  cpf: null,
  crm: null,
  phone: null,
  specialty: null,
  main_attendance_location: null,
};

export const create_admin_nurse = {
  email: null,
  fullname: null,
  cpf: null,
  phone: null,
  main_attendance_location: null,
};

export const health_professionals = {
  email: null,
  fullname: null,
  cpf: null,
  phone: null,
};
