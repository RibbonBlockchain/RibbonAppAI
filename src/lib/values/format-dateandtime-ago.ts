import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { format, isToday, parseISO } from "date-fns";

export const formatDateAndTimeAgo = (dateTimeString: string) => {
  dayjs.extend(relativeTime);

  const date = dayjs(dateTimeString);
  const formattedDate = date.format("D MMM, YYYY");
  const timeAgo = date.fromNow();
  const result = {
    formattedDate,
    relativeTime: timeAgo,
  };

  return result;
};

export const formatStatusDate = (dateString: string): string => {
  const date = parseISO(dateString);

  if (isToday(date)) {
    return format(date, "Today, h:mm a");
  }
  return format(date, "MMM d, yyyy, h:mm a");
};

export const formatDateTime = (
  timestamp: string
): { date: string; time: string } => {
  const date = new Date(timestamp);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
  const [datePart, timePart] = formattedDate.split(", ");

  return {
    date: datePart.replace(/\//g, "-"),
    time: timePart,
  };
};
