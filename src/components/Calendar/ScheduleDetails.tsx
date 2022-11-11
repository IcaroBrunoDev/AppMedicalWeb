import React from "react";

import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Modal,
  Row,
  Col,
  Spinner,
  FormGroup,
  Input,
  Form,
} from "reactstrap";
import { useAlert } from "../../context/AlertProvider";
import { AlertType } from "../../interfaces/General";

import { Schedules } from "../../interfaces/Schedules";
import { formatHour } from "../../utils/calendar";
import { EventStatus } from "./ViewMonth/CalendarEvent";

import axios from "../../utils/axios";

interface SchedulesDetailsProps {
  schedule: Schedules;
  onOpen: boolean;
  onClose: () => void;
}

export default function ScheduleDetails({
  onOpen,
  onClose,
  schedule,
}: SchedulesDetailsProps) {
  const { showAlert } = useAlert();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const { patient, event_name, hour, date, notes, status, id } = schedule;

  const [loading, setLoading] = React.useState<boolean>(false);

  const onSubmit = async (schedule: any) => {
    try {
      const { event_name, date, status, hour, notes } = schedule;

      setLoading(true);

      const eventName =
        event_name !== "" && event_name
          ? event_name
          : `Consulta ${patient?.fullname}`;

      await axios.put(`/schedules/${id}`, {
        date,
        status,
        hour,
        notes,
        event_name: eventName,
      });

      showAlert({
        open: true,
        type: AlertType.success,
        message: "Consulta Editada com Sucesso",
      });

      onClose();
    } catch (err) {
      showAlert({ open: true, type: AlertType.danger, message: err });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal className="modal-dialog-centered" size="lg" isOpen={onOpen}>
      <div className="modal-header border-bottom">
        <h3 className="modal-title" id="modal-title-notification">
          Editar Consulta do(a) {patient.fullname}
        </h3>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="modal-body pt-0 mt-3">
          <h4 className="modal-title my-2">Informações do Paciente</h4>

          <Row className="my-3 pb-2 border-bottom">
            <Col className="m-0" lg="12" sm="12">
              <div className="d-flex flex-row justify-content-between  py-1 px- text-sm">
                <div className="d-flex flex-column justify-content-center align-items-start">
                  <span className="text-medical mb-2">
                    Nome:<span className="text-dark"> {patient.fullname}</span>
                  </span>
                  <span className="text-medical">
                    CPF:<span className="text-dark"> {patient.cpf}</span>
                  </span>
                </div>

                <div className="d-flex flex-column justify-content-center align-items-end">
                  <span className="text-medical mb-2">
                    Nascimento:
                    <span className="text-dark"> {patient.birthdate}</span>
                  </span>
                  <span className="text-medical">
                    Cartão SUS:
                    <span className="text-dark">
                      {" "}
                      {patient.sus_card ?? "Não Cadastrado"}
                    </span>
                  </span>
                </div>
              </div>
            </Col>
          </Row>

          <h4 className="modal-title mb-3">Informações da Consulta</h4>

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
                  defaultValue={date}
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
                  defaultValue={hour}
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
                  defaultValue={status}
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
                  defaultValue={event_name}
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
                  defaultValue={notes}
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
              "Editar Consulta"
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
