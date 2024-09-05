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
