import { RoutesInterface } from "./interfaces/Routes";

import Calendar from "./pages/Calendar/Calendar";
import Appointments from "./pages/Appointments/Appointments";
import Contributors from "./pages/Contributors/Contributors";
import LocationPendingLinks from "./pages/LocationPendingLinks/LocationPendingLinks";
import LocationPatients from "./pages/LocationPatients/LocationPatients";
import Settings from "./pages/Settings/Settings";

const routes: RoutesInterface[] = [
  {
    show: true,
    path: "/agenda",
    name: "Agenda Médica",
    icon: "fa-solid fa-calendar-week text-medical",
    component: Calendar,
    layout: "/admin",
  },
  {
    show: true,
    path: "/consultas",
    name: "Minhas Consultas",
    icon: "fa-solid fa-file-signature text-medical",
    component: Appointments,
    layout: "/admin",
  },
  {
    show: true,
    path: "/colaboradores",
    name: "Médicos e Enfermeiros",
    icon: "fa-solid fa-user-doctor text-medical",
    component: Contributors,
    layout: "/admin",
  },
  {
    show: true,
    path: "/vinculacoes",
    name: "Vinculos Pendentes",
    icon: "fa-solid fa-link text-medical",
    component: LocationPendingLinks,
    layout: "/admin",
  },
  {
    show: true,
    path: "/pacientes",
    name: "Pacientes da Unidade",
    icon: "fa-solid fa-hospital-user text-medical",
    component: LocationPatients,
    layout: "/admin",
  },
  {
    show: true,
    path: "/configuracoes",
    name: "Configurações",
    icon: "fa-solid fa-gear text-medical",
    component: Settings,
    layout: "/admin",
  },
  {
    show: true,
    name: "Sair",
    icon: "fa-solid fa-arrow-right-from-bracket text-medical",
    logout: true,
    layout: "/admin",
  },
];

export default routes;
