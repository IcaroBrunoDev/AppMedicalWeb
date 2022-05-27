import React from "react";
import {
  Button,
  Modal,
  Row,
  Col,
  Form,
  Input,
  FormGroup,
  FormFeedback,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Spinner,
} from "reactstrap";
import axios from "../../../utils/axios";

import { usePropsContext } from "../../../index";
import { formateDateToString, formatHour } from "../../../utils/calendar";

const defaultSchedule = {
  patient: null,
  patient_term: null,
  date: null,
  event_name: null,
  hour: null,
  status: null,
  notes: null,
};

const defaultErrors = {
  patient: false,
  date: false,
  hour: false,
  status: false,
  notes: false,
};

export default function CalendarScheduling(props) {
  const {
    open,
    selectedDoctor,
    onClose,
    onRefreshCalendar,
  } = props;
  const { showAlert, selectedLocationId } = usePropsContext();

  const [loading, setLoading] = React.useState(false);
  const [searchLoading, setSearchLoading] = React.useState(false);

  const [errors, setErrors] = React.useState(defaultErrors);
  const [schedule, setSchedule] = React.useState(defaultSchedule);
  const [patientsFound, setPatientsFound] = React.useState([]);

  const handleInputData = (event) => {
    const { target } = event;

    setSchedule((prev) => ({
      ...prev,
      [target.name]: target.value === "" ? null : target.value,
    }));
    return;
  };

  const handlePatient = (patient) => {
    setSchedule((prev) => ({
      ...prev,
      patient: patient ?? null,
    }));

    setPatientsFound([]);
  };

  const searchPatient = async () => {
    try {
      setSearchLoading(true);
      const { data } = await axios.get(
        `/patient?query=${schedule.patient_term}`
      );
      setPatientsFound(data.response);
    } catch (err) {
      showAlert({ open: true, type: "danger", message: err });
    } finally {
      setSearchLoading(false);
    }
  };

  const storeSchedule = async () => {
    try {
      const { patient, event_name, date, status, hour, notes } = schedule;

      if (!patient || !date || !status || !hour) {
        setErrors({
          patient: !patient ?? false,
          event_name: !event_name ?? false,
          date: !date ?? false,
          status: !status ?? false,
          hour: !hour ?? false,
        });
        return;
      }

      setErrors(defaultErrors);
      setLoading(true);

      await axios.post("/schedule-create", {
        event_name: event_name ?? `Consulta Para ${patient.fullname}`,
        date,
        status,
        hour,
        notes,
        doctor_id: selectedDoctor.doctor.id,
        patient_id: patient.id,
        attendance_location_id: selectedLocationId,
      });

      showAlert({
        open: true,
        type: "success",
        message: "Solicitacão de Atendimento Realizada com Sucesso",
      });

      onRefreshCalendar();
      onClose();
    } catch (err) {
      showAlert({ open: true, type: "danger", message: err });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal className="modal-dialog-centered" size="lg" isOpen={open}>
      <div className="modal-header border-bottom">
        <h3 className="modal-title" id="modal-title-notification">
          Agendar Nova Consulta
        </h3>
      </div>
      <div className="modal-body pt-0 mt-2">
        <Form>
          <h6 className="heading-small text-muted mb-2">
            Informações do Paciente
          </h6>
          <Row>
            <Col className="m-0" lg="12" sm="12">
              <FormGroup>
                <label className="form-control-label" htmlFor="patient_term">
                  Pesquisar Paciente por Nome / CPF / CARTÃO SUS *
                </label>
                <InputGroup className="input-group-alternative mb-1">
                  <Input
                    invalid={errors.patient}
                    className="form-control-alternative"
                    name="patient_term"
                    id="patient_term"
                    placeholder="Digite o Nome / CPF / CARTÃO SUS do paciente"
                    type="text"
                    onChange={(event) => handleInputData(event)}
                  />

                  <InputGroupAddon addonType="append">
                    <InputGroupText>
                      {!searchLoading ? (
                        !schedule.patient ? (
                          <i
                            class="text-sm fa-solid fa-magnifying-glass"
                            onClick={searchPatient}
                          ></i>
                        ) : (
                          <i
                            class="text-sm fa-solid fa-xmark"
                            onClick={() => handlePatient(null)}
                          ></i>
                        )
                      ) : (
                        <Spinner
                          animation="border"
                          role="status"
                          size="sm"
                          className="text-medical"
                        >
                          <span className="visually-hidden">Carregando...</span>
                        </Spinner>
                      )}
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>

                <FormFeedback>Esse campo é obrigatório</FormFeedback>

                {patientsFound.length > 0 && (
                  <div className="users-results border-1 px-2 shadow">
                    <div className="d-flex flex-row justify-content-between">
                      <h6 className="heading-small text-muted  mt-2">
                        Resultado(s) da busca:
                      </h6>
                      <span
                        id="close-span"
                        className="font-small mt-2"
                        onClick={() => setPatientsFound([])}
                      >
                        Fechar
                      </span>
                    </div>
                    {patientsFound.map((patient, index) => (
                      <div
                        key={index}
                        className="cards"
                        onClick={() => handlePatient(patient)}
                      >
                        <div className="d-flex flex-row align-items-center">
                          {/* <img
                            src={
                              patient.profile_picture ??
                              require("../../assets/img/theme/icon-user.png")
                            }
                          /> */}
                          <div className="d-flex flex-column ">
                            <span className="ml-3">
                              <span className="text-medical">Nome: </span>
                              {patient.fullname}
                            </span>
                            <span className="ml-3">
                              <span className="text-medical">CPF: </span>{" "}
                              {patient.cpf}
                            </span>
                          </div>
                        </div>
                        <div className="d-flex flex-column">
                          <span className="ml-3">
                            <span className="text-medical">Nascimento: </span>
                            {formateDateToString(patient.birthdate, "PT")}
                          </span>
                          <span className="ml-3">
                            <span className="text-medical">Cartão SUS: </span>{" "}
                            {patient.sus_card ?? "Não Cadastrado"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {schedule.patient && (
                  <>
                    <h6 className="heading-small text-muted mt-3">
                      Paciente para agendamento
                    </h6>
                    <div className="d-flex flex-row justify-content-between border py-3 px-2 text-sm">
                      <div className="d-flex flex-row align-items-center">
                        {/* <img
                          src={
                            schedule.patient.profile_picture ??
                            require("../../assets/img/theme/icon-user.png")
                          }
                          width={50}
                          height={50}
                        /> */}
                        <div className="d-flex flex-column">
                          <span className="ml-3 mb-1">
                            <span className="text-medical">Nome: </span>
                            {schedule.patient.fullname}
                          </span>
                          <span className="ml-3">
                            <span className="text-medical">CPF: </span>{" "}
                            {schedule.patient.cpf}
                          </span>
                        </div>
                      </div>
                      <div className="d-flex flex-column">
                        <span className="ml-3 mb-1">
                          <span className="text-medical">Nascimento: </span>
                          {formateDateToString(
                            schedule.patient.birthdate,
                            "PT"
                          )}
                        </span>
                        <span className="ml-3">
                          <span className="text-medical">Cartão SUS: </span>{" "}
                          {schedule.patient.sus_card ?? "Não Cadastrado"}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </FormGroup>
            </Col>
          </Row>
          <h6 className="heading-small text-muted mb-3">
            Informações da Consulta
          </h6>
          <Row>
            <Col lg="6">
              <FormGroup>
                <label className="form-control-label" htmlFor="surname">
                  Data Da Consulta *
                </label>
                <Input
                  invalid={errors.date}
                  className="form-control-alternative"
                  name="date"
                  id="date"
                  type="date"
                  onChange={(event) => handleInputData(event)}
                />
                <FormFeedback>Esse campo é obrigatório</FormFeedback>
              </FormGroup>
            </Col>
            <Col lg="6">
              <FormGroup>
                <label className="form-control-label" htmlFor="hour">
                  Hora da Consulta *
                </label>
                <Input
                  invalid={errors.hour}
                  className="form-control-alternative"
                  name="hour"
                  id="hour"
                  placeholder="Escolha um Horário para a Consulta"
                  type="select"
                  onChange={(event) => handleInputData(event)}
                >
                  <option value="" selected>
                    Selecione o Horário da Consulta
                  </option>

                  {new Array(11).fill(1).map((key, index) => (
                    <option value={formatHour(index, 8)}>
                      {formatHour(index, 8)}
                    </option>
                  ))}
                </Input>
                <FormFeedback>Esse campo é obrigatório</FormFeedback>
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col lg="6">
              <FormGroup>
                <label className="form-control-label" htmlFor="status">
                  Status da Consulta *
                </label>
                <Input
                  invalid={errors.status}
                  className="form-control-alternative"
                  name="status"
                  id="status"
                  placeholder="Escolha um Horário para a Consulta"
                  type="select"
                  onChange={(event) => handleInputData(event)}
                >
                  <option value="" selected>
                    Selecione o Status da Consulta
                  </option>
                  <option value="CONFIRMED">Confirmado</option>
                  <option value="PENDING">Pendente</option>
                  <option value="CANCELED">Cancelado</option>
                </Input>
                <FormFeedback>Esse campo é obrigatório</FormFeedback>
              </FormGroup>
            </Col>
            <Col lg="6">
              <FormGroup>
                <label className="form-control-label" htmlFor="event_name">
                  Título da Consulta
                </label>
                <Input
                  className="form-control-alternative"
                  name="event_name"
                  id="event_name"
                  type="text"
                  placeholder="Digite um nome para essa consulta"
                  onChange={(event) => handleInputData(event)}
                />
                <FormFeedback>Esse campo é obrigatório</FormFeedback>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col lg="12">
              <FormGroup>
                <label className="form-control-label" htmlFor="notes">
                  Outras Anotações
                </label>
                <Input
                  className="form-control-alternative"
                  name="notes"
                  id="notes"
                  type="textarea"
                  rows={3}
                  placeholder="Digite anotações sobre a consulta aqui."
                  onChange={(event) => handleInputData(event)}
                />
                <FormFeedback>Esse campo é obrigatório</FormFeedback>
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </div>
      <div className="modal-footer">
        <Button className="btn btn-medical" onClick={storeSchedule}>
          {loading ? (
            <Spinner
              animation="border"
              role="status"
              size="sm"
              className="text-white"
            >
              <span className="visually-hidden">Carregando...</span>
            </Spinner>
          ) : (
            "Agendar Consulta"
          )}
        </Button>
        <Button
          className="text-dark ml-auto"
          color="link"
          data-dismiss="modal"
          type="button"
          onClick={onClose}
        >
          Fechar
        </Button>
      </div>
    </Modal>
  );
}
