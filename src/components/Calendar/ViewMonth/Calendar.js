import * as React from "react";

import { daysOfWeek } from "../../../utils/constants";
import {
  filterMonthEvents,
  formateDateToString,
} from "../../../utils/calendar";

import CalendarMarker from "./CalendarMarker";
import CalendarScheduling from "../Schedules/CreateSchedule";

export default function CalendarComponent(props) {
  const {
    schedules,
    currentDate,
    selectedDoctor,
    initialDayIndex,
    totalDaysInMonth,
  } = props;

  const [createSchedule, setCreateSchedule] = React.useState({
    open: false,
    date: null,
  });

  const renderCorrectDays = (currentIndex) => {
    return tableColumn(currentIndex, initialDayIndex);
  };

  const tableColumn = (currentIndex, dayIndex) => {
    const today = new Date();

    return currentIndex === dayIndex ? (
      <td
        onClick={() =>
          setCreateSchedule({ open: true, date: formateDateToString(today) })
        }
      >
        <div
          className={`${isActiveDay(today, currentIndex) ? "active" : ""} mb-2`}
        >
          <span>{1}</span>
        </div>
      </td>
    ) : currentIndex > dayIndex ? (
      <td>
        <div
          className={`${isActiveDay(today, currentIndex) ? "active" : ""} mb-2`}
        >
          <span>
            {dayIndex > 1 && currentIndex - (dayIndex - 1)}
            {/** Excessão para quando os dias iniciais forem 1, o currentIndex aqui tem ovalor de 2 */}
            {dayIndex === 1 && currentIndex}
            {/** Excessão para quando os dias iniciais forem 0, o currentIndex aqui tem o valor de 1 */}
            {dayIndex === 0 && currentIndex + 1}
          </span>
        </div>

        {filterMonthEvents(
          schedules,
          currentDate,
          currentIndex + 1 - initialDayIndex
        ).map((event, index) => (
          <CalendarMarker key={index} {...event} />
        ))}
      </td>
    ) : (
      <td className="empty-td"></td>
    );
  };

  const isActiveDay = (today, currentIndex) => {
    if (
      today.getDate() === currentIndex + 1 - initialDayIndex &&
      today.getMonth() === currentDate.getMonth() &&
      today.getFullYear() === currentDate.getFullYear()
    ) {
      return true;
    }
    return false;
  };

  const isActiveDoctorDay = (day) => {
    if (selectedDoctor && selectedDoctor.availability) {
      const keys = Object.keys(selectedDoctor.availability.availabilitie);

      const isActive = keys.find((element) => element === day.objectName);

      if (isActive) {
        return true;
      }

      return false;
    }
    return false;
  };

  return totalDaysInMonth ? (
    <>
      <div className="month_calendar_table">
        <table>
          <thead>
            {daysOfWeek.map((day, index) => (
              <th
                key={index}
                className={
                  isActiveDoctorDay(day) ? "bg-medical text-white" : ""
                }
              >
                {day.name}{" "}
              </th>
            ))}
          </thead>
          <tbody>
            {new Array(totalDaysInMonth + initialDayIndex)
              .fill(1)
              .map((_, index) => renderCorrectDays(index))}
          </tbody>
        </table>
      </div>

      {createSchedule.open && (
        <CalendarScheduling
          open={createSchedule.open}
          onClose={() => setCreateSchedule({ open: false, date: null })}
        />
      )}
    </>
  ) : (
    <></>
  );
}
