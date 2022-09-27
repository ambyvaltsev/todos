import s from "./Todo.module.scss";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import { FaRegEdit } from "react-icons/fa";
import { useState } from "react";
import { Creator } from "../../components";
import { editTodo } from "../../store/todo.slice";

export const Todo = () => {
  const location = useLocation();
  const [isOpen, setisOpen] = useState(false);
  const { id } = useParams();
  const todo = useAppSelector((state) =>
    state.todo.allTodos.find((item) => item.id === location.state.id)
  )?.todos.find((item) => item.id === id);

  const navigate = useNavigate();
  return (
    <div className={s.container}>
      <button className={s.btn__back} onClick={() => navigate("/")}>
        Back
      </button>
      <section className={s.content}>
        <div className={s.header}>
          <h1 className={s.header__title}>Todo</h1>
          <FaRegEdit className={s.header__editIcon} onClick={() => setisOpen(true)} />
        </div>
        <div className={s.todo}>
          <div className={s.todo__item}>
            <span className={s.item__title}>Title</span>
            <span className={s.item__body}>{todo?.title}</span>
          </div>
          <div className={s.todo__item}>
            <span className={s.item__title}>Begin</span>
            <span className={s.item__body}>
              {todo?.begin
                ? new Date(todo.begin).toLocaleString("en-US", {
                    day: "numeric",
                    month: "numeric",
                    year: "numeric",
                  })
                : new Date().toLocaleString("en-US", { day: "numeric", month: "numeric", year: "numeric" })}
            </span>
          </div>
          <div className={s.todo__item}>
            <span className={s.item__title}>Finish</span>
            <span className={s.item__body}>
              {todo?.finish
                ? new Date(todo?.finish).toLocaleString("en-US", {
                    day: "numeric",
                    month: "numeric",
                    year: "numeric",
                  })
                : "-"}
            </span>
          </div>
          <div className={s.todo__item}>
            <span className={s.item__title}>Completed</span>
            <span className={s.item__body}>{todo?.status ? "Yes" : "No"}</span>
          </div>
          <div className={s.todo__item}>
            <span className={s.item__title}>Text</span>
            <span className={s.item__body}>{todo?.text ? todo?.text : "-"}</span>
          </div>
        </div>
      </section>
      {isOpen && (
        <Creator
          todoData={location.state.todos[0]}
          onClick={() => setisOpen(false)}
          title="Edit todo"
          onAddTodo={editTodo}
          todoListId={location.state.id}
          id={id!}
        />
      )}
    </div>
  );
};
