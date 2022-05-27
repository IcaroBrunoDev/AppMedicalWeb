import * as React from "react";
import { Button, Modal } from "reactstrap";

import { ReadDoctors } from "../../interfaces/Profiles";

import CreateAvailability from "./CreateAvailability";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  doctor: { doctor: ReadDoctors };
}

export default function AvailabilityWarning({
  open,
  doctor,
  onClose,
}: ModalProps) {
  const [nestedModal, setNestedModal] = React.useState<boolean>(false);

  const [storeAvailability, setStoredAvailability] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    if (storeAvailability) {
      onClose();
    }
  }, [storeAvailability]);

  return (
    <Modal className="modal-dialog-centered" size="lg" isOpen={open}>
      <div className="modal-header border-bottom">
        <h3 className="modal-title" id="modal-title-notification">
          Alerta de Disponibilidade Médica{" "}
          <i className="fa-solid fa-triangle-exclamation text-warning"></i>
        </h3>
      </div>
      <div className="modal-body border-bottom mt-2">
        <h2 className="modal-title mb-3" id="modal-title-notification">
          O médico <span className="text-medical">{doctor.doctor.fullname}</span> não tem disponibilidade de agenda, deseja cadastrar agora?
        </h2>
        <p className="font-weight-500">
          A disponibilidade de agenda é{" "}
          <span className="font-weight-bold text-medical">OBRIGATÓRIA</span>{" "}
          para que você possa agendar consultar para esse médico.
        </p>
        <p className="font-weight-500">
          Caso deseje cadastrar agora, basta clicar no botão{" "}
          <span className="font-weight-bold text-medical">
            "Cadastrar Agora"
          </span>
          . Se precisar cadastrar mais tarde, você também pode ir a lista de
          médicos da sua unidade e definir o calendário de atendimento do mesmo.
        </p>
        {nestedModal && (
          <CreateAvailability
            open={nestedModal}
            doctor={doctor.doctor}
            onStore={() => setStoredAvailability(true)}
            onClose={() => setNestedModal(false)}
          />
        )}
      </div>
      <div className="modal-footer">
        <Button
          className="btn btn-medical"
          onClick={() => setNestedModal(true)}
        >
          Cadastrar Agora
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
