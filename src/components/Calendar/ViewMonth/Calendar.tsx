import * as React from "react";

import CalendarEvent from "./CalendarEvent";

import { daysOfWeek } from "../../../utils/constants";
import { filterMonthEvents } from "../../../utils/calendar";

import { Schedules } from "../../../interfaces/Schedules";

interface CalendarComponentInterface {
  schedules: Schedules[];
  currentDate: Date;
  initialDayIndex: number;
  totalDaysInMonth: number;
}

function CalendarComponent(props: CalendarComponentInterface) {
  const { schedules, currentDate, initialDayIndex, totalDaysInMonth } = props;

  const renderCorrectDays = (currentIndex: number) => {
    return tableColumn(currentIndex, initialDayIndex);
  };

  const tableColumn = (currentIndex: number, dayIndex: number) => {
    const today = new Date();

    return currentIndex === dayIndex ? (
      <tr key={currentIndex}>
        <td>
          <div
            className={`${
              isActiveDay(today, currentIndex) ? "active" : ""
            } mb-2`}
          >
            <span>{1}</span>
          </div>
        </td>
      </tr>
    ) : currentIndex > dayIndex ? (
      <tr key={currentIndex}>
        <td key={currentIndex}>
          <div
            className={`${
              isActiveDay(today, currentIndex) ? "active" : ""
            } mb-2`}
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
          ).map((schedule, index) => (
            <CalendarEvent key={index} schedule={schedule} />
          ))}
        </td>
      </tr>
    ) : (
      <tr key={currentIndex}>
        <td key={currentIndex} className="empty-td"></td>
      </tr>
    );
  };

  const isActiveDay = (today: Date, currentIndex: number) => {
    if (
      today.getDate() === currentIndex + 1 - initialDayIndex &&
      today.getMonth() === currentDate.getMonth() &&
      today.getFullYear() === currentDate.getFullYear()
    ) {
      return true;
    }
    return false;
  };

  return totalDaysInMonth ? (
    <>
      <div className="month_calendar_table">
        <table>
          <thead>
            {daysOfWeek.map((day, index) => (
              <tr key={index}>
                <th>{day.name}</th>
              </tr>
            ))}
          </thead>
          <tbody>
            {new Array(totalDaysInMonth + initialDayIndex)
              .fill(1)
              .map((_, index) => renderCorrectDays(index))}
          </tbody>
        </table>
      </div>
    </>
  ) : (
    <></>
  );
}

export default React.memo(CalendarComponent);
