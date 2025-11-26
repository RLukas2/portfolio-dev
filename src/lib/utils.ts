import clsx, { type ClassValue } from 'clsx';
import { format, parseISO } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { twMerge } from 'tailwind-merge';


/**
 * Combines class names conditionally and merges Tailwind CSS classes.
 *
 * @param {...ClassValue[]} classes - The class names to combine.
 * @returns {string}  The combined and merged class names.
 */
export const cn = (...classes: ClassValue[]): string => twMerge(clsx(classes));


/**
 * Formats a date string into a specified format (default is 'MMMM dd, yyyy').
 *
 * @param {string} date - The date string to format.
 * @param {string} [dateFormat='MMMM dd, yyyy']  - The desired date format.
 * @returns {*} The formatted date string.
 */
export const formatDate = (
  date: string,
  dateFormat: string = 'MMMM dd, yyyy',
) => format(toZonedTime(parseISO(date), 'Asia/Jakarta'), dateFormat);


/**
 * Trims a string to a specified maximum length and appends ellipsis if necessary.
 *
 * @param {?string} [text] - The text to trim.
 * @param {number} [maxLength=20] - The maximum length of the trimmed text.
 * @returns {string} The trimmed text with ellipsis if it exceeds the maximum length.
 */
export const trim = (text?: string, maxLength: number = 20): string =>
  (text && text.slice(0, maxLength) + (text.length > maxLength ? '...' : '')) ??
  '';


/**
 *  Generates the full path for a content image based on the provided path and image name.
 *
 * @param {string} path  - The base path for the content image.
 * @param {?string} [image]  - The image file name or URL.
 * @returns {string} The full path to the content image.
 */
export const getContentImagePath = (path: string, image?: string): string => {
  if (image)
    return image.startsWith('http') ? image : `/media/${path}/${image}`;

  return '';
};

export const randomBetween = (min: number, max: number): number =>
  Math.random() * (max - min) + min;
