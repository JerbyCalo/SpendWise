import {
  format,
  parseISO,
  startOfMonth,
  endOfMonth,
  isWithinInterval,
} from "date-fns";

export const getCurrentMonth = () => format(new Date(), "yyyy-MM");

export const isInMonth = (dateString, yearMonth) => {
  const date = parseISO(dateString);
  const [year, month] = yearMonth.split("-").map(Number);
  const ref = new Date(year, month - 1, 1);
  return isWithinInterval(date, {
    start: startOfMonth(ref),
    end: endOfMonth(ref),
  });
};

export const formatDisplayDate = (dateString) =>
  format(parseISO(dateString), "MMM d, yyyy");
