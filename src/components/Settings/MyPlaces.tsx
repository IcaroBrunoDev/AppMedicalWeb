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
  Media,
  Table,
  Badge,
} from "reactstrap";

import { usePlaces } from "../../context/PlacesProvider";

export default function MyPlaces() {
  const { locations } = usePlaces();

  return (
    <Card className="shadow">
      <CardHeader className="border-bottom d-flex flex-row justify-content-between align-items-center">
        <Row className="w-100">
          <Col lg="12">
            <h3 className="mb-0">Meus Locais de Atendimento</h3>
            <small>
              Total de:{" "}
              <b className="text-custom-purple">{locations?.length ?? "0"}</b>{" "}
              Locais de Atendimento
            </small>
          </Col>
        </Row>
      </CardHeader>

      {locations.length > 0 ? (
        <>
          <Table className="align-items-center table-flush" responsive>
            <thead className="thead-light">
              <tr>
                <th scope="col">Local de Atendimento</th>
                <th scope="col">Status da Vinculacão</th>
                <th scope="col">Telefone do Estabelecimento</th>
                <th scope="col" />
              </tr>
            </thead>
            {locations.map((data: any, index: any) => (
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
                        role="button"
                        size="sm"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-ellipsis-v" />
                      </DropdownToggle>
                      <DropdownMenu className="dropdown-menu-arrow" right>
                        <DropdownItem>Remover Vínculo</DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </td>
                </tr>
              </tbody>
            ))}
          </Table>
          <CardFooter className="py-4" />
        </>
      ) : (
        <div className="text-center py-4 text-sm">
          <span>Essa Lista Está Vazia por Enquanto...</span>
        </div>
      )}
    </Card>
  );
}
