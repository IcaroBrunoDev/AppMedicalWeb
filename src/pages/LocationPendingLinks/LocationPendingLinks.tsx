import * as React from "react";

import {
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Pagination,
  PaginationItem,
  PaginationLink,
  Container,
  Row,
  Col,
  Spinner,
  Media,
  Table,
  Badge,
} from "reactstrap";

import Header from "../../components/Layouts/Header";
import AcceptLink from "../../components/LocationPendingLinks/AcceptLink";
import RejectLink from "../../components/LocationPendingLinks/RejectLink";
import { useAlert } from "../../context/AlertProvider";
import { usePlaces } from "../../context/PlacesProvider";

import api from "../../utils/axios";

export default function LocationPendingLinks() {
  const { showAlert } = useAlert();
  const { selectedLocation } = usePlaces();

  const [refresh, setRefresh] = React.useState<number>(0);

  const [loading, setLoading] = React.useState<boolean>(false);
  const [pagination, setPagination] = React.useState<any>();
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  const [acceptLink, setAcceptLink] = React.useState<any>();
  const [rejectLink, setRejectLink] = React.useState<any>();

  const [attendanceLinks, setAttendanceLinks] = React.useState<any[]>([]);

  React.useEffect(() => {
    const loadingAttendanceLinks = async () => {
      try {
        setLoading(true);

        const { data } = await api.get(
          `/links/${selectedLocation.id}/pendings?page=${currentPage}`
        );

        setPagination(data.response.meta);
        setAttendanceLinks(data.response.data);
      } catch (err) {
        showAlert({ open: true, type: "danger", message: err });
      } finally {
        setLoading(false);
      }
    };

    loadingAttendanceLinks();
  }, [refresh, currentPage, selectedLocation, showAlert]);

  const onRefresh = () => {
    setRefresh((prev) => prev + 1);
  };

  const handleAcceptLink = (e: any, link: any) => {
    e.preventDefault();
    setAcceptLink({ open: true, link });
  };

  const handleRejectLink = (e: any, link: any) => {
    e.preventDefault();
    setRejectLink({ open: true, link });
  };

  return (
    <>
      <Row>
        <div className="col">
          <Card className="shadow">
            <CardHeader className="border-0 d-flex flex-row justify-content-between align-items-center">
              <Row className="w-100">
                <Col lg="12">
                  <h3 className="mb-0">
                    Vínculos de Locais de Atendimento Pendentes
                  </h3>
                  <small>
                    Total de:{" "}
                    <b className="text-custom-purple">
                      {pagination?.total ?? "Indefinido"}
                    </b>{" "}
                    Vínculos pendentes de aprovacão
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
                      <th scope="col">Endereco</th>
                      <th scope="col">Telefone do Local</th>
                      <th scope="col">Status da Vinculacão</th>
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
                                {link.secondary_location_attributes.local_name}
                              </span>
                            </Media>
                          </Media>
                        </th>
                        <td>
                          <p className="text-sm m-0">
                            {" "}
                            {
                              link.secondary_location_attributes.local_address
                                .street
                            }
                            ,
                          </p>
                          <p className="text-sm m-0">
                            {" "}
                            Bairro{" "}
                            {
                              link.secondary_location_attributes.local_address
                                .neighborhood
                            }
                            ,
                          </p>

                          <p className="text-sm">
                            {
                              link.secondary_location_attributes.local_address
                                .city
                            }{" "}
                            -{" "}
                            {
                              link.secondary_location_attributes.local_address
                                .state
                            }
                          </p>
                        </td>
                        <td>
                          <span>
                            {" "}
                            {
                              link.secondary_location_attributes
                                .local_primary_phone
                            }
                          </span>
                        </td>
                        <td>
                          <Badge color="" className="badge-dot mr-4">
                            <i className="bg-warning" />
                            Pendente de Aprovacão
                          </Badge>
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
                              <DropdownItem
                                href="/"
                                onClick={(e) => handleAcceptLink(e, link)}
                              >
                                <i className="fa-solid fa-circle-check text-success"></i>{" "}
                                Aprovar Vínculo
                              </DropdownItem>
                              <DropdownItem
                                href="/"
                                onClick={(e) => handleRejectLink(e, link)}
                              >
                                <i className="fa-solid fa-triangle-exclamation text-warning"></i>{" "}
                                Rejeitar Vínculo
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </Table>

                <CardFooter className="py-4">
                  <nav aria-label="...">
                    <Pagination
                      className="pagination justify-content-end mb-0"
                      listClassName="justify-content-end mb-0"
                    >
                      {new Array(pagination.last_page).fill(1).map((_, key) => (
                        <PaginationItem
                          active={currentPage === key + 1 ?? false}
                        >
                          <PaginationLink
                            href="/"
                            onClick={() => setCurrentPage(key + 1)}
                          >
                            {key + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                    </Pagination>
                  </nav>
                </CardFooter>
              </>
            ) : loading ? (
              <div className="text-center py-4 text-dark">
                <Spinner animation="border" role="status" size="lg">
                  <span className="visually-hidden">Carregando...</span>
                </Spinner>
              </div>
            ) : (
              <div className="text-center py-4 text-sm">
                <span>
                  Você não possui vinculos pendentes de aprovacão no momento.
                </span>
              </div>
            )}
          </Card>
        </div>
      </Row>

      {acceptLink?.open && (
        <AcceptLink
          {...acceptLink}
          onRefresh={onRefresh}
          onClose={() => setAcceptLink(null)}
        />
      )}

      {rejectLink?.open && (
        <RejectLink
          {...rejectLink}
          onRefresh={onRefresh}
          onClose={() => setRejectLink(null)}
        />
      )}
    </>
  );
}
