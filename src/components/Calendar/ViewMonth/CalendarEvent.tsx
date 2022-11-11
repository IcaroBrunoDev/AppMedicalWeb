import * as React from "react";
import { Schedules } from "../../../interfaces/Schedules";

import CalendarViewSchedule from "../ScheduleDetails";

export enum EventStatus {
  confirmed = "CONFIRMED",
  pending = "PENDING",
  canceled = "CANCELED",
}

interface CalendarEventInterface {
  schedule: Schedules;
}

export default function CalendarEvent({ schedule }: CalendarEventInterface) {
  const { status, event_name, hour } = schedule;

  const [eventModal, setEventModal] = React.useState<boolean>(false);

  const markerBackground = (status: EventStatus) => {
    switch (status) {
      case EventStatus.confirmed:
        return "bg-medical";
      case EventStatus.pending:
        return "bg-warning";
      case EventStatus.canceled:
        return "bg-danger";
      default:
        return "bg-danger";
    }
  };

  return (
    <>
      <div
        key={`${event_name}_${hour}`}
        className={`w-100 calendar-marker justify-content-between py-1 px-1 text-left ${markerBackground(
          status
        )}`}
        onClick={() => setEventModal(true)}
      >
        <div className="d-flex flex-row align-items-center text-start">
          <i
            id="circle-status"
            className="fa-solid fa-circle text-white mr-1"
          ></i>
          <span className="text-white">{event_name}</span>
        </div>

        <div>
          <i className="fa-solid fa-clock-rotate-left text-white mr-1"></i>
          <span className="text-white">{hour}</span>
        </div>
      </div>

      {eventModal && (
        <CalendarViewSchedule
          schedule={schedule}
          onOpen={eventModal}
          onClose={() => setEventModal(false)}
        />
      )}
    </>
  );
}
