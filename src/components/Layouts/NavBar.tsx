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
  Badge,
} from "reactstrap";

import Notifications from "./Notifications";

import api from "../../utils/axios";
import { usePropsContext } from "../..";
import { getStoragedProfile } from "../../utils/caches";

interface AdminNavbarProps {
  brandText: string;
}

export default function AdminNavbar({ brandText }: AdminNavbarProps) {
  const { profile_picture } = getStoragedProfile();

  const { showAlert, setSelectedLocationId }: any = usePropsContext();

  const [notifications, setNotifications] = React.useState<boolean>(false);
  const [selectedLocation, setSelectedLocation] = React.useState<any>(null);
  const [attendanceLocations, setAttedanceLocations] = React.useState<any>([]);

  React.useEffect(() => {
    const getAttendanceLocations = async () => {
      try {
        const { data } = await api.get("/places");

        if (data.response.length > 0) {
          setSelectedLocation(data.response[0]);
          setAttedanceLocations(data.response);
          setSelectedLocationId(data.response[0]?.location.id);
        } else {
        }
      } catch (err) {
        showAlert({ open: true, type: "danger", message: err });
      }
    };

    getAttendanceLocations();
  }, []);

  const handleAttendanceLocation = (event: any, place: any) => {
    event.preventDefault();
    setSelectedLocation(place);
    setSelectedLocationId(place.location.id);
  };

  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <Link
            to="/"
            className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
          >
            {brandText}
          </Link>
          <Nav className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm text-white font-weight-bold">
                      Local de Atendimento:{" "}
                      {selectedLocation?.location.local_name}
                    </span>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                {attendanceLocations.length > 0 &&
                  attendanceLocations.map((place: any, key: any) => (
                    <DropdownItem
                      key={key}
                      href="/"
                      onClick={(event) =>
                        handleAttendanceLocation(event, place)
                      }
                    >
                      <i className="fa fa-hospital-user text-medical" />
                      <span>{place.location.local_name}</span>
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
                    <img alt="profile_picture" src={profile_picture} />
                  </span>
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold"></span>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem href="#" onClick={(e) => e.preventDefault()}>
                  <i className="ni ni-user-run" />
                  <span>Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <Nav
            onClick={() => setNotifications(true)}
            className="align-items-center d-none d-md-flex ml-3 cursor-pointer"
          >
            <i className="ni ni-bell-55 text-white"></i>
            <Badge className="badge-white">0</Badge>
          </Nav>
        </Container>
      </Navbar>

      {notifications && (
        <Notifications onClose={() => setNotifications(false)} />
      )}
    </>
  );
}
