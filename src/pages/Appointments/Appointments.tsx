import * as React from "react";

import {
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Row,
  Col,
  Spinner,
  Media,
  Table,
} from "reactstrap";

import { useAlert } from "../../context/AlertProvider";
import { useAuth } from "../../context/AuthProvider";
import { usePlaces } from "../../context/PlacesProvider";

import api from "../../utils/axios";

export default function Appointments() {
  const { profile } = useAuth();
  const { showAlert } = useAlert();
  const { selectedLocation } = usePlaces();

  const [loading, setLoading] = React.useState<boolean>(false);
  const [appointments, setAppointments] = React.useState<any[]>([]);

  const [pagination, setPagination] = React.useState<any>();
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  React.useMemo(() => {
    (async () => {
      try {
        setLoading(true);

        const response = await api.get(
          `/appointments/${profile?.id}/${selectedLocation.id}?page=${currentPage}`
        );

        const { data, meta } = response.data.response;

        setPagination(meta);
        setAppointments(data);
      } catch (err) {
        showAlert({ open: true, type: "danger", message: err });
      } finally {
        setLoading(false);
      }
    })();
  }, [profile, selectedLocation, showAlert]);

  return (
    <Row>
      <div className="col">
        <Card className="shadow">
          <CardHeader className="border-0 d-flex flex-row justify-content-between align-items-center">
            <Row className="w-100">
              <Col lg="12">
                <h3 className="mb-0">Minhas Consultas</h3>
                <small>
                  Total de: {appointments.length}{" "}
                  <b className="text-custom-purple"></b> Consultas
                </small>
              </Col>
            </Row>
          </CardHeader>

          {appointments.length > 0 && !loading ? (
            <>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Nome Da Consulta</th>
                    <th scope="col">Data</th>
                    <th scope="col">Hora</th>
                    <th scope="col">Status</th>
                    <th scope="col">Nome do Paciente</th>
                    <th scope="col">Dependente</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                {appointments.map((appointment: any, index: any) => (
                  <tbody key={index}>
                    <tr>
                      <th scope="row">
                        <Media className="align-items-center">
                          <Media>
                            <span className="mb-0 text-sm">
                              {appointment.event_name}
                            </span>
                          </Media>
                        </Media>
                      </th>
                      <td></td>
                      <td>
                        <span></span>
                      </td>
                      <td>
                        <span></span>
                      </td>
                      <td></td>
                      <td className="text-center">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href="/"
                            role="button"
                            size="sm"
                            onClick={(e) => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem href="/">
                              Ver Agenda do M??dico
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </Table>

              <CardFooter className="py-4"></CardFooter>
            </>
          ) : loading ? (
            <div className="text-center py-4 text-dark">
              <Spinner animation="border" role="status" size="lg" />
            </div>
          ) : (
            <div className="text-center py-4 text-sm">
              <span>Essa Lista Est?? Vazia por Enquanto...</span>
            </div>
          )}
        </Card>
      </div>
    </Row>
  );
}
