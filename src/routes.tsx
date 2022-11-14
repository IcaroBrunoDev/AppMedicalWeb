import { RoutesInterface } from "./interfaces/Routes";

import Calendar from "./pages/Calendar/Calendar";
import Contributors from "./pages/Contributors/Contributors";
import LocationPendingLinks from "./pages/Places/Places";
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
