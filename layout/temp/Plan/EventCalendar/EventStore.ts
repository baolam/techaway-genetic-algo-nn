import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getTodos } from './EventAPI';

export enum MarkTodoState {
  EMERGENCY = 'EMERGENCY',
  IMPORTANT = 'IMPORTANT',
  NORMAL = 'NORMAL',
}

export interface TodoItem {
  id: string;
  mark: MarkTodoState;
  title: string;
  isFinished: boolean;
  description?: string;
}

export interface TodoState {
  fetchState: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  todos: TodoItem[];
  openAddModal: boolean;
}

const initialState: TodoState = {
  fetchState: 'idle',
  error: null,
  todos: [],
  openAddModal: false,
};

function compareString(x: string, y: string) {
  for (let i = 0; i < Math.min(x.length, y.length); i++) {
    if (x[i] < y[i]) return -1;
    else if (x[i] > y[i]) return 1;
  }
  return 0;
}

const _getData = async () => {
  let notFinished = await getTodos();
  if (notFinished.length === 0) return [];
  if (notFinished.length === 0) return [];
  notFinished = notFinished.sort((a, b) => compareString(a.mark, b.mark));
  return notFinished;
};

export const fetchTodos = createAsyncThunk('todo/fetchTodos', async () => {
  return _getData();
});

export const refreshTodos = createAsyncThunk('todo/refreshTodos', async () => {
  return _getData();
});

export const TodoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, todo: PayloadAction<TodoItem>) => {
      state.todos = [...state.todos, todo.payload];
    },
    markFinish: (state) => {
      state.fetchState = 'idle';
    },
    setOpenModalState: (state, isOpen: PayloadAction<boolean>) => {
      state.openAddModal = isOpen.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.fetchState = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, out) => {
        state.fetchState = 'succeeded';
        state.todos = out.payload;
      })
      .addCase(fetchTodos.rejected, (state, out: any) => {
        state.fetchState = 'failed';
        state.error = out.payload.message;
      })
      .addCase(refreshTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
      });
  },
});

export const { addTodo, markFinish, setOpenModalState } = TodoSlice.actions;
export default TodoSlice.reducer;
