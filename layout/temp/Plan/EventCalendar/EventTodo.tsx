import React from 'react';
import { Table } from 'react-bootstrap';
import { PlanItem } from '../Calendar/CalendarStore';

interface EventTodoProps {
  eventTodos: PlanItem[];
}

const EventTodo: React.FC<EventTodoProps> = (props) => {
  const events = props.eventTodos;
  return (
    <>
      <h2 className="text-center">Bảng sự kiện</h2>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Tiêu đề</th>
            <th>Thời gian</th>
            <th>Tính chất</th>
            <th>Ghi chú</th>
          </tr>
        </thead>
        <tbody>
          {events.length === 0 && (
            <tr>
              <td colSpan={5}>Chưa có dữ liệu</td>
            </tr>
          )}
          {events.length !== 0 &&
            events.map((event, idx) => {
              return (
                <tr key={idx + 1}>
                  <td>{idx + 1}</td>
                  <td>{event.title}</td>
                  <td>{event.timeInDay}</td>
                  <td>{event.isRepeatable ? 'Lặp lại' : 'Một lần'}</td>
                  <td>{event.description}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </>
  );
};

export default EventTodo;
