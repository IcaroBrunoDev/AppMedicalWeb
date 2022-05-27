import React from "react";
import ReactDOM from "react-dom";
import {
  HashRouter,
  Route,
  Switch,
  Redirect,
  RouteProps,
} from "react-router-dom";

import "./assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/scss/argon-dashboard-react.scss";
import "rc-time-picker/assets/index.css";

import AuthLayout from "./layouts/Auth";
import AdminLayout from "./layouts/Admin";

import CustomAlert from "./components/AlertModal/AlertModal";

import { AlertType } from "./interfaces/General";
import { getSessionToken } from "./utils/caches";

interface Exception {
  open: boolean;
  type: AlertType;
  message: string | null;
}

export const PropsContext = React.createContext({});

const PrivateRoute = (props: RouteProps) => (
  <Route
    {...props}
    render={(props: RouteProps) =>
      getSessionToken()?.token ? (
        <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

export function Routes() {
  const [alert, showAlert] = React.useState<Exception>({
    open: false,
    type: AlertType.danger,
    message: null,
  });

  const [selectedLocationId, setSelectedLocationId] = React.useState<any>(null);

  const closeAlert = () => {
    showAlert((prev) => ({ ...prev, open: false }));
  };

  return (
    <>
      {alert.open && <CustomAlert {...alert} onClose={closeAlert} />}

      <PropsContext.Provider
        value={{ alert, showAlert, selectedLocationId, setSelectedLocationId }}
      >
        <HashRouter>
          <Switch>
            <PrivateRoute path="/admin" />
            <Route path="/" render={() => <AuthLayout />} />
          </Switch>
        </HashRouter>
      </PropsContext.Provider>
    </>
  );
}

export const usePropsContext = () => React.useContext(PropsContext);

ReactDOM.render(<Routes />, document.getElementById("root"));
