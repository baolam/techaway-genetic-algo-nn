import { checkIsNum } from './num.utils';

export const formatTime = (time: Date) => {
  return time.toLocaleString();
};

export const buildTime = (time: Date) => {
  let hour: string | number = time.getHours();
  let minute: string | number = time.getMinutes();
  let second: string | number = time.getSeconds();
  if (0 <= hour && hour <= 9) hour = `0${hour}`;
  if (0 <= minute && minute <= 9) minute = `0${minute}`;
  if (0 <= second && second <= 9) second = `0${second}`;
  return `${hour}:${minute}:${second}`;
};

export const buildDay = (time: Date) => {
  let date: string | number = time.getDate();
  let month: string | number = time.getMonth();
  let year = time.getFullYear();

  month++;
  if (0 <= month && month <= 9) month = `0${month}`;
  if (0 <= date && date <= 9) date = `0${date}`;

  return `${year}-${month}-${date}`;
};

export const getTime = (time: string) => {
  // hh:mm:ss
  let preprocess = time.split(':').map((item) => parseInt(item));
  return {
    hour: preprocess[0],
    minute: preprocess[1],
    second: preprocess[2],
  };
};

export const getDay = (time: string) => {
  // yyyy-mm-date
  let preprocess = time.split('-').map((item) => parseInt(item));
  return {
    year: preprocess[0],
    month: preprocess[1],
    date: preprocess[2],
  };
};

export const getDate = (time: string, day: string) => {
  let { hour, minute, second } = getTime(time);
  let { year, month, date } = getDay(day);

  let mDate = new Date();
  mDate.setFullYear(year);
  mDate.setMonth(month - 1);
  mDate.setDate(date);
  mDate.setHours(hour);
  mDate.setMinutes(minute);
  mDate.setSeconds(second);

  return mDate;
};

export const showSpecificDays = (specificDays: string[]) => {
  let output = '';
  for (let i = 0; i < specificDays.length; i++) {
    let specificDay = specificDays[i];
    let tmp = specificDay.split('-');
    let out = `${tmp[2]}/${tmp[1]}/${tmp[0]}`;
    output = output + out + ',';
  }
  output = output.substring(0, output.length - 1);
  return output;
};

export const convertSpecificDays = (
  specificDays: string
): string[] | boolean => {
  let output = [];
  let _specificDays = specificDays.split(',');
  for (let i = 0; i < _specificDays.length; i++) {
    let specificDay = _specificDays[i];
    let tmp = specificDay.split('/');
    if (tmp.length !== 3) return false;
    if (!checkIsNum(tmp)) return false;
    output.push(`${tmp[2]}-${tmp[1]}-${tmp[0]}`);
  }
  return output;
};

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
