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

import api from "../../utils/axios";
import { usePropsContext } from "../..";

export default function MyLocations() {
  const { showAlert }: any = usePropsContext();

  const [loading, setLoading] = React.useState<boolean>(false);
  const [attendanceLinks, setAttendanceLinks] = React.useState<any[]>([]);

  React.useEffect(() => {
    const loadingAttendanceLinks = async () => {
      try {
        setLoading(true);

        const { data } = await api.get(`/linked-locations`);

        setAttendanceLinks(data.response);
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
            <h3 className="mb-0">Meus Locais de Atendimento</h3>
            <small>
              Total de:{" "}
              <b className="text-custom-purple">
                {attendanceLinks?.length ?? "0"}
              </b>{" "}
              Locais de Atendimento
            </small>
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
            {attendanceLinks.map((data: any, index: any) => (
              <tbody key={index}>
                <tr>
                  <th scope="row">
                    <Media className="align-items-center">
                      <span className="avatar rounded-circle mr-3 bg-medical">
                        <i className="fa-solid fa-hospital"></i>
                      </span>
                      <Media>
                        <span className="mb-0 text-sm">
                          {data.location.local_name}
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
                    <span>{data.location.local_primary_phone}</span>
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
          <span>Essa Lista Está Vazia por Enquanto...</span>
        </div>
      )}
    </Card>
  );
}
