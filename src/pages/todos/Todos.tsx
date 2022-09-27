import s from "./Todos.module.scss";
import { Creator, List, Search } from "../../components";
import { useState } from "react";
import { addTodo, createTodo } from "../../store/todo.slice";
import { Todo } from "../../components";
import { CreatorTodo } from "../../components/creatorTodo/CreatorTodo";
import { useAppSelector } from "../../hooks/redux";

export const Todos = () => {
  const [isOpen, setIsOpen] = useState(false);
  const todos = useAppSelector((state) => state.todo.allTodos);

  return (
    <div className={s.container}>
      <div className={s.header}>
        <h1 className={s.title}>ToDo Lists</h1>
        <button className={s.btn_createTodo} onClick={() => setIsOpen(true)}>
          Create
        </button>
      </div>
      <div className={s.lists}>
        {todos.length > 0 ? (
          todos.map((item) => (
            <Todo title={item.title} id={item.id} todos={item.todos} filter={item.filter.search} key={item.id}/>
          ))
        ) : (
          <div className={s.message}>You don't have any Todo list. Press 'Create'</div>
        )}
      </div>

      {isOpen && <CreatorTodo onClose={() => setIsOpen(false)} onCreate={createTodo} />}
    </div>
  );
};
