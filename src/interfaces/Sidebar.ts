import { RoutesInterface } from "./Routes";

type LogoProps = {
  imgAlt: string;
  imgSrc: string;
  innerLink: string;
  outterLink?: string;
};

export type NavbarBrandType = {
  to?: string;
  tag?: any;
  href?: string;
  target?: string;
};

export interface SidebarProps {
  logo: LogoProps;
  routes: RoutesInterface[];
}
