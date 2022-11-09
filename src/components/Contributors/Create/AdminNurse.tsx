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

import { phoneFormatter } from "../../../utils/formatters";
import { getStoragedProfile } from "../../../utils/caches";
import { health_professionals } from "../../../utils/constants";
import {
  decodeExceptionObject,
  formBuilder,
  verifyInputsFields,
} from "../../../utils/helpers";

import { Field } from "../../../interfaces/Inputs";
import { CreateDoctorProps } from "../../../interfaces/Doctors";
import { ProfessionalCreate } from "../../../interfaces/Profiles";


import { ExceptionMessages } from "../../../utils/messages";
import { useAlert } from "../../../context/AlertProvider";

export default function CreateAdminNurse({
  open,
  onClose,
  onRefresh,
}: CreateDoctorProps) {
  const { showAlert } = useAlert();

  const { main_location } = getStoragedProfile();

  const [profile, setProfile] =
    React.useState<ProfessionalCreate>(health_professionals);

  const [fields, setFields] = React.useState<Field[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  const baseFields: any[] = React.useMemo(
    () => [
      {
        name: "fullname",
        type: "text",
        value: health_professionals.fullname,
        label: "Nome do Profissional da Saúde *",
        onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
          handleInputData(e.target),
      },
      {
        name: "email",
        type: "email",
        value: health_professionals.email,
        label: "E-mail do Profissional da Saúde *",
        onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
          handleInputData(e.target),
      },
      {
        name: "cpf",
        type: "text",
        value: health_professionals.cpf,
        label: "CPF do Profissional da Saúde *",
        onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
          handleInputData(e.target),
      },
      {
        name: "phone",
        type: "text",
        value: health_professionals.phone,
        label: "Telefone do Profissional da Saúde *",
        onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
          handlePhone(e.target.value),
      },
    ],
    []
  );

  React.useEffect(() => {
    setFields(formBuilder(baseFields));
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

  const store = async () => {
    try {
      setLoading(true);

      const inputs_validation = await verifyInputsFields(profile, fields);

      setFields(inputs_validation);

      if (inputs_validation.find((element) => element.invalid)) {
        return;
      }

      await api.post("/adminurse", {
        ...profile,
        main_attendance_location: main_location.id,
      });

      onRefresh();

      showAlert({
        open: true,
        type: "success",
        message: "Profissional da Saúde Cadastrado e Vinculado com Sucesso",
      });

      onClose();
    } catch (err) {
      setLoading(false);

      showAlert({
        open: true,
        type: "danger",
        message: decodeExceptionObject(err, ExceptionMessages.store_error),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <React.Suspense>
      <Modal className="modal-dialog-centered" size="lg" isOpen={open}>
        <div className="modal-header border-bottom">
          <h3 className="modal-title" id="modal-title-notification">
            Cadastrar Novo Administrador para a Unidade
          </h3>
        </div>
        <div className="modal-body pt-0 mt-2">
          <Form>
            <h6 className="heading-small text-muted mb-3">
              Informações do Profissional da Saúde
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

                          {field.input.options.map((data: any, key: number) => (
                            <option value={data.value} key={key}>
                              {data.label}
                            </option>
                          ))}
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
            <Button onClick={store} className="btn btn-medical">
              Cadastrar Administrador
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
