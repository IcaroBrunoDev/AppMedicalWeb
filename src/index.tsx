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

import { AlertProvider } from "./context/AlertProvider";
import { AuthProvider, useAuth } from "./context/AuthProvider";

export const PropsContext = React.createContext({});

const PrivateRoute = (props: RouteProps) => {
  const auth = useAuth();

  return (
    <Route
      {...props}
      render={(props: RouteProps) =>
        auth.isAuthenticated ? (
          <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
};

export function Routes() {
  const [selectedLocationId, setSelectedLocationId] = React.useState<
    number | undefined
  >();

  return (
    <AlertProvider>
      <AuthProvider>
        <PropsContext.Provider
          value={{
            selectedLocationId,
            setSelectedLocationId,
          }}
        >
          <HashRouter>
            <Switch>
              <PrivateRoute path="/admin" />
              <Route path="/" render={() => <AuthLayout />} />
            </Switch>
          </HashRouter>
        </PropsContext.Provider>
      </AuthProvider>
    </AlertProvider>
  );
}

export const usePropsContext = () => React.useContext(PropsContext);

ReactDOM.render(<Routes />, document.getElementById("root"));
