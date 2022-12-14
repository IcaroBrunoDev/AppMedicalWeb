import * as React from "react";
import { Button, Modal } from "reactstrap";

import api from "../../../utils/axios";

import { decodeExceptionObject } from "../../../utils/helpers";


import { ExceptionMessages } from "../../../utils/messages";

interface DestoyAdminNurseProps {
  open: boolean;
  profile: any;
  onClose: () => void;
  onRefresh: () => void;
}

export default function DestoyAdminNurse({
  open,
  profile,
  onClose,
  onRefresh,
}: DestoyAdminNurseProps) {
  const { showAlert } = useAlert();

  const [loading, setLoading] = React.useState<boolean>(false);

  const unlink = async () => {
    try {
      setLoading(true);

      await api.put(`/adminurse/${profile.id}/unlink`);

      onRefresh();

      showAlert({
        open: true,
        type: "success",
        message: "Profissional da Saúde Removido Com Sucesso",
      });

      onClose();
    } catch (err) {
      setLoading(false);

      showAlert({
        open: true,
        type: "danger",
        message: decodeExceptionObject(err, ExceptionMessages.store_error),
      });
    }
  };

  return (
    <Modal className="modal-dialog-centered" size="lg" isOpen={open}>
      <div className="modal-header border-bottom">
        <h3 className="modal-title" id="modal-title-notification">
          Alerta de Remocão de Administrador{" "}
          <i className="fa-solid fa-triangle-exclamation text-warning"></i>
        </h3>
      </div>
      <div className="modal-body border-bottom mt-2">
        <h2 className="modal-title mb-3" id="modal-title-notification">
          Você realmente deseja remover o administrador {profile.fullname}?
        </h2>
        <p className="font-weight-500">
          Você pode remover ele, mas esse administrador poderá eventualmente se
          vincular novamente ao seu local de atendimento devido ao tipo do seu
          acesso!
        </p>
      </div>
      <div className="modal-footer">
        <Button className="btn btn-medical" onClick={() => unlink()}>
          Remover Administrador
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
