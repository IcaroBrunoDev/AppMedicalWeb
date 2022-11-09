import React from "react";
import { AlertType } from "../interfaces/General";

import CustomAlert from "../components/AlertModal/AlertModal";

interface AlertInterface {
  open: boolean;
  type: AlertType | any;
  message: string | any;
}

interface AlertContextInterface {
  alert: AlertInterface;
  showAlert: (alert: AlertInterface) => void;
}

const initialAlert: AlertInterface = {
  open: false,
  type: AlertType.danger,
  message: "",
};

const AlertContext = React.createContext<AlertContextInterface>(
  {} as AlertContextInterface
);

export function AlertProvider({ children }: any) {
  const [alert, showAlert] = React.useState<AlertInterface>(initialAlert);

  const closeAlert = () => {
    showAlert(initialAlert);
  };

  return (
    <>
      {alert.open && <CustomAlert {...alert} onClose={closeAlert} />}

      <AlertContext.Provider value={{ alert, showAlert }}>
        {children}
      </AlertContext.Provider>
    </>
  );
}

export function useAlert() {
  return React.useContext(AlertContext);
}
