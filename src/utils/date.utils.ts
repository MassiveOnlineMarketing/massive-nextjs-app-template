import { DayOfWeek } from "../entities/models/google-keyword-tracker";

/**
* Returns the day of the week for a given date.
* @param date - The date for which to get the day of the week.
* @returns The day of the week as a string.
*/
export function getDayOfTheWeek(date: Date): DayOfWeek {
 const days: DayOfWeek[] = [
   "SUNDAY",
   "MONDAY",
   "TUESDAY",
   "WEDNESDAY",
   "THURSDAY",
   "FRIDAY",
   "SUNDAY",
 ];
 return days[date.getDay()];
}