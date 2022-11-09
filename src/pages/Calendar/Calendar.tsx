import * as React from "react";

import { Card, CardHeader, CardBody, Container, Row } from "reactstrap";

import Header from "../../components/Layouts/Header";
import CalendarHeader from "../../components/Calendar/CalendarHeader";
import CalendarComponent from "../../components/Calendar/ViewMonth/Calendar";
import CalendarScheduling from "../../components/Calendar/Schedules/CreateSchedule";

import api from "../../utils/axios";
import {
  getMonthFirstDayIndex,
  calcTotalDaysInMonth,
  getNextMonth,
  getPrevMonth,
  getMonthFirstDay,
  getLastMonthDay,
} from "../../utils/calendar";

import { getStoragedProfile } from "../../utils/caches";
import { usePropsContext } from "../..";

export default function Calendar() {
  const doctor = getStoragedProfile();

  const { showAlert, selectedLocationId }: any = usePropsContext();

  const [schedules, setSchedules] = React.useState<any>([]);

  /** Dates States */
  const [currentDate, setCurrentDate] = React.useState<Date>(new Date());
  const [initialDayIndex, setInitialDayIndex] = React.useState<number>(
    getMonthFirstDayIndex(new Date())
  );
  const [totalDaysInMonth, setTotalDaysInMonth] = React.useState<number>(
    calcTotalDaysInMonth(new Date())
  );

  /** Ui Components States */
  const [createSchedule, setCreateSchedule] = React.useState<boolean>(false);
  const [updateComponent, setUpdateComponent] = React.useState<number>(0);

  React.useMemo(() => {
    (async () => {
      try {
        const initial_date = getMonthFirstDay(currentDate);
        const final_date = getLastMonthDay(currentDate);

        const { data } = await api.get(
          `/doctors/${doctor.id}/${selectedLocationId}/schedules?initial_date=${initial_date}&final_date=${final_date}`
        );

        if (data.response.length > 0) setSchedules(data.response);
      } catch (err) {
        showAlert({ open: true, type: "danger", message: err });
      }
    })();
  }, [currentDate, updateComponent]);

  const handlePrevMonth = () => {
    const prevMonth = getPrevMonth(currentDate);
    setCurrentDate(prevMonth);
    handleMonthIndex(prevMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = getNextMonth(currentDate);
    setCurrentDate(nextMonth);
    handleMonthIndex(nextMonth);
  };

  const handleMonthIndex = (currentDate: any) => {
    setInitialDayIndex(getMonthFirstDayIndex(currentDate));
    setTotalDaysInMonth(calcTotalDaysInMonth(currentDate));
  };

  const onRefreshCalendar = () => {
    setUpdateComponent(updateComponent + 1);
  };

  return (
    <>
      <Header />
      <Container className="mt--9" fluid>
        <Row>
          <div className="col">
            <Card id="calendar-card" className="shadow">
              <CardHeader className="border-0">
                <CalendarHeader
                  currentDate={currentDate}
                  setCurrentDate={setCurrentDate}
                  handlePrevMonth={handlePrevMonth}
                  handleNextMonth={handleNextMonth}
                  schedulesLength={schedules.length}
                  setCreateNewSchedule={() => setCreateSchedule(true)}
                />
              </CardHeader>
              <CardBody>
                <CalendarComponent
                  schedules={schedules}
                  currentDate={currentDate}
                  initialDayIndex={initialDayIndex}
                  totalDaysInMonth={totalDaysInMonth}
                />
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>

      {createSchedule && (
        <CalendarScheduling
          open={createSchedule}
          onClose={() => setCreateSchedule(false)}
          onRefreshCalendar={onRefreshCalendar}
        />
      )}
    </>
  );
}
