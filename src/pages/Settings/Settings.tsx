import * as React from "react";

import { Row, Col } from "reactstrap";

import MyPlaces from "../../components/Settings/MyPlaces";
import MyProfile from "../../components/Settings/MyProfile";

export default function Settings() {
  return (
    <Row>
      <Col className="mb-5" lg="12">
        <MyProfile />
      </Col>
      <Col className="mb-5" lg="12">
        <MyPlaces />
      </Col>
    </Row>
  );
}
