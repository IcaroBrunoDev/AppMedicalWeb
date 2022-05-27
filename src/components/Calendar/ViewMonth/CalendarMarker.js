import * as React from "react";

import CalendarViewSchedule from "../Schedules/ViewSchedule";

export default function CalendarMarker(props) {
  const { key, status, event_name, hour } = props;

  const [eventModal, setEventModal] = React.useState(false);

  const markerBackground = (status) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-medical";
      case "PENDING":
        return "bg-warning";
      case "CANCELED":
        return "bg-danger";
      default:
        return "bg-danger";
    }
  };

  return (
    <>
      <div
        key={key}
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
          <i class="fa-solid fa-clock-rotate-left text-white mr-1"></i>
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
