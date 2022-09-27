import { useState, FC } from "react";
import { useAppDispatch } from "../../hooks/redux";
import s from "./CreatorTodo.module.scss";
import { nanoid } from "@reduxjs/toolkit";

interface ICreatorProps {
  title?: string
  onClose: () => void;
  id?: string
  onCreate: (data: any) => any
}

export const CreatorTodo: FC<ICreatorProps> = ({ onClose, id, onCreate, title }) => {
  const dispatch = useAppDispatch();
  const [input, setInput] = useState(title || "");

  const add = () => {
    dispatch(
      onCreate({
        title: input,
        id: id || nanoid(),
        todos: [],
        filter: "",
      })
    );
    onClose()
  };
  return (
    <section className={s.container}>
      <div className={s.content}>
        <h6 className={s.title}>Creator todo</h6>

        <label className={s.label}>
          Title
          <input className={s.input} value={input} onChange={(e) => setInput(e.target.value)} />
        </label>

        <button className={s.btn__add} onClick={add}>
          Add
        </button>
      </div>
      <button className={s.btn__close} onClick={onClose}>
        Close
      </button>
    </section>
  );
};
