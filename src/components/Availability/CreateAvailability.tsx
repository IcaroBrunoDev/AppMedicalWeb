import * as React from "react";
import {
  Button,
  Modal,
  Row,
  Col,
  Form,
  Input,
  FormGroup,
  Spinner,
} from "reactstrap";

import moment from "moment";
import TimePicker from "rc-time-picker";

import api from "../../utils/axios";

import { daysOfWeek } from "../../utils/constants";
import { getStoragedProfile } from "../../utils/caches";

import { ReadDoctors } from "../../interfaces/Profiles";
import { AlertType } from "../../interfaces/General";

import { usePropsContext } from "../../index";

interface CreateDoctorProps {
  open: boolean;
  doctor: ReadDoctors;
  onClose: () => void;
  onStore: () => void;
}

interface ServiceOptions {
  index: number;
  name: string;
  shortname: string;
  objectName: string;
  active: boolean;
  hour_start: string | null;
  hour_finish: string | null;
}

export default function CreateAvailability({
  open,
  doctor,
  onClose,
  onStore,
}: CreateDoctorProps) {
  const { showAlert }: any = usePropsContext();

  const { main_location } = getStoragedProfile();

  const [loading, setLoading] = React.useState<boolean>(false);

  const [totalAttendances, setTotalAttendances] = React.useState<string>();
  const [serviceOptions, setServiceOptions] = React.useState<ServiceOptions[]>(
    []
  );

  React.useEffect(() => {
    const createServiceOptions = () => {
      const options: ServiceOptions[] = [];

      daysOfWeek.forEach((day, index) => {
        options.push({
          ...day,
          index,
          active: false,
          hour_start: null,
          hour_finish: null,
        });
      });

      setServiceOptions(options);
    };

    createServiceOptions();
  }, []);

  const handleSeviceOptions = (index: number) => {
    const options = [...serviceOptions];

    options[index] = {
      ...options[index],
      active: !options[index].active,
    };

    setServiceOptions(options);
  };

  const handleStartHour = (index: number, hour_start: any) => {
    const options = [...serviceOptions];

    options[index] = {
      ...options[index],
      hour_start: moment(hour_start).format("HH:mm"),
    };

    setServiceOptions(options);
  };

  const handleFinishHour = (index: number, hour_finish: any) => {
    const options = [...serviceOptions];

    options[index] = {
      ...options[index],
      hour_finish: moment(hour_finish).format("HH:mm"),
    };

    setServiceOptions(options);
  };

  const store = async () => {
    try {
      const have_active: any = serviceOptions.find((element) => element.active);

      if (!have_active) {
        throw new Error("Nenhum campo está ativo");
      }

      // const have_filled = have_active?.find(
      //   (element: ServiceOptions | any) =>
      //     element.hour_start && element.hour_finish
      // );

      // if (!have_filled) {
      //   throw new Error(
      //     "Os campos ativos estão sem horários definidos corretamente!"
      //   );
      // }

      let formated_availabilities: object = {};

      serviceOptions.forEach((option: any) => {
        if (option.active) {
          formated_availabilities = {
            ...formated_availabilities,
            [option.objectName]: {
              hour_start: option.hour_start,
              hour_finish: option.hour_finish,
            },
          };
        }
      });

      await api.post("/doctors/availability", {
        availabilitie: formated_availabilities,
        doctor_id: doctor.id,
        calendar_location: main_location.id,
        total_attendances: totalAttendances,
      });

      showAlert({
        open: true,
        type: "success",
        message: "Disponibilidade Médica Cadastrada com Sucesso!",
      });

      onStore();
    } catch (err) {
      showAlert({ open: true, type: "danger", message: err });
    } finally {
      setLoading(false);
    }
  };

  return (
    <React.Suspense>
      <Modal className="modal-dialog-centered" size="lg" isOpen={open}>
        <div className="modal-header border-bottom">
          <h3 className="modal-title" id="modal-title-notification">
            Cadastrar Disponibilidade do(da) Médico(a):{" "}
            <span className="text-medical">{doctor.fullname}</span>
          </h3>
        </div>
        <div className="modal-body pt-0 mt-2 border-bottom">
          <Form>
            <h6 className="heading-small text-dark mt-3 mb-3 font-weight-600">
              Total de Atendimentos Mensais
            </h6>
            <Col lg="12">
              <FormGroup>
                <label
                  className="form-control-label"
                  htmlFor="total_attendances"
                >
                  Informe a quantidade de atendimentos mensais para esse(a)
                  médico(a)
                </label>
                <Input
                  className="form-control-alternative"
                  name="total_attendances"
                  id="total_attendances"
                  type="number"
                  placeholder="Digite Aqui..."
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setTotalAttendances(e.target.value)
                  }
                />
              </FormGroup>
            </Col>
            <h6 className="heading-small text-dark mt-3 mb-3 font-weight-600">
              Informações dos Dias e Horários de Atendimento *
            </h6>
            <FormGroup>
              {serviceOptions.map((option, index) => (
                <Col lg="12" key={index}>
                  <Row className="border-bottom mb-3">
                    <Col md="12" xs="12" lg="3" className="d-flex flex-row">
                      <label className="custom-toggle">
                        <input
                          checked={option.active}
                          type="checkbox"
                          id={option.name}
                          name={option.name}
                          onChange={() => handleSeviceOptions(option.index)}
                        />
                        <span className="custom-toggle-slider rounded-circle" />
                      </label>
                      <span className="ml-2 text-dark text-sm">
                        {option.name}
                      </span>
                    </Col>
                    {option.active && (
                      <Col md="12" lg="9">
                        <div className="d-flex flex-row justify-content-between">
                          <TimePicker
                            className="w-50 mr-1"
                            placeholder="Início *"
                            onChange={(hour: any) =>
                              handleStartHour(option.index, hour)
                            }
                            minuteStep={30}
                            showSecond={false}
                          />

                          <TimePicker
                            className="w-50"
                            placeholder="Termino *"
                            onChange={(hour: any) =>
                              handleFinishHour(option.index, hour)
                            }
                            minuteStep={30}
                            showSecond={false}
                          />
                        </div>
                      </Col>
                    )}
                  </Row>
                </Col>
              ))}
            </FormGroup>
          </Form>
        </div>
        <div className="modal-footer">
          <Button
            className="btn btn-medical"
            onClick={() => !loading && store()}
          >
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
              "Salvar Disponibilidade"
            )}
          </Button>
          <Button
            className="text-dark ml-auto"
            color="link"
            data-dismiss="modal"
            type="button"
            onClick={() => onClose()}
          >
            Fechar
          </Button>
        </div>
      </Modal>
    </React.Suspense>
  );
}
