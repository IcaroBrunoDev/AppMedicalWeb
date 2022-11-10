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
  Spinner,
} from "reactstrap";

import { Patient } from "../../../interfaces/Profiles";

import axios from "../../../utils/axios";
import { formatHour } from "../../../utils/calendar";

import { useAuth } from "../../../context/AuthProvider";
import { useAlert } from "../../../context/AlertProvider";
import { usePlaces } from "../../../context/PlacesProvider";
import { EventStatus } from "../ViewMonth/CalendarEvent";

import { useForm, Controller } from "react-hook-form";

import PatientSearch from "./CreateForm/PatientSearch";
import { AlertType } from "../../../interfaces/General";

interface CalendarScheduling {
  open: true;
  onClose: () => void;
  onRefreshCalendar: () => void;
}

interface Schedule {
  patient: Patient | null;
  patient_term: string | null;
  date: Date | null;
  event_name: string | null;
  hour: string | null;
  status: EventStatus | null;
  notes: string | null;
}

export default function CalendarScheduling(props: CalendarScheduling) {
  const { profile } = useAuth();
  const { showAlert } = useAlert();
  const { selectedLocation } = usePlaces();

  const { open, onClose, onRefreshCalendar } = props;

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = React.useState<boolean>(false);

  const [patientWarning, setPatientWarning] = React.useState<boolean>(false);
  const [selectedPatient, setSelectedPatient] =
    React.useState<Patient | null>();

  const handlePatient = (patient: Patient | null) => {
    setSelectedPatient(patient);
  };

  const onSubmit = async (schedule: any) => {
    try {
      if (!selectedPatient) {
        setPatientWarning(true);
        return;
      }

      const { event_name, date, status, hour, notes } = schedule;

      setLoading(true);
      setPatientWarning(false);

      await axios.post("/schedule-create", {
        date,
        status,
        hour,
        notes,
        doctor_id: profile?.id,
        patient_id: selectedPatient?.id,
        attendance_place_id: selectedLocation.id,
        event_name: event_name ?? `Consulta ${selectedPatient?.fullname}`,
      });

      showAlert({
        open: true,
        type: AlertType.success,
        message: "Solicitacão de Atendimento Realizada com Sucesso",
      });

      onRefreshCalendar();
      onClose();
    } catch (err) {
      showAlert({ open: true, type: AlertType.danger, message: err });
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
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="modal-body pt-0 mt-2">
          <h6 className="heading-small text-muted mb-2">
            Informações do Paciente
          </h6>
          <Row>
            <Col className="m-0" lg="12" sm="12">
              <PatientSearch
                patientWarning={patientWarning}
                handlePatient={handlePatient}
                selectedPatient={selectedPatient}
              />
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
                <Controller
                  name="date"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="date"
                      className={`form-control-alternative  ${
                        errors?.date ? "border border-warning" : ""
                      }`}
                    />
                  )}
                />
                {errors?.date && (
                  <span className="d-block invalid-feedback">
                    Esse campo é obrigatório
                  </span>
                )}
              </FormGroup>
            </Col>
            <Col lg="6">
              <FormGroup>
                <label className="form-control-label" htmlFor="hour">
                  Hora da Consulta *
                </label>
                <Controller
                  name="hour"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="select"
                      className={`form-control-alternative  ${
                        errors?.hour ? "border border-warning" : ""
                      }`}
                      placeholder="Escolha um Horário para a Consulta"
                    >
                      <option>Selecione o Horário da Consulta</option>
                      {new Array(11).fill(1).map((key, index) => (
                        <option
                          key={`${key}_${index}`}
                          value={formatHour(index, 8)}
                        >
                          {formatHour(index, 8)}
                        </option>
                      ))}
                    </Input>
                  )}
                />
                {errors?.hour && (
                  <span className="d-block invalid-feedback">
                    Esse campo é obrigatório
                  </span>
                )}
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col lg="6">
              <FormGroup>
                <label className="form-control-label" htmlFor="status">
                  Status da Consulta *
                </label>
                <Controller
                  name="status"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Input
                      type="select"
                      className={`form-control-alternative  ${
                        errors?.status ? "border border-warning" : ""
                      }`}
                      {...field}
                    >
                      <option>Selecione o Status da Consulta</option>
                      <option value={EventStatus.confirmed}>Confirmado</option>
                      <option value={EventStatus.pending}>Pendente</option>
                      <option value={EventStatus.canceled}>Cancelado</option>
                    </Input>
                  )}
                />
                {errors?.status && (
                  <span className="d-block invalid-feedback">
                    Esse campo é obrigatório
                  </span>
                )}
              </FormGroup>
            </Col>
            <Col lg="6">
              <FormGroup>
                <label className="form-control-label" htmlFor="event_name">
                  Título da Consulta
                </label>
                <Controller
                  name="event_name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="text"
                      className="form-control-alternative"
                      placeholder="Digite um título para essa consulta"
                    />
                  )}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col lg="12">
              <FormGroup>
                <label className="form-control-label" htmlFor="notes">
                  Outras Anotações
                </label>
                <Controller
                  name="notes"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="textarea"
                      rows={3}
                      className="form-control-alternative"
                      placeholder="Digite anotações sobre a consulta aqui."
                    />
                  )}
                />
              </FormGroup>
            </Col>
          </Row>
        </div>
        <div className="modal-footer">
          <Button className="btn btn-medical" type="submit">
            {loading ? (
              <Spinner
                animation="border"
                role="status"
                size="sm"
                className="text-white"
              />
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
      </Form>
    </Modal>
  );
}
