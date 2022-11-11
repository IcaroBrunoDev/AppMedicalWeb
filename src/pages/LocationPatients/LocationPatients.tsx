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
  Row,
  Col,
  Spinner,
  Media,
  Table,
} from "reactstrap";

export default function LocationPatients() {
  const [loading] = React.useState<boolean>(false);
  const [pagination] = React.useState<any>();
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  const [attendanceLinks] = React.useState<any[]>([]);

  const handleNextPage = (e: any) => {
    e.preventDefault();
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = (e: any) => {
    e.preventDefault();
    setCurrentPage(currentPage - 1);
  };

  return (
    <Row>
      <div className="col">
        <Card className="shadow">
          <CardHeader className="border-0 d-flex flex-row justify-content-between align-items-center">
            <Row className="w-100">
              <Col lg="12">
                <h3 className="mb-0">Pacientes da Unidade de Saúde</h3>
                <small>
                  Total de: <b className="text-custom-purple"></b> Pacientes
                </small>
              </Col>
            </Row>
          </CardHeader>

          {attendanceLinks.length > 0 && !loading ? (
            <>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Nome Do Médico</th>
                    <th scope="col">CRM</th>
                    <th scope="col">Email</th>
                    <th scope="col">Telefone</th>
                    <th scope="col">Especialidade</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                {attendanceLinks.map((link: any, index: any) => (
                  <tbody key={index}>
                    <tr>
                      <th scope="row">
                        <Media className="align-items-center">
                          <a
                            href="/"
                            className="avatar rounded-circle mr-3"
                            onClick={(e) => e.preventDefault()}
                          >
                            {/* <img
                      alt=
                      src=
                    /> */}
                          </a>
                          <Media>
                            <span className="mb-0 text-sm"></span>
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
                              Ver Agenda do Médico
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
                    <PaginationItem>
                      <PaginationLink
                        href="/"
                        onClick={(e) => handlePrevPage(e)}
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Anterior</span>
                      </PaginationLink>
                    </PaginationItem>
                    {new Array(pagination.last_page).fill(1).map((_, key) => (
                      <PaginationItem active={currentPage === key + 1 ?? false}>
                        <PaginationLink
                          href="/"
                          onClick={() => setCurrentPage(currentPage + 1)}
                        >
                          {key + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationLink
                        href="/"
                        onClick={(e) => handleNextPage(e)}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Próximo</span>
                      </PaginationLink>
                    </PaginationItem>
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
              <span>Essa Lista Está Vazia por Enquanto...</span>
            </div>
          )}
        </Card>
      </div>
    </Row>
  );
}
