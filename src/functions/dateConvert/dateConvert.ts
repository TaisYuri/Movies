import { format } from 'date-fns';

export function dateConvert(date: string): {
  formateDate: string;
  formatOnlyYear: string;
} {
  const ISOdateString = date;
  const formateDate = format(new Date(ISOdateString), 'dd-MM-yyyy');
  const formatOnlyYear = format(new Date(ISOdateString), 'yyyy');
  return { formateDate, formatOnlyYear };
}
