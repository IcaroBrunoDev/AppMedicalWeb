import React from "react";
import {
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
  CardTitle,
} from "reactstrap";

import CreateAttendanceLocal from "../../components/SingUp/AttendanceLocal";

import api from "../../utils/axios";

import { phoneFormatter } from "../../utils/formatters";
import {
  decodeExceptionObject,
  verifyInputsIsFilled,
} from "../../utils/helpers";
import { signup_credentials } from "../../utils/constants";
import { ExceptionMessages } from "../../utils/messages";

import { usePropsContext } from "../../index";
import {
  AlertType,
  AwaitedApiProfile,
  AwaitedApiToken,
} from "../../interfaces/General";
import { AttendanceLocal, SignUpProfile } from "../../interfaces/Sign";

import { storageProfile, storageSessionToken } from "../../utils/caches";

interface Awaited {
  response: AttendanceLocal[];
}

export default function SignUp() {
  const searchResult = React.useRef<HTMLDivElement>(null);

  const { showAlert }: any = usePropsContext();

  const [loading, setLoading] = React.useState<boolean>(false);
  const [searchLoading, setSearchLoading] = React.useState<boolean>(false);

  const [createLocation, setCreateLocation] = React.useState<boolean>(false);

  const [credentials, setCredentials] =
    React.useState<SignUpProfile>(signup_credentials);

  const [locations, setLocations] = React.useState<AttendanceLocal[]>([]);
  const [selectedLocation, setSelectedLocation] =
    React.useState<AttendanceLocal | null>();

  React.useEffect(() => {
    if (locations.length > 0) {
      const element = searchResult.current;
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  }, [locations]);

  const handleInput = (target: HTMLInputElement) => {
    const { name, value } = target;
    setCredentials((prev: any) => ({ ...prev, [name]: value }));
  };

  const handlePhone = (phone: string) => {
    setCredentials((prev: any) => ({
      ...prev,
      phone: phoneFormatter(phone),
    }));
  };

  const searchAttendanceLocal = async () => {
    try {
      clearLocations();

      setSearchLoading(true);

      const { attendance_local } = credentials;

      const { data } = await api.get<Awaited>(
        `/find-locations?location_name=${attendance_local}&is_specialized=${true}`
      );

      setLocations(data.response);
    } catch (err: any) {
      showAlert({
        open: true,
        type: AlertType.danger,
        message: decodeExceptionObject(err, ExceptionMessages.place_dont_exist),
      });
    } finally {
      setSearchLoading(false);
    }
  };

  const clearLocations = () => {
    setLocations([]);
    setSelectedLocation(null);
  };

  const selectLocation = (location: AttendanceLocal) => {
    setLocations([]);
    setSelectedLocation(location);
  };

  async function createUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      if (verifyInputsIsFilled(credentials)) {
        showAlert({
          open: true,
          type: AlertType.danger,
          message: ExceptionMessages.request_fields,
        });
        return;
      }

      setLoading(true);

      const { data } = await api.post<AwaitedApiToken>("/adminurse", {
        ...credentials,
        main_attendance_location: selectedLocation?.id,
      });

      const { token } = data.response;

      storageSessionToken(data.response);

      const profile = await api.get<AwaitedApiProfile>("/adminurse", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      storageProfile(profile.data.response);

      showAlert({
        open: true,
        type: AlertType.success,
        message: ExceptionMessages.user_create_sucessfully,
      });

      setTimeout(() => {
        window.location.href = "/#/admin/agenda";
      }, 3500);
    } catch (err) {
      showAlert({
        open: true,
        type: AlertType.danger,
        message: decodeExceptionObject(err),
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Col lg="9" md="7">
        <Card className="bg-white shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <Form role="form" onSubmit={createUser}>
              <h6 className="heading-small text-dark mb-4">
                Informe Seus Dados Cadastrais
              </h6>
              <Row>
                <Col lg="6">
                  <FormGroup>
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-badge" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        name="fullname"
                        placeholder="Nome Completo *"
                        type="text"
                        autoComplete="username"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleInput(e.target)
                        }
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-email-83" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        name="email"
                        placeholder="Seu Email *"
                        type="email"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleInput(e.target)
                        }
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa-solid fa-fingerprint" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        name="cpf"
                        placeholder="CPF *"
                        type="text"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleInput(e.target)
                        }
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa-solid fa-phone"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        name="phone"
                        placeholder="Seu Telefone *"
                        type="text"
                        maxLength={11}
                        value={credentials.phone}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handlePhone(e.target.value)
                        }
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-lock-circle-open" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        name="password"
                        placeholder="Sua Senha (6 - 8 Dígitos) *"
                        type="password"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleInput(e.target)
                        }
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-lock-circle-open" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        name="password_confirmation"
                        placeholder="Confirme Sua Senha *"
                        type="password"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleInput(e.target)
                        }
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
              </Row>
              <h6 className="heading-small text-dark mb-4 mt-3">
                Cadastre seu local de atendimento
              </h6>
              <Row>
                <Col lg="12">
                  <FormGroup>
                    <InputGroup className="input-group-alternative">
                      <Input
                        name="attendance_local"
                        placeholder="Pesquise seu local de atendimento pelo nome *"
                        type="text"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleInput(e.target)
                        }
                      />
                      <InputGroupAddon addonType="append">
                        <InputGroupText onClick={searchAttendanceLocal}>
                          {searchLoading ? (
                            <Spinner animation="border" role="status" size="sm">
                              <span className="visually-hidden">
                                Carregando...
                              </span>
                            </Spinner>
                          ) : (
                            <i className="fa-solid fa-magnifying-glass cursor-pointer"></i>
                          )}
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  </FormGroup>
                </Col>
                <Col lg="12">
                  {locations.length > 0 ? (
                    <div
                      ref={searchResult}
                      className="attendance-local--results border-1 px-3 pt-2 pb-3"
                    >
                      <div className="d-flex flex-row justify-content-between">
                        <span className="text-sm text-muted mt-2">
                          Resultado(s) da busca:
                        </span>
                        <span
                          id="close-span"
                          className="font-small mt-2"
                          onClick={clearLocations}
                        >
                          <i className="fa-solid fa-xmark"></i>
                        </span>
                      </div>
                      {locations.map((location, index) => (
                        <Card
                          key={index}
                          className={`card-stats cards mb-lg-0 my-3 ${
                            selectedLocation?.id === location?.id
                              ? "active"
                              : ""
                          }`}
                          onClick={() => selectLocation(location)}
                        >
                          <CardBody>
                            <Row>
                              <div className="col">
                                <CardTitle className="text-uppercase text-sm mb-0">
                                  Local: {location.local_name}
                                </CardTitle>
                              </div>
                              <Col className="col-auto">
                                <div className="icon icon-shape bg-medical text-white rounded-circle shadow">
                                  <i className="fa-solid fa-hospital"></i>
                                </div>
                              </Col>
                            </Row>
                            <p className="mb-0 text-muted text-sm">
                              <span className="text-nowrap">
                                Endereco: {location.local_address.street},{" "}
                                {location.local_address.neighborhood}
                              </span>
                            </p>
                            <p className="mb-0 text-muted text-sm">
                              <span className="text-nowrap">
                                {location.local_address.city}{" "}
                                {location.local_address.state},{" "}
                                {location.local_address.cep}
                              </span>
                            </p>
                          </CardBody>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    !selectedLocation && (
                      <span className="text-center text-sm align-self-center">
                        Não consegue encontrar seu local de atendimento?{" "}
                        <span
                          onClick={() => setCreateLocation(true)}
                          className="text-underline cursor-pointer mr-1 text-medical"
                        >
                          Clique aqui
                        </span>
                        para cadastrar
                      </span>
                    )
                  )}

                  {selectedLocation && (
                    <>
                      <div className="d-flex flex-row justify-content-between align-items-center">
                        <h6 className="heading-small text-dark mt-3">
                          Meu Local de Atendimento :
                        </h6>
                        <i
                          className="fa-solid fa-xmark text-medical cursor-pointer"
                          onClick={clearLocations}
                        ></i>
                      </div>
                      <Card className="card-stats cards mb-lg-0 my-3 active border-medical">
                        <CardBody>
                          <Row>
                            <div className="col">
                              <CardTitle className="text-uppercase text-sm mb-0">
                                Local: {selectedLocation.local_name}
                              </CardTitle>
                            </div>
                            <Col className="col-auto">
                              <div className="icon icon-shape bg-medical text-white rounded-circle shadow">
                                <i className="fa-solid fa-hospital"></i>
                              </div>
                            </Col>
                          </Row>
                          <p className="mb-0 text-muted text-sm">
                            <span className="text-nowrap">
                              Endereco: {selectedLocation.local_address.street},{" "}
                              {selectedLocation.local_address.neighborhood}
                            </span>
                          </p>
                          <p className="mb-0 text-muted text-sm">
                            <span className="text-nowrap">
                              {selectedLocation.local_address.city}{" "}
                              {selectedLocation.local_address.state},{" "}
                              {selectedLocation.local_address.cep}
                            </span>
                          </p>
                        </CardBody>
                      </Card>
                    </>
                  )}
                </Col>
              </Row>

              <div className="text-center">
                <Button className="my-4 btn" type="submit">
                  {loading ? (
                    <Spinner animation="border" role="status" size="sm">
                      <span className="visually-hidden">Carregando...</span>
                    </Spinner>
                  ) : (
                    "Finalizar Cadastro"
                  )}
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>

      {createLocation && (
        <CreateAttendanceLocal
          open={createLocation}
          onClose={() => setCreateLocation(false)}
          onSelectLocal={setSelectedLocation}
        />
      )}
    </>
  );
}
