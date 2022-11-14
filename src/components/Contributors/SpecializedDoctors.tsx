import * as React from "react";

import { Media, Table } from "reactstrap";

import CreateAvailability from "../Availability/CreateAvailability";

// import { ReadDoctors } from "../../interfaces/Profiles";

export default function DoctorList({ contributors }: object | any) {
  // const [availability, setAvailability] = React.useState<boolean>(false);

  // const toggleCreateModal = (
  //   e: React.MouseEvent<HTMLElement>,
  //   doctor: { doctor: ReadDoctors }
  // ) => {
  //   e.preventDefault();
  //   setAvailability({ open: true, doctor: doctor.doctor });
  // };

  return (
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
        {contributors.map((contributor: any, index: any) => (
          <tbody key={`${contributor.doctor.fullname}_${index}`}>
            <tr>
              <th scope="row">
                <Media className="align-items-center">
                  <a
                    href="/"
                    className="avatar rounded-circle mr-3"
                    onClick={(e) => e.preventDefault()}
                  >
                    <img
                      alt={contributor.doctor.profile_picture}
                      src={contributor.doctor.profile_picture}
                    />
                  </a>
                  <Media>
                    <span className="mb-0 text-sm">
                      {contributor.doctor.fullname}
                    </span>
                  </Media>
                </Media>
              </th>
              <td>{contributor.doctor.crm}</td>
              <td>
                <span>{contributor.doctor.email}</span>
              </td>
              <td>
                <span>{contributor.doctor.phone}</span>
              </td>
              <td>{contributor.doctor.specialtie.name}</td>
              <td className="text-center">
                {/* <UncontrolledDropdown>
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
                      onClick={(e) => toggleCreateModal(e, contributor)}
                    >
                      Ver Agenda do Médico
                    </DropdownItem>
                    {contributor.availability ? (
                      <DropdownItem
                        href="/"
                        onClick={(e) => e.preventDefault()}
                      >
                        Editar Disponibilidade
                      </DropdownItem>
                    ) : (
                      <DropdownItem
                        href="/"
                        onClick={(e) => toggleCreateModal(e, contributor)}
                      >
                        Criar Disponibilidade
                      </DropdownItem>
                    )}
                  </DropdownMenu>
                </UncontrolledDropdown> */}
              </td>
            </tr>
          </tbody>
        ))}
      </Table>

      {/* {availability.open && (
        <CreateAvailability
          {...availability}
          onClose={() => setAvailability(false)}
        />
      )} */}
    </>
  );
}
