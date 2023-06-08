import { format } from 'date-fns';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
export function dateConvert(date: string): {
  formateDate: string;
  formatOnlyYear: string;
  elapsedTime: string;
} {
  const ISOdateString = date;
  const formateDate = format(new Date(ISOdateString), 'dd-MM-yyyy');
  const formatOnlyYear = format(new Date(ISOdateString), 'yyyy');
  const elapsedTime = formatDistanceToNow(new Date(ISOdateString));
  return { formateDate, formatOnlyYear, elapsedTime };
}

export function dateIsValid(date: string): boolean {
  return !Number.isNaN(new Date(date).getTime());
}
