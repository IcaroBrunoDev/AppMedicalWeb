export const formatCurrentDate = (currentDate: any) => {
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  switch (month) {
    case 0:
      return `Janeiro de ${year}`;
    case 1:
      return `Fevereiro de ${year}`;
    case 2:
      return `Março de ${year}`;
    case 3:
      return `Abril de ${year}`;
    case 4:
      return `Maio de ${year}`;
    case 5:
      return `Junho de ${year}`;
    case 6:
      return `Julho de ${year}`;
    case 7:
      return `Agosto de ${year}`;
    case 8:
      return `Setembro de ${year}`;
    case 9:
      return `Outubro de ${year}`;
    case 10:
      return `Novembro de ${year}`;
    case 11:
      return `Dezembro de ${year}`;
  }
};

export const getMonthFirstDay = (currentDate: any) => {
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const firstMonthDay: any = new Date(currentYear, currentMonth, 1);

  return formateDateToString(firstMonthDay);
};

export const getLastMonthDay = (currentDate: any) => {
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const lastMonthDay: any = new Date(currentYear, currentMonth + 1, 0);

  return formateDateToString(lastMonthDay);
};

export const getMonthFirstDayIndex = (currentDate: any) => {
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const firstMonthDay = new Date(currentYear, currentMonth, 1);
  const firstDayIndex = firstMonthDay.getDay();

  return firstDayIndex;
};

export const calcTotalDaysInMonth = (currentDate: any) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const totaldays = new Date(year, month, 0).getDate();

  return totaldays;
};

export const getPrevMonth = (currentDate: any) => {
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const firstMonthDay = new Date(currentYear, currentMonth - 1, 1);

  return firstMonthDay;
};

export const getNextMonth = (currentDate: any) => {
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const firstMonthDay = new Date(currentYear, currentMonth + 1, 1);

  return firstMonthDay;
};

export const filterMonthEvents = (
  data: any,
  currentDate: any,
  currentDay: any
) => {
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const current_date = new Date(year, month, currentDay, 0, 0, 0, 0);

  let events: any[] = [];

  data.forEach((schedule: any) => {
    const formated_date = formateStringToDate(schedule.date);

    if (formated_date.valueOf() === current_date.valueOf()) {
      events.push(schedule);
    }
  });

  return events;
};

export const formateStringToDate = (string: any) => {
  const split_time = string.split("-");

  const formated_date = new Date(
    parseInt(split_time[0]),
    parseInt(split_time[1]) - 1,
    parseInt(split_time[2]),
    0,
    0,
    0
  );

  return formated_date;
};

export const formateDateToString = (date: any, format?: any) => {
  const current_date = new Date(date);

  let day: any = current_date.getDate();
  let month: any = current_date.getMonth() + 1;
  const year: any = current_date.getFullYear();

  day = day < 10 ? "0" + day : day;
  month = month < 10 ? "0" + month : month;

  switch (format) {
    case "PT":
      return day + "/" + month + "/" + year;

    default:
      return year + "-" + month + "-" + day;
  }
};

export const formatHour = (hour: any, start_hour: any) => {
  const formated =
    hour + start_hour < 10
      ? "0" + (hour + start_hour) + ":00"
      : hour + start_hour + ":00";

  return formated;
};
