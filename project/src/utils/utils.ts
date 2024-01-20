import { Class } from "../types/types";
import { modulestoClasses } from "./data";
import { parseLink } from "./links";

export const linkToClasses = (link: string): Class[] => {
  return modulestoClasses(parseLink(link));
};

export const formatISODateToAMPM = (isoDate: string): string => {
  const date = new Date(isoDate);

  // Get hours and minutes
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Determine if it's AM or PM
  const ampm = hours >= 12 ? "pm" : "am";

  // Convert hours to 12-hour format
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

  // Add leading zero to minutes if needed
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();

  // Construct the formatted time string
  const formattedTime = `${formattedHours}:${formattedMinutes} ${ampm}`;

  return formattedTime;
};
