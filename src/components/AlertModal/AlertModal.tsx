import * as React from "react";
import { Alert, Modal } from "reactstrap";

interface CustomAlertProps {
  type: string;
  open: boolean;
  onClose: () => void;
  message: string | any;
}

export default function CustomAlert({
  type,
  open,
  message,
  onClose,
}: CustomAlertProps) {
  const [translatedMessage, setTranslatedMessage] = React.useState<string>();


  setTimeout(() => {
    onClose()
  }, 3500)

  React.useEffect(() => {
    if (typeof message === "object") {
      if (message.response && message.response.data) {
        const { data } = message.response;
        setTranslatedMessage(data.response);
      }
    } else if (typeof message === "string") {
      setTranslatedMessage(message);
    }
  }, [message]);

  return (
    <React.Suspense>
      <Modal
        size="lg"
        isOpen={open}
        backdrop={false}
        className="modal-dialog exception-modal p-0 h-auto"
        modalClassName="h-auto"
        toggle={onClose}
      >
        <Alert
          color={type}
          className="w-100 d-flex flex-row justify-content-between align-items-center m-0"
        >
          {translatedMessage}
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={onClose}
          >
            <span className="text-white" aria-hidden={true}>
              ×
            </span>
          </button>
        </Alert>
      </Modal>
    </React.Suspense>
  );
}
