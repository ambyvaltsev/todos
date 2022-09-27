import s from "./List.module.scss";
import { useAppSelector } from "../../hooks/redux";
import { Card } from "..";
import { ITodo } from "../creator/Creator";
import { useContext } from 'react';
import { todoContext } from "../todo/Todo";

export const List = () => {

  const value = useContext(todoContext)
  return (
    <section className={s.container}>
      <div className={s.content__header}>
        <div className={s.header__req}>{"\u2116"}</div>
        <div className={s.header__req}>Status</div>
        <div className={s.header__req}>Todo</div>
        <div className={s.header__req}>Begin</div>
        <div className={s.header__req}>Finish</div>
      </div>
      {value.todos && value.todos.length > 0 ? value.todos
        .filter((item: ITodo) => item.title.includes(value.filter!))
        .map((item: ITodo, index: number) => (
          <Card number={index + 1} card={item} key={item.id} />
        )) : <span className={s.empty}>List is empty </span>}
    </section>
  );
};
