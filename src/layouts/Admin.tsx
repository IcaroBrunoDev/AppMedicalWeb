import React from "react";
import {
  useLocation,
  Route,
  Switch,
  Redirect,
  RouteProps,
} from "react-router-dom";
import { Container } from "reactstrap";

import Header from "../components/Layouts/Header";
import Sidebar from "../components/Layouts/Sidebar";
import AdminNavbar from "../components/Layouts/NavBar";

import routes from "../routes";

import { usePlaces } from "../context/PlacesProvider";
import { RoutesInterface } from "../interfaces/Routes";

export default function Admin(props: RouteProps) {
  const { selectedLocation } = usePlaces();

  const location = useLocation();
  const mainContent = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    if (mainContent.current) {
      mainContent.current.scrollTop = 0;
    }
  }, [location]);

  const getRoutes = (routes: RoutesInterface[]) => {
    return routes.map((route, key) => {
      if (route.layout === "/admin") {
        return (
          <Route
            key={key}
            path={route.layout + route.path}
            component={route.component}
          />
        );
      } else {
        return null;
      }
    });
  };

  const getBrandText = (path: string) => {
    for (let i = 0; i < routes.length; i++) {
      if (path.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  return (
    <>
      <Sidebar
        routes={routes}
        logo={{
          innerLink: "/admin/",
          imgSrc: require("../assets/img/brand/logo.png"),
          imgAlt: "brand",
        }}
      />

      {selectedLocation && (
        <div className="main-content" ref={mainContent}>
          <AdminNavbar {...props} brandText={getBrandText(location.pathname)} />
          <Header />
          <Container className="mt--9" fluid>
            <Switch>
              {getRoutes(routes)}
              <Redirect from="*" to="/admin/agenda" />
            </Switch>
          </Container>
        </div>
      )}
    </>
  );
}
