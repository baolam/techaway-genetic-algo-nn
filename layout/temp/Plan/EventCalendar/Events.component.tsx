import React, { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useAppDispatch, useAppSelector } from '../../../src/hooks/redux.hook';
import {
  fetchTodos,
  markFinish,
  MarkTodoState,
  setOpenModalState,
  TodoItem,
} from './EventStore';
import { updateTodo } from './EventAPI';
import EventTodo from './EventTodo';

const decodeMark = (mark: MarkTodoState) => {
  if (mark === MarkTodoState.NORMAL) return 'Bình thường';
  if (mark === MarkTodoState.IMPORTANT) return 'Quan trọng';
  return 'Khẩn cấp';
};

const EventCalendar = () => {
  const events = useAppSelector((state) => state.plan.events);
  const todos = useAppSelector((state) => state.todo.todos);
  const status = useAppSelector((state) => state.todo.fetchState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === 'idle') dispatch(fetchTodos());
  }, [status, dispatch]);

  const onFinishTodo = (item: TodoItem) => {
    item = { ...item, isFinished: true };
    updateTodo(item)
      .then((resp) => {
        dispatch(markFinish());
      })
      .catch((err) => {});
  };

  const onAddTodo = () => {
    dispatch(setOpenModalState(true));
  };

  return (
    <div>
      <h2 className="text-center">Todo-List</h2>
      <h6 className="text-center text-muted">
        Nhấn chuột 2 lần để đánh dấu hoàn thành
      </h6>
      <div className="d-grid gap-2">
        <Button variant="outline-success" onClick={onAddTodo}>
          Thêm todo
        </Button>
      </div>
      <hr />
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Tiêu đề</th>
            <th>Tính chất</th>
            <th>Ghi chú</th>
          </tr>
        </thead>
        <tbody>
          {todos.length === 0 && (
            <tr>
              <td colSpan={5}>Không có</td>
            </tr>
          )}
          {todos.length !== 0 &&
            todos.map((todo, idx) => {
              return (
                <tr key={todo.id} onDoubleClick={() => onFinishTodo(todo)}>
                  <td>{idx + 1}</td>
                  <td>{todo.title}</td>
                  <td>{decodeMark(todo.mark)}</td>
                  <td>{todo.description}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <hr />
      <EventTodo eventTodos={events} />
    </div>
  );
};

export default EventCalendar;
