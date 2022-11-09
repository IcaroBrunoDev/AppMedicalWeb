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
} from "reactstrap";

import Header from "../../components/Layouts/Header";
import NurseList from "../../components/Contributors/AdminNurses";
import DoctorList from "../../components/Contributors/SpecializedDoctors";

import CreateDoctor from "../../components/Contributors/Create/SpecializedDoctor";
import CreateAdminNurse from "../../components/Contributors/Create/AdminNurse";

import api from "../../utils/axios";

import { ReadDoctors } from "../../interfaces/Profiles";
import { useAlert } from "../../context/AlertProvider";
import { usePlaces } from "../../context/PlacesProvider";

enum ContributorsType {
  admin_nurses = "admin_nurses",
  specialized_doctors = "specialized_doctors",
}

interface ContributorState {
  availability?: object;
  doctor?: ReadDoctors;
}

export default function Contributor() {
  const { showAlert } = useAlert();
  const { selectedLocation } = usePlaces();

  const [refresh, setRefresh] = React.useState<number>(0);

  const [loading, setLoading] = React.useState<boolean>(false);
  const [pagination, setPagination] = React.useState<any>();
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  const [createNurse, setCreateNurse] = React.useState<boolean>(false);
  const [createDoctor, setCreateDoctor] = React.useState<boolean>(false);

  const [contributors, setContributors] = React.useState<ContributorState[]>(
    []
  );
  const [contributorsType, setContributorsType] =
    React.useState<ContributorsType>(ContributorsType.specialized_doctors);

  React.useEffect(() => {
    const loadingContributors = async () => {
      try {
        setLoading(true);
        setContributors([]);

        const { data } = await api.get(
          `locations/${selectedLocation.id}/contributors?filter=all&page=${currentPage}`
        );

        switch (contributorsType) {
          case ContributorsType.specialized_doctors:
            setPagination(data.response.specialized_doctors.meta);
            setContributors(data.response.specialized_doctors.data);
            break;

          case ContributorsType.admin_nurses:
            setPagination(data.response.admin_nurses.meta);
            setContributors(data.response.admin_nurses.data);
            break;
        }
      } catch (err) {
        showAlert({ open: true, type: "danger", message: err });
      } finally {
        setLoading(false);
      }
    };

    loadingContributors();
  }, [refresh, contributorsType, currentPage]);

  const handleContributorsType = (type: ContributorsType) => {
    if (contributorsType !== type) {
      setContributors([]);
      setContributorsType(type);
    }
  };

  const onRefresh = () => {
    setRefresh((prev) => prev + 1);
  };

  return (
    <>
      <Row>
        <div className="col">
          <Card className="shadow">
            <CardHeader className="border-0 d-flex flex-row justify-content-between align-items-center">
              <Row className="w-100">
                <Col lg="6">
                  <h3 className="mb-0">
                    Lista de{" "}
                    {contributorsType === ContributorsType.specialized_doctors
                      ? "Médicos"
                      : "Profissionais de Saúde"}
                  </h3>
                  <small>
                    Total de:{" "}
                    <b className="text-custom-purple">
                      {pagination && pagination?.total}
                    </b>{" "}
                    {contributorsType === ContributorsType.specialized_doctors
                      ? "Médicos"
                      : "Administradores da Unidade"}{" "}
                    Vinculados na <span className="text-medical"></span>
                  </small>
                </Col>
                <Col
                  lg="6"
                  className="d-md-flex mt-md-0 mt-3 justify-content-md-end align-items-center"
                >
                  <UncontrolledDropdown nav>
                    <DropdownToggle
                      nav
                      className="pr-0 d-flex align-items-center"
                    >
                      <span className="mr-2 text-dark font-weight-600 text-sm">
                        Tipo de Perfil:{" "}
                        <span className="text-medical">
                          {contributorsType === ContributorsType.admin_nurses
                            ? "Administradores"
                            : "Médicos"}
                        </span>
                      </span>

                      <i className="fa-solid fa-caret-down text-medical text-lg mr-4 cursor-pointer"></i>
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-arrow" right>
                      <DropdownItem className="noti-title" header tag="div">
                        <h6 className="text-overflow m-0">
                          {" "}
                          Escolha o perfil que deseja listar:
                        </h6>
                      </DropdownItem>

                      <DropdownItem
                        className={
                          contributorsType ===
                          ContributorsType.specialized_doctors
                            ? "active"
                            : ""
                        }
                        onClick={() =>
                          handleContributorsType(
                            ContributorsType.specialized_doctors
                          )
                        }
                      >
                        <i className="fa-solid fa-user-doctor"></i>
                        <span>Médicos</span>
                      </DropdownItem>
                      <DropdownItem
                        className={
                          contributorsType === ContributorsType.admin_nurses
                            ? "active"
                            : ""
                        }
                        onClick={() =>
                          handleContributorsType(ContributorsType.admin_nurses)
                        }
                      >
                        <i className="fa-solid fa-user-nurse"></i>
                        <span>Administradores da Unidade</span>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>

                  {contributorsType === ContributorsType.specialized_doctors ? (
                    <button
                      onClick={() => setCreateDoctor(true)}
                      className="btn btn-medical py-2"
                    >
                      Cadastrar Novo Médico
                    </button>
                  ) : (
                    <button
                      className="btn btn-medical py-2"
                      onClick={() => setCreateNurse(true)}
                    >
                      Cadastrar Novo Administrador
                    </button>
                  )}
                </Col>
              </Row>
            </CardHeader>

            {contributors && contributors.length > 0 && !loading ? (
              <>
                {contributorsType === ContributorsType.specialized_doctors && (
                  <DoctorList contributors={contributors} />
                )}

                {contributorsType === ContributorsType.admin_nurses && (
                  <NurseList contributors={contributors} />
                )}

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
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentPage(key + 1);
                            }}
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
                <span>Essa Lista Está Vazia por Enquanto...</span>
              </div>
            )}
          </Card>
        </div>
      </Row>

      {createDoctor && (
        <CreateDoctor
          open={createDoctor}
          onRefresh={onRefresh}
          onClose={() => setCreateDoctor(false)}
        />
      )}

      {createNurse && (
        <CreateAdminNurse
          open={createNurse}
          onRefresh={onRefresh}
          onClose={() => setCreateNurse(false)}
        />
      )}
    </>
  );
}
