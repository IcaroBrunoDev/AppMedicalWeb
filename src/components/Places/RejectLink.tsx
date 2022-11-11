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

export default function RejectLink({
  open,
  link,
  onClose,
  onRefresh,
}: ModalProps) {
  const { showAlert } = useAlert();

  const [loading, setLoading] = React.useState<boolean>(false);

  const rejectLink = async () => {
    try {
      setLoading(true);

      await api.put(`/links/${link?.id}/decline`);

      showAlert({
        open: true,
        type: AlertType.success,
        message: "Vinculo Rejeitado Com Sucesso!",
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
          Você está prestes a rejeitar esse local de atendimento a se vincular
          ao seu local de atendimento
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
          Caso você rejeite essa vinculacão, o solicitante não poderá ter acesso
          a agenda da sua unidade, consequentemente não poderá solicitar
          agendamentos para sua unidade de atendimento especializado.
        </p>
        <p className="font-weight-500">
          <span className="font-weight-bold text-warning mx-1"> *</span> Ao
          rejeitar essa vinculacão, o solicitante poderá pedir novamente para
          ser vinculado ao seu local de atendimento.
        </p>
      </div>
      <div className="modal-footer">
        <Button
          className="btn btn-medical"
          onClick={() => !loading && rejectLink()}
        >
          {loading ? (
            <Spinner animation="border" role="status" size="sm">
              <span className="visually-hidden">Carregando...</span>
            </Spinner>
          ) : (
            "Rejeitar Vinculo"
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
