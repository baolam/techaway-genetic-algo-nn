import React, { useEffect } from 'react';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { useAppDispatch, useAppSelector } from '@Hooks/redux.hook';
import { initalize, selectSlot } from './CalendarStore';

const localizer = momentLocalizer(moment);

const ShowCalendar = () => {
  const events: any = useAppSelector((state) => state.plan.events);
  const status = useAppSelector((state) => state.plan.fetchState);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(initalize());
    }
  }, [status, dispatch]);

  const onSelect = (slotInfo: any) => {
    dispatch(selectSlot(slotInfo));
  };

  const onSelectEvent = (slotInfo: any) => {
    dispatch(selectSlot(slotInfo));
  };

  return (
    <>
      <h3 className="text-center">Lịch biểu</h3>
      {status === 'loading' && (
        <h3 className="text-center">Đang tải dữ liệu kế hoạch</h3>
      )}
      {status === 'succeeded' && (
        <div style={{ height: 500 }}>
          <Calendar
            selectable={true}
            onSelectSlot={onSelect}
            onSelectEvent={onSelectEvent}
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
          />
        </div>
      )}
    </>
  );
};

export default ShowCalendar;
