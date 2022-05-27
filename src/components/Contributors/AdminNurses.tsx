import * as React from "react";

import { Media, Table } from "reactstrap";

// import DestoyAdminNurse from "./Destroy/AdminNurse";

export default function NurseList({ contributors }: object | any) {
  // const [unlink, setUnlink] = React.useState<any>({
  //   open: false,
  //   profile: null,
  //   onClose: () =>
  //     setUnlink((prev: any) => ({ ...prev, open: false, profile: null })),
  // });

  return (
    <>
      <Table className="align-items-center table-flush" responsive>
        <thead className="thead-light">
          <tr>
            <th scope="col">Nome Do Profissional de Saúde</th>
            <th scope="col">Email</th>
            <th scope="col">CPF</th>
            <th scope="col">Telefone</th>
          </tr>
        </thead>
        {contributors.map((nurse: any, index: number) => (
          <tbody key={index}>
            <tr>
              <th scope="row">
                <Media className="align-items-center">
                  <a
                    href="/"
                    className="avatar rounded-circle mr-3"
                    onClick={(e) => e.preventDefault()}
                  >
                    <img
                      alt={nurse.admin_nurse?.profile_picture}
                      src={nurse.admin_nurse?.profile_picture}
                    />
                  </a>
                  <Media>
                    <span className="mb-0 text-sm">
                      {nurse.admin_nurse.fullname}
                    </span>
                  </Media>
                </Media>
              </th>
              <td>
                <span>{nurse.admin_nurse.email}</span>
              </td>
              <td>
                <span>{nurse.admin_nurse.cpf}</span>
              </td>
              <td>
                <span>{nurse.admin_nurse.phone}</span>
              </td>
            </tr>
          </tbody>
        ))}
      </Table>

      {/* {unlink.open && <DestoyAdminNurse {...unlink} />} */}
    </>
  );
}
