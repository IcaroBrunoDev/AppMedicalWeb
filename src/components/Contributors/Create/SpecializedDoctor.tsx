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

import api from "../../../utils/axios";

import { create_doctor } from "../../../utils/constants";
import { phoneFormatter } from "../../../utils/formatters";
import { ExceptionMessages } from "../../../utils/messages";
import { getStoragedProfile } from "../../../utils/caches";
import {
  decodeExceptionObject,
  formBuilder,
  verifyInputsFields,
} from "../../../utils/helpers";

import { Field } from "../../../interfaces/Inputs";
import { AlertType } from "../../../interfaces/General";
import { AxiosSpecialtyResponse } from "../../../interfaces/Axios";
import { Doctor, CreateDoctorProps } from "../../../interfaces/Doctors";

import { useAlert } from "../../../context/AlertProvider";

export default function CreateDoctor({
  open,
  onClose,
  onRefresh,
}: CreateDoctorProps) {
  const { showAlert } = useAlert();

  const { main_location } = getStoragedProfile();

  const baseFields: any[] = React.useMemo(
    () => [
      {
        name: "fullname",
        type: "text",
        label: "Nome do Médico *",
        onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
          handleInputData(e.target),
      },
      {
        name: "email",
        type: "email",
        label: "E-mail do Médico *",
        onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
          handleInputData(e.target),
      },
      {
        name: "cpf",
        type: "text",
        label: "CPF do Médico *",
        onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
          handleInputData(e.target),
      },
      {
        name: "crm",
        type: "text",
        label: "CRM do Médico *",
        onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
          handleInputData(e.target),
      },
      {
        name: "phone",
        type: "text",
        label: "Telefone do Médico *",
        onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
          handlePhone(e.target.value),
      },
    ],
    []
  );

  const [fields, setFields] = React.useState<Field[]>([]);

  const [loading, setLoading] = React.useState<boolean>(false);

  const [profile, setProfile] = React.useState<Doctor>({} as Doctor);

  React.useEffect(() => {
    const loadingSpecialties = async () => {
      try {
        const { data } = await api.get<AxiosSpecialtyResponse>(
          "/specialties?is_subspecialtie=false"
        );

        baseFields.push({
          name: "specialty",
          type: "select",
          label: "Especialidade do Médico *",
          options: data.response,
          onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
            handleInputData(e.target),
        });

        setFields(formBuilder(baseFields));
      } catch (err) {
        console.log(err);
      }
    };

    loadingSpecialties();
  }, [baseFields]);

  const handleInputData = (target: HTMLInputElement) => {
    const { name, value } = target;

    setProfile((prev: any) => ({
      ...prev,
      [name]: value === "" ? null : value,
    }));
  };

  const handlePhone = (phone: string) => {
    setProfile((prev: any) => ({ ...prev, phone: phoneFormatter(phone) }));
  };

  const createDoctor = async () => {
    try {
      const inputs_validation = await verifyInputsFields(profile, fields);

      setFields(inputs_validation);

      if (inputs_validation.find((element) => element.invalid)) {
        return;
      }

      setLoading(true);

      await api.post("/doctors", {
        ...profile,
        main_attendance_location: main_location.id,
      });

      onRefresh();

      showAlert({
        open: true,
        type: AlertType.success,
        message: "Médico Cadastrado e Vinculado com Sucesso",
      });

      setTimeout(() => {
        onClose();
      }, 2500);
    } catch (err) {
      setLoading(false);

      showAlert({
        open: true,
        type: AlertType.danger,
        message: decodeExceptionObject(err, ExceptionMessages.store_error),
      });
    }
  };

  return (
    <React.Suspense>
      <Modal className="modal-dialog-centered" size="lg" isOpen={open}>
        <div className="modal-header border-bottom">
          <h3 className="modal-title" id="modal-title-notification">
            Cadastrar Novo(a) Médico(a)
          </h3>
        </div>
        <div className="modal-body pt-0 mt-2">
          <Form>
            <h6 className="heading-small text-muted mb-3">
              Informações do Médico
            </h6>
            <Row>
              {fields.map((field, _) => (
                <Col lg={field.styles.col_lg}>
                  <FormGroup className={field.invalid ? "has-danger" : ""}>
                    <label
                      className="form-control-label"
                      htmlFor={field.label.html_for}
                    >
                      {field.label.text}
                    </label>
                    <Input
                      className={
                        field.invalid
                          ? "is-invalid"
                          : "form-control-alternative"
                      }
                      {...field.input}
                      onChange={field.onChange}
                    >
                      {field.input.options && (
                        <>
                          <option
                            value=""
                            className={
                              field.invalid ? "text-danger is-invalid" : ""
                            }
                          >
                            Selecione uma das Opcões *
                          </option>

                          {field.input.options.map(
                            (value: any, key: number) => (
                              <option value={value.id} key={key}>
                                {value.name}
                              </option>
                            )
                          )}
                        </>
                      )}
                    </Input>
                  </FormGroup>
                </Col>
              ))}
            </Row>
          </Form>
        </div>
        <div className="modal-footer">
          {loading ? (
            <Button className="btn btn-medical">
              <Spinner
                animation="border"
                role="status"
                size="sm"
                className="text-white"
              >
                <span className="visually-hidden">Carregando...</span>
              </Spinner>
            </Button>
          ) : (
            <Button onClick={createDoctor} className="btn btn-medical">
              Cadastrar Médico
            </Button>
          )}
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
