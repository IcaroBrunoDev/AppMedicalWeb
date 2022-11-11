import * as React from "react";
import { Button, Modal, Spinner } from "reactstrap";


import { useAlert } from "../../context/AlertProvider";
import { AlertType } from "../../interfaces/General";

import api from "../../utils/axios";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  onRefresh: () => void;
  link: object | any;
}

export default function AcceptLink({
  open,
  link,
  onClose,
  onRefresh,
}: ModalProps) {
  const { showAlert } = useAlert();

  const [loading, setLoading] = React.useState<boolean>(false);

  const approveLink = async () => {
    try {
      setLoading(true);

      await api.put(`/links/${link?.id}/accept`);

      showAlert({
        open: true,
        type: AlertType.success,
        message: "Vinculo Aprovado Com Sucesso!",
      });

      onRefresh();
      onClose();
    } catch (err) {
      showAlert({ open: true, type: "danger", message: err });
    }
  };

  return (
    <Modal className="modal-dialog-centered" size="lg" isOpen={open}>
      <div className="modal-header border-bottom">
        <h3 className="modal-title" id="modal-title-notification">
          Alerta de Vinculacão de Local de Atendimento{" "}
          <i className="fa-solid fa-triangle-exclamation text-warning"></i>
        </h3>
      </div>
      <div className="modal-body border-bottom mt-2">
        <h2 className="modal-title mb-3" id="modal-title-notification">
          Você está prestes a aprovar esse local de atendimento a se vincular ao
          seu local de atendimento
        </h2>
        <p className="font-weight-500">
          Vinculacões permitem que profissionais da saúde de outra unidade
          possam
          <span className="font-weight-bold text-warning mx-1">
            SOLICITAR AGENDAMENTO
          </span>
          para os médicos de sua unidade de atendimento especializado.
        </p>
        <p className="font-weight-500">
          Caso aceite essa vinculacão por engano, você pode ir para as
          <span className="font-weight-bold text-warning mx-1">
            Configuracões
          </span>
          e remover o vinculo da unidade a qualquer momento.
        </p>
      </div>
      <div className="modal-footer">
        <Button
          className="btn btn-medical"
          onClick={() => !loading && approveLink()}
        >
          {loading ? (
            <Spinner animation="border" role="status" size="sm">
              <span className="visually-hidden">Carregando...</span>
            </Spinner>
          ) : (
            "Aprovar Vinculo"
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
  );
}
