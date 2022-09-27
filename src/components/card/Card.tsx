import s from "./Card.module.scss";
import { changeStatus, deleteTodo } from "../../store/todo.slice";
import { useAppDispatch } from "../../hooks/redux";
import { BsXLg } from "react-icons/bs";
import { Link } from "react-router-dom";
import { FC, useContext } from "react";
import { ITodo } from "../creator/Creator";
import { todoContext } from '../../components/todo/Todo';

interface ICardProps {
  number: number;
  card: ITodo;
}

export const Card: FC<ICardProps> = ({ number, card }) => {
  const dispatch = useAppDispatch ();
  const value = useContext(todoContext)
  const onChangeStatus = () => {
    dispatch(changeStatus({id: value.id!, todoId: card.id }));
  };
  return (
    <article className={`${s.container} ${card.status && s.completed}`}>
      <div className={s.number}>{number}</div>
      <input className={s.status} type="checkbox" checked={card.status} onChange={onChangeStatus} />
      <Link to={`todo/${card.id}`} state={value}>
        <div className={s.title}>{card.title}</div>
      </Link>
      <div className={s.date}>
        {card.begin
          ? new Date(card.begin).toLocaleString("en-US", {
              day: "numeric",
              month: "numeric",
              year: "numeric",
            })
          : new Date().toLocaleString("en-US", { day: "numeric", month: "numeric", year: "numeric" })}
      </div>
      <div className={s.date}>
        {card.finish
          ? new Date(card.finish).toLocaleString("en-US", { day: "numeric", month: "numeric", year: "numeric" })
          : "-"}
      </div>
      <button
        onClick={() => dispatch(deleteTodo({id: value.id!, todoId: card.id}))}
        className={s.btn__delete}
        style={{ color: card.finish && new Date(card.finish) < new Date() ? "white" : '' }}
      >
        <BsXLg className={s.btn__deleteIcon} />
      </button>
      {!card.status && card.finish && new Date(card.finish) < new Date() && (
        <div className={s.overdue}>
          <span className={s.overdue__text}>O v e r d u e</span>
        </div>
      )}
    </article>
  );
};
