import s from "./Todo.module.scss";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Creator, List, Search } from "../../components";
import { useState, FC, createContext } from "react";
import { addTodo, deleteToDoList, editTodoList } from "../../store/todo.slice";
import { ITodo } from "../creator/Creator";
import { BsXLg } from "react-icons/bs";
import { useAppDispatch } from "../../hooks/redux";
import { FaRegEdit } from "react-icons/fa";
import { CreatorTodo } from "../creatorTodo/CreatorTodo";

interface ITodoProps {
  title: string;
  id: string;
  todos: ITodo[];
  filter: string;
}

export const todoContext = createContext({} as Partial<ITodoProps>);

export const Todo: FC<ITodoProps> = ({ title, id, todos, filter }) => {
  const dispatch = useAppDispatch();
  const [isOpenTodo, setIsOpenTodo] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  return (
    <todoContext.Provider value={{ id, todos, filter }}>
      <div className={s.container}>
        <div className={s.content}>
          <div className={s.header}>
            <h1 className={s.header__title}>{title}</h1>
            <BsXLg className={s.header__btnDelete} onClick={() => dispatch(deleteToDoList(id))} />
            {isOpenTodo ? (
              <IoIosArrowUp className={s.header__btnPopup} onClick={() => setIsOpenTodo(false)} />
            ) : (
              <IoIosArrowDown className={s.header__btnPopup} onClick={() => setIsOpenTodo(true)} />
            )}
            <FaRegEdit className={s.header__btnEdit} onClick={() => setIsOpenEdit(true)} />
          </div>
          {isOpenTodo && (
            <div className={s.popup}>
              <Search />

              <button className={s.btn__add} onClick={() => setIsOpen(true)}>
                Add item
              </button>

              <List />
            </div>
          )}
        </div>
        {isOpen && (
          <Creator
            onClick={() => setIsOpen(false)}
            title="Add todo"
            onAddTodo={addTodo}
            todoListId={id}
            id={id}
          />
        )}
        {isOpenEdit && (
          <CreatorTodo onClose={() => setIsOpenEdit(false)} id={id} onCreate={editTodoList} title={title} />
        )}
      </div>
    </todoContext.Provider>
  );
};
