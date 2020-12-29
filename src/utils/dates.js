import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

const timeZone = 'America/Sao_Paulo';

export const formatDateTimeOutput = input => format(new Date(input), "dd/LLL/yy HH:mm", {locale: ptBR});

export const timeToLocal = datetime => utcToZonedTime(zonedTimeToUtc(datetime, 'utc'), timeZone);

export const strToDate = raw => parseISO(raw);

export const epochToShortDateOutput = input => format(new Date(input), "dd/LL/yy");
export const epochToDateOutput = input => format(new Date(input), "dd/LL/yyyy");

export function getFormattedDateTime(date = new Date()) {
  return `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${padLeadingZero(date.getMinutes())}:${padLeadingZero(date.getSeconds())}`;
}

export function padLeadingZero(value) {
  return value > 9 ? value : `0${value}`;
}

