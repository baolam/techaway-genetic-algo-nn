import { buildDay, getDate } from '@Utils/time.utils';
import { PlanItem } from './CalendarStore';

export const addPropertyEvent = (event: PlanItem) => {
  let start = new Date();
  let end = new Date();
  let infor = {
    start,
    end,
    allDay: event.isRepeatable,
    resource: event.description,
    ...event,
  };

  if (event.isRepeatable) {
    return infor;
  }

  if (event.specificDays.length === 0)
    start = getDate(event.timeInDay, buildDay(new Date()));
  if (event.specificDays.length > 0) {
    start = getDate(event.timeInDay, event.specificDays[0]);
    end = getDate(event.timeInDay, event.specificDays[0]);
  }
  if (event.specificDays.length > 1) {
    end = getDate(event.timeInDay, event.specificDays[-1]);
  }

  infor.start = start;
  infor.end = end;

  return infor;
};
