import * as React from "react";

import { Link } from "react-router-dom";

import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Navbar,
  Nav,
  Container,
  Media,
} from "reactstrap";

import { useAuth } from "../../context/AuthProvider";
import { usePlaces } from "../../context/PlacesProvider";

interface AdminNavbarProps {
  brandText: string;
}

export default function AdminNavbar({ brandText }: AdminNavbarProps) {
  const { profile } = useAuth();
  const { locations, selectedLocation, setSelectedLocation } = usePlaces();

  const handleAttendanceLocation = (event: any, place: any) => {
    event.preventDefault();
    setSelectedLocation(place);
  };

  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <span className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block">
            {brandText}
          </span>
          <Nav className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm text-white font-weight-bold">
                      Local de Atendimento: {selectedLocation.local_name}
                    </span>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                {locations.length > 0 &&
                  locations.map((local: any, key: any) => (
                    <DropdownItem
                      key={key}
                      onClick={(event) =>
                        handleAttendanceLocation(event, local.location)
                      }
                    >
                      <i className="fa fa-hospital-user text-medical" />
                      <span>{local.location.local_name}</span>
                    </DropdownItem>
                  ))}
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <Nav className="align-items-center d-none d-md-flex" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <img alt="profile_picture" src={profile?.profile_picture} />
                  </span>
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold"></span>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem to="/admin/configuracoes" tag={Link}>
                  <i className="fa-solid fa-gear text-medical" />
                  <span>Configurações</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          {/* <Nav
            onClick={() => setNotifications(true)}
            className="align-items-center d-none d-md-flex ml-3 cursor-pointer"
          >
            <i className="ni ni-bell-55 text-white mr-1"></i>
            <Badge className="badge-white">0</Badge>
          </Nav> */}
        </Container>
      </Navbar>
    </>
  );
}
