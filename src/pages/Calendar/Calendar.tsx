import * as React from "react";

import { Card, CardHeader, CardBody, Container, Row } from "reactstrap";

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

import { Schedules } from "../../interfaces/Schedules";

import { useAuth } from "../../context/AuthProvider";
import { useAlert } from "../../context/AlertProvider";
import { usePlaces } from "../../context/PlacesProvider";

export default function Calendar() {
  const { profile } = useAuth();
  const { showAlert } = useAlert();
  const { selectedLocation } = usePlaces();

  const [schedules, setSchedules] = React.useState<Schedules[]>([]);

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
          `/doctors/${profile?.id}/${selectedLocation?.id}/schedules?initial_date=${initial_date}&final_date=${final_date}`
        );

        if (data.response.length > 0) setSchedules(data.response);
      } catch (err) {
        showAlert({ open: true, message: "", type: "danger" });
      }
    })();
  }, [profile, selectedLocation, currentDate, updateComponent, showAlert]);

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
