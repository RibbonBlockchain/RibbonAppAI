export const formatDate = (
  dateString: Date | undefined
): string | undefined => {
  if (!dateString) {
    return undefined;
  }

  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);

  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
};

export const formatActiveDate = (dateString: string) => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);

  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
};

export const formatLastTrainedDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  return date?.toLocaleString("en-US", options);
};

export const formatTime = (dateString: string): string => {
  const date = new Date(dateString);

  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;

  minutes = minutes < 10 ? 0 + minutes : minutes;

  return `${hours}:${minutes < 10 ? "0" + minutes : minutes} ${ampm}`;
};

export const formatCustomDate = (dateString: string): string => {
  const date = new Date(dateString);

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};
