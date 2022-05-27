import * as React from "react";

import { usePropsContext } from "../index";
import { AlertType } from "../interfaces/General";

export const SucessAlert = (message: string) => {
  const { showAlert }: any = usePropsContext();

  showAlert({
    open: true,
    type: AlertType.success,
    message,
  });
};
