import * as React from "react";

import { Card, CardHeader, Row, Col, CardFooter, CardBody } from "reactstrap";

import { useAuth } from "../../context/AuthProvider";

export default function Profile() {
  const { profile } = useAuth();

  return (
    <Card className="shadow">
      <CardHeader className="border-bottom d-flex flex-row flex-wrap justify-content-between align-items-center">
        <Row className="w-100  ">
          <Col>
            <h3 className="mb-0">
              Perfil Médico(a):{" "}
              <span className="m-1 font-weight-bold text-medical">
                {profile?.fullname}
              </span>
            </h3>
          </Col>
        </Row>
      </CardHeader>
      <CardBody>
        <Row>
          <Col
            lg="12"
            sm="12"
            className="d-flex flex-row justify-content-start align-items-center py-2"
          >
            <img
              width={100}
              height={100}
              className="rounded-circle mr-3"
              src={profile?.profile_picture}
              alt="profile_picture"
            />
            <div className="ml-3">
              <p className="m-1 font-weight-bold">
                E-mail: <span className="text-medical">{profile?.email}</span>
              </p>
              <p className="m-1 font-weight-bold">
                CPF: <span className="text-medical">{profile?.cpf}</span>
              </p>
              <p className="m-1 font-weight-bold">
                Telefone: <span className="text-medical">{profile?.phone}</span>
              </p>
            </div>
          </Col>
        </Row>
      </CardBody>
      <CardFooter>
        <div className="d-flex flex-row justify-content-between">
          <div>
            {" "}
            <button
              onClick={() => console.log(true)}
              className="btn btn-medical"
            >
              Editar Perfil
            </button>
          </div>
          <div>
            {" "}
            <button
              onClick={() => console.log(true)}
              className="btn btn-warning"
            >
              Desablitar Perfil
            </button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
