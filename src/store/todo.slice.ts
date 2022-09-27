import { ITodo } from "./../components/creator/Creator";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TodosItem = { id: string; title: string; todos: ITodo[]; filter: {search: string, status: boolean} };

interface IInitialState {
  allTodos: TodosItem[];
}

const initialState: IInitialState = {
  allTodos: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<{ id: string; todos: ITodo }>) {
      state.allTodos.map((item) => {
        if (item.id === action.payload.id) {
          item.todos.push(action.payload.todos);
        }
      });
    },
    changeStatus(state, action: PayloadAction<{ id: string; todoId: string }>) {
      state.allTodos.map((item) => {
        if (item.id === action.payload.id) {
          item.todos.map((item: ITodo) => {
            if (item.id === action.payload.todoId) {
              item.status = !item.status;
            }
          });
        }
      });
    },
    deleteTodo(state, action: PayloadAction<{ id: string; todoId: string }>) {
      state.allTodos.map((item) => {
        if (item.id === action.payload.id) {
          item.todos = item.todos.filter((item) => item.id !== action.payload.todoId);
        }
      });
    },
    editTodo(state, action: PayloadAction<{ id: string; todos: ITodo }>) {
      state.allTodos = state.allTodos.map((item) => {
        if (item.id === action.payload.id) {
          item.todos = item.todos.map((item) => {
            if (item.id === action.payload.todos.id) {
              return action.payload.todos;
            }
            return item;
          });
        }
        return item;
      });
    },
    searchTodo(state, action: PayloadAction<{ id: string; filter: string }>) {
      state.allTodos.map((item) => {
        if (item.id === action.payload.id) {
          item.filter = {...item.filter, search: action.payload.filter};
        }
      });
    },
    createTodo(state, action: PayloadAction<TodosItem>) {
      state.allTodos.push(action.payload);
    },
    deleteToDoList(state, action: PayloadAction<string>) {
      state.allTodos = state.allTodos.filter((item) => item.id !== action.payload);
    },
    editTodoList(state, action: PayloadAction<{ id: string; title: string }>) {
      state.allTodos = state.allTodos.map((item) => {
        if (item.id === action.payload.id) {
          item.title = action.payload.title;
        }
        return item;
      });
    },
  },
});

export const { addTodo, changeStatus, deleteTodo, editTodo, searchTodo, createTodo, deleteToDoList, editTodoList } =
  todoSlice.actions;
