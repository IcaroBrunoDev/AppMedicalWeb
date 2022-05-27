import * as React from "react";

import { Container, Row, Col } from "reactstrap";

import Header from "../../components/Layouts/Header";
import MyProfile from "../../components/Settings/MyProfile";
import MyLocation from "../../components/Settings/MyLocation";
import LinkedLocations from "../../components/Settings/LinkedLocations";

export default function Settings() {
  return (
    <>
      <Header />
      <Container className="mt--9" fluid>
        <Row>
          <Col className="mb-5" lg="12">
            <MyProfile />
          </Col>
          <Col className="mb-5" lg="12">
            <MyLocation />
          </Col>
          <Col className="mb-5" lg="12">
            <LinkedLocations />{" "}
          </Col>
        </Row>
      </Container>
    </>
  );
}
