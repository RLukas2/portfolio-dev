import { differenceInMonths, differenceInYears } from 'date-fns';
import { format } from 'date-fns-tz';

export interface TimelineEntryProps {
  startDate: string;
  endDate: string | null;
}

/**
 * Calculates the duration between two dates and returns the start date, end date,
 * and a formatted duration string.
 *
 * @param {string} startDate - The start date in string format.
 * @param {(string | null)} endDate - The end date in string format or null for ongoing.
 * @returns {{ start: any; end: any; durationText: string; }} - An object containing the start date, end date, and duration text.
 */
export const calculateDuration = (
  startDate: string,
  endDate: string | null,
) => {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();

  const durationInYears = differenceInYears(end, start);
  const durationInMonths = differenceInMonths(end, start) % 12;

  let durationText = '';

  if (durationInYears > 0) {
    durationText += `${durationInYears} yr${durationInYears > 1 ? 's' : ''} `;
  }

  if (durationInMonths > 0 || durationInYears === 0) {
    durationText += `${durationInMonths} mo${durationInMonths > 1 ? 's' : ''}`;
  }

  return { start, end, durationText };
};

export const formatDateRange = (start: Date, endDate: string | null) => {
  const startFormatted = format(start, 'MMM yyyy');
  const endFormatted = endDate
    ? format(new Date(endDate), 'MMM yyyy')
    : 'Present';

  return `${startFormatted} - ${endFormatted}`;
};
