import { Todos, Todo } from "../pages";

export const routes = [
  { path: "/", element: <Todos />, index: false },
  { path: "todo/:id", element: <Todo />, index: false },
];
