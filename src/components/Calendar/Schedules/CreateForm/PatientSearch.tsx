import React from "react";
import {
  Input,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Spinner,
} from "reactstrap";

import { Patient } from "../../../../interfaces/Profiles";

import axios from "../../../../utils/axios";

import { useAlert } from "../../../../context/AlertProvider";
import { AlertType } from "../../../../interfaces/General";

export interface PatientSearchInterface {
  patientWarning: boolean;
  selectedPatient: Patient | null | undefined;
  handlePatient: (patient: Patient | null) => void;
}

export default function PatientSearch(props: PatientSearchInterface) {
  const { showAlert } = useAlert();

  const { patientWarning, selectedPatient, handlePatient } = props;

  const [loading, setLoading] = React.useState<boolean>(false);

  const [patients, setPatients] = React.useState<Patient[]>([]);
  const [patientTerm, setPatientTerm] = React.useState<string>();

  const selectPatient = (patient: Patient | null) => {
    setPatients([]);
    handlePatient(patient);
  };

  const searchPatient = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(`/patient?query=${patientTerm}`);

      setPatients(data.response);
    } catch (err) {
      showAlert({ open: true, type: AlertType.danger, message: err });
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormGroup>
      <label className="form-control-label" htmlFor="patient_term">
        Buscar Paciente*
      </label>

      <InputGroup className="input-group-alternative mb-1">
        <Input
          id="patientTerm"
          name="patientTerm"
          type="text"
          invalid={patientWarning}
          className={`form-control-alternative  ${
            patientWarning ? "border border-warning" : ""
          }`}
          placeholder="Digite o CPF ou o CARTÃO SUS do paciente"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPatientTerm(e.target.value)
          }
        />

        <InputGroupAddon addonType="append">
          <InputGroupText>
            {!loading ? (
              !selectedPatient ? (
                <i
                  className="text-sm fa-solid fa-magnifying-glass cursor-pointer"
                  onClick={searchPatient}
                />
              ) : (
                <i
                  className="text-sm fa-solid fa-xmark cursor-pointer"
                  onClick={() => handlePatient(null)}
                />
              )
            ) : (
              <Spinner
                animation="border"
                role="status"
                size="sm"
                className="text-medical"
              />
            )}
          </InputGroupText>
        </InputGroupAddon>
      </InputGroup>

      {patientWarning && (
        <span className="d-block invalid-feedback">
          Esse campo é obrigatório
        </span>
      )}

      {patients.length > 0 && (
        <div className="users-results border-1 px-2 shadow">
          <div className="d-flex flex-row justify-content-between">
            <h6 className="heading-small text-muted  mt-2">
              Resultado(s) da busca:
            </h6>
            <span
              id="close-span"
              className="font-small mt-2"
              onClick={() => setPatients([])}
            >
              Fechar
            </span>
          </div>

          {patients.map((patient, index: number) => (
            <div
              key={`${patient.fullname}_${index}`}
              className="cards"
              onClick={() => selectPatient(patient)}
            >
              <div className="d-flex flex-row align-items-center">
                <div className="d-flex flex-column ">
                  <span className="ml-3">
                    <span className="text-medical">Nome: </span>
                    {patient.fullname}
                  </span>
                  <span className="ml-3">
                    <span className="text-medical">CPF: </span> {patient.cpf}
                  </span>
                </div>
              </div>
              <div className="d-flex flex-column">
                <span className="ml-3">
                  <span className="text-medical">Nascimento: </span>
                  {patient.birthdate}
                </span>
                <span className="ml-3">
                  <span className="text-medical">Cartão SUS: </span>{" "}
                  {patient.sus_card ?? "Não Cadastrado"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedPatient && (
        <>
          <h6 className="heading-small text-muted mt-3">
            Paciente para agendamento
          </h6>
          <div className="d-flex flex-row justify-content-between border py-3 px-2 text-sm">
            <div className="d-flex flex-row align-items-center">
              <div className="d-flex flex-column">
                <span className="ml-3 mb-1">
                  <span className="text-medical">Nome: </span>
                  {selectedPatient.fullname}
                </span>
                <span className="ml-3">
                  <span className="text-medical">CPF: </span>{" "}
                  {selectedPatient.cpf}
                </span>
              </div>
            </div>
            <div className="d-flex flex-column">
              <span className="ml-3 mb-1">
                <span className="text-medical">Nascimento: </span>
                {selectedPatient.birthdate}
              </span>
              <span className="ml-3">
                <span className="text-medical">Cartão SUS: </span>{" "}
                {selectedPatient.sus_card ?? "Não Cadastrado"}
              </span>
            </div>
          </div>
        </>
      )}
    </FormGroup>
  );
}
