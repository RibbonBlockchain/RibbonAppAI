export const formatNumberWithCommas = (num: number): string => {
  let formattedNumber: string;
  let unit: string;

  if (num >= 1_000_000_000) {
    formattedNumber = (num / 1_000_000_000).toFixed(2);
    unit = "B";
  } else if (num >= 1_000_000) {
    formattedNumber = (num / 1_000_000).toFixed(2);
    unit = "M";
  } else if (num >= 1_000) {
    formattedNumber = (num / 1_000).toFixed(2);
    unit = "K";
  } else {
    formattedNumber = num.toFixed(2);
    unit = "";
  }

  const [integer, decimal] = formattedNumber.split(".");
  const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return decimal
    ? `${formattedInteger}.${decimal} ${unit}`
    : `${formattedInteger} ${unit}`;
};
