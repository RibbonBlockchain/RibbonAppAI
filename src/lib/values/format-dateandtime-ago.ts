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

export const formatOrderDate = (isoDate: string): string => {
  const date = new Date(isoDate);

  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  const formattedDate = date.toLocaleDateString("en-US", options);
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "pm" : "am";
  const formattedTime = `${hours % 12 || 12}:${minutes}${ampm}`;

  return `${formattedDate} at ${formattedTime}`;
};
