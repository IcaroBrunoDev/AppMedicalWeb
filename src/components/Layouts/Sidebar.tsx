import * as React from "react";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";

import {
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";

import { useAuth } from "../../context/AuthProvider";
import { SidebarProps } from "../../interfaces/Sidebar";

export default function Sidebar({ routes }: SidebarProps) {
  const { profile, logout } = useAuth();

  const [collapseOpen, setCollapseOpen] = React.useState<boolean>(false);

  const toggleCollapse = () => {
    setCollapseOpen(!collapseOpen);
  };

  const closeCollapse = () => {
    setCollapseOpen(false);
  };

  const signOut = async () => {
    await logout();
  };

  const createLinks = (routes: any) => {
    return routes.map((prop: any, key: any) => {
      const { show, layout, path, logout, icon, name } = prop;
      return (
        show && (
          <NavItem key={key}>
            <NavLink
              to={layout + path}
              tag={NavLinkRRD}
              onClick={logout ? signOut : closeCollapse}
              activeClassName="active"
            >
              <i className={icon} />
              {name}
            </NavLink>
          </NavItem>
        )
      );
    });
  };

  return (
    <Navbar
      id="sidenav-main"
      expand="md"
      className="navbar-vertical fixed-left navbar-light bg-white"
    >
      <Container fluid>
        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleCollapse}
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* Brand */}
        <NavbarBrand className="pt-0 text-medical">
          <span>AppMédicoWeb</span>
        </NavbarBrand>

        <Nav className="align-items-center d-md-none">
          {/* <UncontrolledDropdown nav>
            <DropdownToggle nav className="nav-link-icon">
              <i className="ni ni-bell-55" />
            </DropdownToggle>
            <DropdownMenu
              aria-labelledby="navbar-default_dropdown_1"
              className="dropdown-menu-arrow"
              right
            >
              <DropdownItem>Action</DropdownItem>
              <DropdownItem>Another action</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Something else here</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown> */}

          {/* User */}
          <UncontrolledDropdown nav>
            <DropdownToggle nav>
              <Media className="align-items-center">
                <span className="avatar avatar-sm rounded-circle">
                  <img alt="profile_picture" src={profile?.profile_picture} />
                </span>
              </Media>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-arrow" right>
              <DropdownItem className="noti-title" header tag="div">
                <h6 className="text-overflow m-0">Navegue por:</h6>
              </DropdownItem>
              <DropdownItem to="/admin/configuracoes" tag={Link}>
                <i className="ni ni-settings-gear-65" />
                <span>Configurações</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>

        {/* Collapse */}
        <Collapse navbar isOpen={collapseOpen}>
          {/* Collapse header */}
          <div className="navbar-collapse-header d-md-none">
            <Row>
              <Col className="collapse-close" xs="6">
                <NavbarBrand className="pt-0 text-medical">
                  <span>AppMédicoWeb</span>
                </NavbarBrand>
              </Col>
              <Col className="collapse-close" xs="6">
                <button
                  className="navbar-toggler"
                  type="button"
                  onClick={toggleCollapse}
                >
                  <span />
                  <span />
                </button>
              </Col>
            </Row>
          </div>

          {/* Navigation */}
          <Nav navbar>{createLinks(routes)}</Nav>
          {/* Divider */}
          <hr className="my-3" />
        </Collapse>
      </Container>
    </Navbar>
  );
}
