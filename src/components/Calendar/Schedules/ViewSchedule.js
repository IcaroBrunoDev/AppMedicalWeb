import { Button, Modal, ModalBody, ModalFooter, Row, Col } from "reactstrap";

export default function CalendarViewSchedule(props) {
  const { onOpen, onClose } = props;

  return (
    <Modal className="modal-dialog-centered" isOpen={onOpen} size="lg">
      <div className="modal-header border-bottom">
        <h3 className="modal-title" id="modal-title-notification">
          Detalhes da Consulta
        </h3>
      </div>
      <ModalBody className="pt-3">
        <Row className="border-bottom">
          <h6 className="heading-small text-dark ml-2 ">Dados Do Pacitente</h6>
          <Col lg="12" className="border-bottom pb-3">
            <div className="d-flex flex-row align-items-center">
              <div className="w-100 d-flex flex-row justify-content-between">
                <p className="text-dark font-weight-500 ml-3 m-0">
                  <span className="text-medical font-weight-600 text-underline">
                    Nome:
                  </span>{" "}
                </p>
                <p className="text-dark font-weight-500 m-0">
                  <span className="text-medical font-weight-600 text-underline">
                    Telefone:
                  </span>{" "}
                </p>
              </div>
            </div>
          </Col>
          <Col lg="12" className="d-flex flex-row justify-content-between mt-3">
            <div>
              <p className="text-dark font-weight-500">
                <span className="text-medical font-weight-600 text-underline">
                  CPF:
                </span>{" "}
              </p>
              <p className="text-dark font-weight-500">
                <span className="text-medical font-weight-600 text-underline">
                  Email:
                </span>{" "}
              </p>
            </div>
            <div>
              <p className="text-dark font-weight-500">
                <span className="text-medical font-weight-600 text-underline">
                  Cartão Do SUS:
                </span>{" "}
              </p>
              <p className="text-dark font-weight-500">
                <span className="text-medical font-weight-600 text-underline">
                  Data de Nascimento:
                </span>{" "}
              </p>
            </div>
          </Col>
        </Row>
        <Row className="border-bottom bg-ligth">
          <h6 className="heading-small text-dark ml-2 mt-2">
            Dados da Consulta
          </h6>
          <Col
            lg="12"
            className="d-flex flex-row flex-wrap justify-content-between mt-3"
          >
            <Col className="p-0 m-0">
              <p className="text-dark font-weight-500">
                <span className="text-medical font-weight-600 text-underline">
                  CPF:
                </span>{" "}
              </p>
              <p className="text-dark font-weight-500">
                <span className="text-medical font-weight-600 text-underline">
                  Email:
                </span>{" "}
              </p>
            </Col>
            <Col sm="12" lg="6">
              <p className="text-dark font-weight-500">
                <span className="text-medical font-weight-600 text-underline">
                  Cartão Do SUS:
                </span>{" "}
              </p>
              <p className="text-dark font-weight-500">
                <span className="text-medical font-weight-600 text-underline">
                  Data de Nascimento:
                </span>{" "}
              </p>
            </Col>
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter>
        <Button onClick={onClose}>Fechar</Button>
      </ModalFooter>
    </Modal>
  );
}
