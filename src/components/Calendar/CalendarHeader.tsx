import React from "react";
import { Col, Row } from "reactstrap";
import { formatCurrentDate } from "../../utils/calendar";

interface CalendarHeaderInterface {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  handlePrevMonth: () => void;
  handleNextMonth: () => void;
  schedulesLength: number;
  setCreateNewSchedule: () => void;
}

export default function CalendarHeader(props: CalendarHeaderInterface) {
  const {
    currentDate,
    setCurrentDate,
    handlePrevMonth,
    handleNextMonth,
    schedulesLength,
    setCreateNewSchedule,
  } = props;

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

              <div className="arrow" onClick={handlePrevMonth}>
                <i id="prevArrow" className="fa-solid fa-chevron-left" />
              </div>

              <div className="arrow" onClick={handleNextMonth}>
                <i id="nextArrow" className="fa-solid fa-chevron-right" />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* {availabilityWarning && (
        <AvailabilityWarning
          open={availabilityWarning}
          doctor={selectedDoctor}
          onClose={() => setAvailabilityWarning(false)}
        />
      )} */}
    </>
  );
}
