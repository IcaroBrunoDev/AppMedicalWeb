import React from "react";
import { Link, useLocation } from "react-router-dom";

import { Container, Card, CardBody, Row, Col } from "reactstrap";

import SignForm from "../components/SingIn/SingInForm";

export default function Auth() {
  const location = useLocation();
  const mainContent = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (mainContent.current) {
      document.documentElement.scrollTop = 0;
      mainContent.current.scrollTop = 0;
    }
  }, [location]);

  return (
    <div className="main-content bg-white" ref={mainContent}>
      <div className="py-5 py-lg-7 mb-md-5">
        <Container>
          <div className="header-body text-center mb-5">
            <Row className="justify-content-center">
              <Col lg="5" md="6">
                <img
                  width={185}
                  height={100}
                  alt="medico-aqui"
                  src={require("../assets/img/brand/logo.png")}
                />
                <p className="text-lead text-black mt-4">Painel Médico</p>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
      {/* Page content */}
      <Container className="mt-md--9 pb-5">
        <Row className="justify-content-center">
          <Col lg="5" md="7">
            <Card className="bg-secondary shadow border-0">
              <CardBody className="px-lg-5 py-lg-5">
                <div className="text-center text-black mb-4">
                  <small>Acesse com suas credenciais</small>
                </div>
                <SignForm />
              </CardBody>
            </Card>
            <Row className="mt-3">
              <Col xs="6">
                <Link
                  to={{
                    pathname: "/forgot-password",
                  }}
                  className="text-dark"
                >
                  <small>Esqueceu sua senha?</small>
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
