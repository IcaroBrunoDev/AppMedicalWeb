export const phoneFormatter = (phone: string) => {
  const cleaned = ("" + phone).replace(/\D/g, "");

  const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);

  if (match) {
    return "(" + match[1] + ") " + match[2] + "-" + match[3];
  }

  return null;
};

export const formatDate = (date: string) => {
  const newDate = new Date(date);

  let day: any = newDate.getDate();
  let month: any = newDate.getMonth() + 1;
  const year: any = newDate.getFullYear();

  day = day < 10 ? `0${day}` : day;
  month = month < 10 ? `0${month}` : month;

  return `${day}/${month}/${year}`;
};
