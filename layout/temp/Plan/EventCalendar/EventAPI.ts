import axiosClient from '../../../src/config/axiosClient';
import { TodoItem } from './EventStore';

export const getTodos = () => {
  return new Promise<TodoItem[]>((resolve, reject) => {
    axiosClient
      .get('/todos')
      .then((resp: any) => resolve(resp))
      .catch((err) => reject(err));
  });
};

export const updateTodo = (todo: TodoItem) => {
  return new Promise((resolve, reject) => {
    axiosClient
      .put(`/todos/${todo.id}`, todo)
      .then((resp: any) => {
        if (resp.err) reject(resp.msg);
        else resolve(resp.msg);
      })
      .catch((err) => reject(err));
  });
};

export const createTodo = (todo: any) => {
  return new Promise((resolve, reject) => {
    axiosClient
      .post('/todos', todo)
      .then((resp: any) => {
        if (resp.err) reject(resp.msg);
        else resolve(resp.msg);
      })
      .catch((err) => reject(err));
  });
};
