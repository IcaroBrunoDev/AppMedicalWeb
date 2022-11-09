import * as React from "react";

import { Container, Row, Col } from "reactstrap";

import MyProfile from "../../components/Settings/MyProfile";
import MyLocation from "../../components/Settings/MyLocation";
import LinkedLocations from "../../components/Settings/LinkedLocations";

export default function Settings() {
  return (
    <Row>
      <Col className="mb-5" lg="6">
        <MyProfile />
      </Col>
      <Col className="mb-5" lg="6">
        <MyLocation />
      </Col>
      <Col className="mb-5" lg="12">
        <LinkedLocations />{" "}
      </Col>
    </Row>
  );
}
