import s from "./Creator.module.scss";
import { useState, FC } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { useAppDispatch } from "../../hooks/redux";

export interface ITodo {
  begin: string;
  finish: string;
  title: string;
  text: string;
  status: boolean;
  id: string;
}

interface ICreatorProps {
  todoData?: ITodo;
  onClick: () => void;
  title: string;
  id?: string;
  todoListId?: string;
  onAddTodo: (todo: any) => any;
}

export const Creator: FC<ICreatorProps> = ({ onClick, title, onAddTodo, id, todoListId, todoData }) => {
  const dispatch = useAppDispatch();
  const [input, setInput] = useState(todoData?.title || "");
  const [textarea, setTextarea] = useState( todoData?.text || "");
  const [finish, setFinish] = useState("");
  const [begin, setBegin] = useState("");

  const add = () => {
    if (new Date(begin) > new Date(finish) || input === "") {
      alert("Enter valid data");
      return;
    }
    dispatch(
      onAddTodo({
        id: todoListId,
        todos: {
          begin: begin,
          finish: finish,
          title: input,
          text: textarea,
          status: false,
          id: id || nanoid(),
        },
      })
    );

    onClick();
  };

  return (
    <section className={s.container}>
      <div className={s.content}>
        <h6 className={s.title}>{title}</h6>

        <label className={s.label}>
          Title
          <input className={s.input} value={input} onChange={(e) => setInput(e.target.value)} />
        </label>

        <label className={s.label}>
          Begin
          <input
            type="date"
            className={s.calendar}
            value={begin}
            onChange={(e) => setBegin(e.target.value)}
          />
        </label>

        <label className={s.label}>
          Finish
          <input
            type="date"
            className={s.calendar}
            value={finish}
            onChange={(e) => setFinish(e.target.value)}
          />
        </label>

        <label className={s.label}>
          Text
          <textarea className={s.textarea} value={textarea} onChange={(e) => setTextarea(e.target.value)} />
        </label>
        <button className={s.btn__add} onClick={add}>
          Add
        </button>
      </div>
      <button className={s.btn__close} onClick={onClick}>
        Close
      </button>
    </section>
  );
};
