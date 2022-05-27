import React from "react";
import { Link, useLocation } from "react-router-dom";

import {
  Container,
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Spinner,
} from "reactstrap";

import { Credentials } from "../interfaces/Sign";

import api from "../utils/axios";
import { usePropsContext } from "../index";
import { storageProfile, storageSessionToken } from "../utils/caches";
import {
  AlertType,
  AwaitedApiProfile,
  AwaitedApiToken,
} from "../interfaces/General";
import { ExceptionMessages } from "../utils/messages";
import { decodeExceptionObject } from "../utils/helpers";

enum Provider {
  admin_nurse = "admin_nurse",
  specialized_doctor = "specialized_doctor"
}

export default function Auth() {
  const location = useLocation();
  const mainContent = React.useRef<HTMLDivElement>(null);

  const { showAlert }: any = usePropsContext();

  const [loading, setLoading] = React.useState<boolean>(false);
  const [credentials, setCredentials] = React.useState<Credentials>({
    authenticator: "",
    password: "",
  });

  const handleInput = (target: HTMLInputElement) => {
    const { name, value } = target;
    setCredentials((prev: any) => ({ ...prev, [name]: value }));
  };

  async function authenticate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { authenticator, password } = credentials;

    if (authenticator === "" || password === "") {
      showAlert({
        open: true,
        type: AlertType.danger,
        message: "Preencha todos os campos para continuar!",
      });
      return;
    }

    setLoading(true);

    try {
      const { data } = await api.post<AwaitedApiToken>("/signin", {
        login: authenticator,
        password,
        provider: Provider.specialized_doctor,
      });

      const { token } = data.response;

      storageSessionToken(data.response);

      const profile = await api.get<AwaitedApiProfile>("/doctors", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      storageProfile(profile.data.response);

      window.location.href = "/#/admin/agenda";
    } catch (err: any) {
      showAlert({
        open: true,
        type: AlertType.danger,
        message: decodeExceptionObject(err, ExceptionMessages.user_dont_exist),
      });
    } finally {
      setLoading(false);
    }
  }

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
                <p className="text-lead text-black mt-4">
                  Painel Médico
                </p>
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
                <Form role="form" onSubmit={authenticate}>
                  <FormGroup className="mb-3">
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-email-83" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        name="authenticator"
                        placeholder="Email *"
                        type="email"
                        autoComplete="authenticator"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleInput(e.target)
                        }
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-lock-circle-open" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        name="password"
                        placeholder="Senha *"
                        type="password"
                        autoComplete="password"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleInput(e.target)
                        }
                      />
                    </InputGroup>
                  </FormGroup>
                  <div className="text-center">
                    <Button className="my-4" color="secondary" type="submit">
                      {loading ? (
                        <Spinner animation="border" role="status" size="sm">
                          <span className="visually-hidden">Carregando...</span>
                        </Spinner>
                      ) : (
                        "Entrar"
                      )}
                    </Button>
                  </div>
                </Form>
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
