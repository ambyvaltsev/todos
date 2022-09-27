import { configureStore } from "@reduxjs/toolkit";
import { loadFromStorage, saveToStorage } from "../helpers/localStorage";
import { todoSlice } from "./todo.slice";

const preloadedState = loadFromStorage("todo");

export const store = configureStore({
  reducer: {
    todo: todoSlice.reducer,
  },
  preloadedState,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

store.subscribe(() => saveToStorage('todo', store.getState()));
