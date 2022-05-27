/** Reusable Component
 *  Because of this factor, all interfaces are managed internally
 */

import React from "react";
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

import cep from "cep-promise";

import api from "../../utils/axios";
import { usePropsContext } from "../..";
import { phoneFormatter } from "../../utils/formatters";
import { verifyInputsIsFilled } from "../../utils/helpers";

interface CreateAttendanceLocalProps {
  open: boolean;
  onClose: Function;
  onSelectLocal: Function;
}

interface LocationInterface {
  local_name: string;
  cep: string;
  state: string;
  city: string;
  street: string;
  neighborhood: string;
  number: string | null;
  local_primary_phone: string;
}

const local_state: LocationInterface = {
  local_name: "",
  cep: "",
  state: "",
  city: "",
  street: "",
  neighborhood: "",
  number: "",
  local_primary_phone: "",
};

export default function CreateAttendanceLocal({
  open,
  onClose,
  onSelectLocal,
}: CreateAttendanceLocalProps) {
  const { showAlert }: any = usePropsContext();

  const [loading, setLoading] = React.useState(false);

  const [location, setLocation] =
    React.useState<LocationInterface>(local_state);

  const handleInputData = (target: HTMLInputElement) => {
    const { name, value } = target;
    setLocation((prev: any) => ({ ...prev, [name]: value }));
  };

  const handlePhone = (phone: string) => {
    setLocation((prev: any) => ({
      ...prev,
      local_primary_phone: phoneFormatter(phone),
    }));
  };

  const handleCEP = (text: string) => {
    setLocation((prev) => ({ ...prev, cep: text }));

    if (text.length === 8) {
      cep(text)
        .then((response: any) => {
          setLocation((prev) => ({ ...prev, ...response }));
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  };

  const creteAttendanceLocal = async () => {
    try {
      if (verifyInputsIsFilled(location)) {
        showAlert({
          show: true,
          type: "danger",
          message: "Preencha todos os campos para continuar",
        });
        return;
      }

      setLoading(true);

      const { data } = await api.post("/locations", {
        local_name: location.local_name,
        local_address: {
          cep: location.cep,
          state: location.state,
          city: location.city,
          street: location.street,
          neighborhood: location.neighborhood,
          number: location.number,
        },
        is_specialized: true,
        local_primary_phone: location.local_primary_phone,
      });

      showAlert({
        open: true,
        type: "success",
        message: "Local De Atendimento Cadastrado com Sucesso",
      });

      onSelectLocal(data.response);

      setTimeout(() => {
        onClose();
      }, 3500);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal className="modal-dialog-centered" size="lg" isOpen={open}>
      <div className="modal-header border-bottom">
        <h3 className="modal-title" id="modal-title-notification">
          Cadastrar Novo Local de Atendimento
        </h3>
      </div>
      <div className="modal-body pt-0 mt-2">
        <Form>
          <h6 className="heading-small text-muted mb-3">
            Informações do Local de Atendimento
          </h6>
          <Row>
            <Col lg="12">
              <FormGroup>
                <label className="form-control-label" htmlFor="local_name">
                  Nome do Local *
                </label>
                <Input
                  className="form-control-alternative"
                  name="local_name"
                  id="local_name"
                  type="text"
                  placeholder="Digite o Nome do Local de Atendimento"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputData(event.target)
                  }
                />
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col lg="12">
              <FormGroup>
                <label className="form-control-label" htmlFor="status">
                  CEP *
                </label>
                <Input
                  className="form-control-alternative"
                  name="cep"
                  id="cep"
                  placeholder="Digite o CEP do Local de Atendimento"
                  type="text"
                  value={location.cep}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleCEP(event.target.value)
                  }
                />
              </FormGroup>
            </Col>
            <Col lg="8">
              <FormGroup>
                <label className="form-control-label" htmlFor="street">
                  Endereço *
                </label>
                <Input
                  className="form-control-alternative"
                  name="street"
                  id="street"
                  type="text"
                  placeholder="Digite o Endereço "
                  value={location.state}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputData(event.target)
                  }
                />
              </FormGroup>
            </Col>

            <Col lg="4">
              <FormGroup>
                <label className="form-control-label" htmlFor="number">
                  Número *
                </label>
                <Input
                  className="form-control-alternative"
                  name="number"
                  id="number"
                  type="text"
                  placeholder="Digite o Número"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputData(event.target)
                  }
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col lg="6">
              <FormGroup>
                <label className="form-control-label" htmlFor="neighborhood">
                  Bairro *
                </label>
                <Input
                  className="form-control-alternative"
                  name="neighborhood"
                  id="neighborhood"
                  type="text"
                  placeholder="Digite o Bairro"
                  value={location.neighborhood}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputData(event.target)
                  }
                />
              </FormGroup>
            </Col>
            <Col lg="6">
              <FormGroup>
                <label className="form-control-label" htmlFor="city">
                  Cidade *
                </label>
                <Input
                  className="form-control-alternative"
                  name="city"
                  id="city"
                  type="text"
                  placeholder="Digite a Cidade"
                  value={location.city}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputData(event.target)
                  }
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col lg="6">
              <FormGroup>
                <label className="form-control-label" htmlFor="state">
                  Estado *
                </label>
                <Input
                  className="form-control-alternative"
                  name="state"
                  id="state"
                  type="text"
                  placeholder="Digite o Estado"
                  value={location.state}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputData(event.target)
                  }
                />
              </FormGroup>
            </Col>
            <Col lg="6">
              <FormGroup>
                <label className="form-control-label" htmlFor="phone">
                  Telefone Principal *
                </label>
                <Input
                  className="form-control-alternative"
                  name="phone"
                  id="phone"
                  type="text"
                  placeholder="Digite o Telefone Principal"
                  value={location.local_primary_phone}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handlePhone(event.target.value)
                  }
                />
              </FormGroup>
            </Col>
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
          <Button className="btn btn-medical" onClick={creteAttendanceLocal}>
            Finalizar Cadastro
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
  );
}
