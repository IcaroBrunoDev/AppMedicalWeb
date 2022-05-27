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
  const [selectedDoctor, setSelectedDoctor] = React.useState<any>(null);
  const [locationDoctors, setLocationDoctors] = React.useState([]);

  /** Dates States */
  const [currentDate, setCurrentDate] = React.useState<any>(new Date());
  const [initialDayIndex, setInitialDayIndex] = React.useState<any>(undefined);
  const [totalDaysInMonth, setTotalDaysInMonth] = React.useState<any>(null);

  /** Ui Components States */
  const [createSchedule, setCreateSchedule] = React.useState<boolean>(false);

  const [updateComponent, setUpdateComponent] = React.useState(false);

  React.useEffect(() => {
    setInitialDayIndex(getMonthFirstDayIndex(currentDate));
    setTotalDaysInMonth(calcTotalDaysInMonth(currentDate));
  }, [currentDate]);

  React.useEffect(() => {
    const getDoctorSchedules = async () => {
      try {
        const initial_date = getMonthFirstDay(currentDate);
        const final_date = getLastMonthDay(currentDate);

        const { data } = await api.get(
          `/doctors/${doctor.id}/${selectedLocationId}/schedules?initial_date=${initial_date}&final_date=${final_date}`
        );

        setSchedules(data.response);
      } catch (err) {
        showAlert({ open: true, type: "danger", message: err });
      }
    };

    getDoctorSchedules();
  }, [currentDate]);

  const handlePrevMonth = () => {
    const prevMonth = getPrevMonth(currentDate);
    setCurrentDate(prevMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = getNextMonth(currentDate);
    setCurrentDate(nextMonth);
  };

  const createShedule = () => {
    setCreateSchedule(true);
  };

  const onRefreshCalendar = () => {
    setUpdateComponent(!updateComponent);
  };

  const onChangeDoctor = (doctor: any | null) => {
    setSelectedDoctor(doctor ?? null);
  };

  return (
    <React.Suspense>
      <Header />
      <Container className="mt--9" fluid>
        <Row>
          <div className="col">
            <Card id="calendar-card" className="shadow">
              <CardHeader className="border-0">
                <CalendarHeader
                  currentDate={currentDate}
                  setCurrentDate={setCurrentDate}
                  selectedDoctor={selectedDoctor}
                  onChangeDoctor={onChangeDoctor}
                  locationDoctors={locationDoctors}
                  handlePrevMonth={handlePrevMonth}
                  handleNextMonth={handleNextMonth}
                  schedulesLength={schedules.length}
                  setCreateNewSchedule={createShedule}
                />
              </CardHeader>
              <CardBody>
                <CalendarComponent
                  schedules={schedules}
                  currentDate={currentDate}
                  selectedDoctor={selectedDoctor}
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
          selectedDoctor={selectedDoctor}
          onClose={() => setCreateSchedule(false)}
          onRefreshCalendar={onRefreshCalendar}
        />
      )}
    </React.Suspense>
  );
}
