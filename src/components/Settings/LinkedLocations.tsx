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
  Badge,
} from "reactstrap";
import { usePropsContext } from "../..";

import api from "../../utils/axios";

export default function LinkedLocations() {
  const { showAlert, selectedLocationId }: any = usePropsContext();

  const [loading, setLoading] = React.useState<boolean>(false);
  const [attendanceLinks, setAttendanceLinks] = React.useState<any>([]);

  React.useEffect(() => {
    const loadingAttendanceLinks = async () => {
      try {
        setLoading(true);

        const { data } = await api.get(
          `/links/${selectedLocationId}/specialized`
        );

        if (data.response) {
          setAttendanceLinks(data.response.locations_links);
        }
      } catch (err) {
        showAlert({ open: true, type: "danger", message: err });
      } finally {
        setLoading(false);
      }
    };

    loadingAttendanceLinks();
  }, []);

  return (
    <Card className="shadow">
      <CardHeader className="border-bottom d-flex flex-row justify-content-between align-items-center">
        <Row className="w-100">
          <Col lg="12">
            <h3 className="mb-0">Locais de Atendimento Vinculados</h3>
          </Col>
        </Row>
      </CardHeader>

      {attendanceLinks.length > 0 && !loading ? (
        <>
          <Table className="align-items-center table-flush" responsive>
            <thead className="thead-light">
              <tr>
                <th scope="col">Local de Atendimento</th>
                <th scope="col">Status da Vinculacão</th>
                <th scope="col">Telefone do Estabelecimento</th>
                <th scope="col"></th>
              </tr>
            </thead>
            {attendanceLinks.map((link: any, index: any) => (
              <tbody key={index}>
                <tr>
                  <th scope="row">
                    <Media className="align-items-center">
                      <span className="avatar rounded-circle mr-3 bg-medical">
                        <i className="fa-solid fa-hospital"></i>
                      </span>
                      <Media>
                        <span className="mb-0 text-sm">
                          {link.primary_location_attributes.local_name}
                        </span>
                      </Media>
                    </Media>
                  </th>
                  <td>
                    {" "}
                    <Badge color="" className="badge-dot mr-4">
                      <i className="bg-success" />
                      Ativo
                    </Badge>
                  </td>

                  <td>
                    <span>
                      {link.primary_location_attributes.local_primary_phone}
                    </span>
                  </td>

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
                        <DropdownItem href="/">Remover Vínculo</DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </td>
                </tr>
              </tbody>
            ))}
          </Table>

          <CardFooter className="py-4" />
        </>
      ) : loading ? (
        <div className="text-center py-4 text-dark">
          <Spinner animation="border" role="status" size="lg">
            <span className="visually-hidden">Carregando...</span>
          </Spinner>
        </div>
      ) : (
        <div className="text-center py-4 text-sm">
          <span>Nenhum Local de Atendimento Vinculado ao Seu.</span>
        </div>
      )}
    </Card>
  );
}
