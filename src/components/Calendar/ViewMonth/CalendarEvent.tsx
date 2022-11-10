import * as React from "react";

import CalendarViewSchedule from "../Schedules/ViewSchedule";

export enum EventStatus {
  confirmed = "CONFIRMED",
  pending = "PENDING",
  canceled = "CANCELED",
}

interface CalendarEvent {
  status: EventStatus;
  event_name: string;
  hour: string;
}

export default function CalendarEvent(props: CalendarEvent) {
  const { status, event_name, hour } = props;

  const [eventModal, setEventModal] = React.useState(false);

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
          {...props}
          onOpen={eventModal}
          onClose={() => setEventModal(false)}
        />
      )}
    </>
  );
}
