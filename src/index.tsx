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
import { PlacesProvider } from "./context/PlacesProvider";
import { AuthProvider, useAuth } from "./context/AuthProvider";

const PrivateRoute = (props: RouteProps) => {
  const { isAuthenticated } = useAuth();

  return (
    <Route
      {...props}
      render={(props: RouteProps) =>
        isAuthenticated ? (
          <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
};

export function Routes() {
  return (
    <AlertProvider>
      <AuthProvider>
        <PlacesProvider>
          <HashRouter>
            <Switch>
              <PrivateRoute path="/admin" />
              <Route path="/" render={() => <AuthLayout />} />
            </Switch>
          </HashRouter>
        </PlacesProvider>
      </AuthProvider>
    </AlertProvider>
  );
}

ReactDOM.render(<Routes />, document.getElementById("root"));
