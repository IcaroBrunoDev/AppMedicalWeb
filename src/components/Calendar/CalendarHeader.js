import * as React from "react";
import {
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Media,
  Row,
  UncontrolledDropdown,
} from "reactstrap";
import { formatCurrentDate } from "../../utils/calendar";

import AvailabilityWarning from "../Availability/AvailabilityWarning";

export default function CalendarHeader(props) {
  const {
    currentDate,
    setCurrentDate,
    selectedDoctor,
    onChangeDoctor,
    locationDoctors,
    handlePrevMonth,
    handleNextMonth,
    schedulesLength,
    setCreateNewSchedule,
  } = props;

  const [availabilityWarning, setAvailabilityWarning] = React.useState(false);

  React.useEffect(() => {
    if (selectedDoctor && !selectedDoctor.availability) {
      setAvailabilityWarning(true);
    }
  }, [selectedDoctor]);

  const handleDoctor = (e, doctor) => {
    e.preventDefault();
    onChangeDoctor(doctor);
  };

  return (
    <>
      <Row>
        <Col
          lg="auto"
          sm="auto"
          md="auto"
          className="d-flex flex-column align-items-start ml-2 mb-sm-3"
        >
          <h2 className="text-black">{formatCurrentDate(currentDate)}</h2>
          <small>
            Você possui <b className="text-custom-purple">{schedulesLength}</b>{" "}
            consulta{schedulesLength > 1 ? "s" : ""} esse mês
          </small>
        </Col>
        <Col className="d-flex flex-row align-items-center justify-content-sm-start justify-content-md-end">
          <Row className="align-items-center justify-content-lg-end">
            <Col lg="auto" sm="auto">
              <button
                onClick={setCreateNewSchedule}
                className="btn btn-medical  mr-2"
              >
                Cadastrar Nova Consulta
              </button>
            </Col>

            <Col
              lg="auto"
              sm="auto"
              className="d-flex flex-row align-items-center"
            >
              <button
                onClick={() => setCurrentDate(new Date())}
                className="btn btn-medical btn-hover-medical ml-lg-3 mr-2"
              >
                Esse Mês
              </button>

              <div className="arrow">
                <i
                  id="prevArrow"
                  onClick={handlePrevMonth}
                  className="fa-solid fa-chevron-left"
                ></i>
              </div>
              <div className="arrow">
                <i
                  id="nextArrow"
                  onClick={handleNextMonth}
                  className="fa-solid fa-chevron-right"
                ></i>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>

      {availabilityWarning && (
        <AvailabilityWarning
          open={availabilityWarning}
          doctor={selectedDoctor}
          onClose={() => setAvailabilityWarning(false)}
        />
      )}
    </>
  );
}
