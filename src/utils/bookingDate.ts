const DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;
const TIME_PATTERN = /^([01]\d|2[0-3]):([0-5]\d)$/;

export function parseBookingDate(value: string): Date | null {
  const match = DATE_PATTERN.exec(value.trim());
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  date.setHours(0, 0, 0, 0);
  return date;
}

export function validateBookingDateTime(
  dateValue: string,
  timeValue: string,
  now: Date = new Date(),
): string | null {
  const date = parseBookingDate(dateValue);
  if (!date) return 'Enter a valid date in YYYY-MM-DD format.';

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  if (date < today) return 'The booking date cannot be in the past.';

  const timeMatch = TIME_PATTERN.exec(timeValue.trim());
  if (!timeMatch) return 'Enter a valid time in 24-hour HH:mm format.';

  if (date.getTime() === today.getTime()) {
    const hours = Number(timeMatch[1]);
    const minutes = Number(timeMatch[2]);
    const bookingTime = new Date(date);
    bookingTime.setHours(hours, minutes, 0, 0);

    if (bookingTime <= now) return 'Choose a time later than the current time.';
  }

  return null;
}

export function formatDateForInput(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatBookingDate(value: string): string {
  const date = parseBookingDate(value);
  return date
    ? date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
    : value;
}
