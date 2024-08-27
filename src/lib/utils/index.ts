import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";
import toast from "react-hot-toast";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getOrdinalIndicator(day: number): string {
  const suffixes = ["st", "nd", "rd", "th"];

  // Handle special cases for 11, 12, and 13
  if (day === 11 || day === 12 || day === 13) {
    return `${day}${suffixes[3]}`;
  }

  const remainder = day % 10;
  const suffix = suffixes[remainder - 1] || suffixes[3]; // Default to "th" for other cases

  return `${day}${suffix}`;
}

export const copyToClipboard = (text: any, successMessage: () => void) => {
  navigator.clipboard
    .writeText(text)
    .then(successMessage)
    .catch((error) => {
      toast.error("Error copying text: ", error);
    });
};
