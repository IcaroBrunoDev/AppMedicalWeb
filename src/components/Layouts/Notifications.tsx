import * as React from "react";

import { Navbar, Container } from "reactstrap";

interface NotificationsSideBarProps {
  onClose: () => void;
}

export default function NotificationsSideBar({
  onClose,
}: NotificationsSideBarProps) {
  return (
    <Navbar
      id="sidenav-main"
      expand="md"
      className="navbar-vertical navbar-vertical--notification fixed-left navbar-light bg-white"
    >
      <Container>
        <div className="w-100 d-flex flex-row justify-content-between">
          <span className="text-sm text-dark mt-2">Notificacões</span>
          <span
            id="close-span"
            className="font-small mt-2 cursor-pointer"
            onClick={onClose}
          >
            <i className="fa-solid fa-xmark"></i>
          </span>
        </div>
      </Container>
    </Navbar>
  );
}
