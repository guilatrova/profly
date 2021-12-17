import {
  format,
  parseISO,
  startOfToday,
  subDays,
  subMonths,
  subYears,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';

const timeZone = 'America/Sao_Paulo';

export const formatDateTimeOutput = (input) =>
  format(new Date(input), 'dd/LLL/yy HH:mm', { locale: ptBR });
export const formatShortDateTimeOutput = (input) =>
  format(new Date(input), 'dd/LL/yyyy HH:mm');
export const formatShortTimeOutput = (input) =>
  format(new Date(input), 'HH:mm');

export const timeToLocal = (datetime) =>
  utcToZonedTime(zonedTimeToUtc(datetime, 'utc'), timeZone);

export const strToDate = (raw) => parseISO(raw);

export const epochToShortDateOutput = (input) =>
  format(new Date(input), 'dd/LL/yy');
export const epochToDateOutput = (input) =>
  format(new Date(input), 'dd/LL/yyyy');

export function getFormattedDateTime(date = new Date()) {
  return `${
    date.getMonth() + 1
  }/${date.getDate()} ${date.getHours()}:${padLeadingZero(
    date.getMinutes()
  )}:${padLeadingZero(date.getSeconds())}`;
}

export function padLeadingZero(value) {
  return value > 9 ? value : `0${value}`;
}

export const subPeriod = (period) => {
  const days = /^\d+d$/.test(period) ? period.replace('d', '') : 0;
  const months = period.endsWith('mo') ? period.replace('mo', '') : 0;
  let years = 0;

  if (period.endsWith('y')) {
    years = period.replace('y', '');
  } else if (period == 'ytd') {
    years = 1;
  } else if (period == 'max') {
    years = 10;
  }

  let date = startOfToday();
  date = subDays(date, days);
  date = subMonths(date, months);
  date = subYears(date, years);

  return date;
};
