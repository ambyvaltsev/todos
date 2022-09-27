import s from "./Search.module.scss";
import { useState, useEffect, useContext } from "react";
import { useAppDispatch } from "../../hooks/redux";
import { searchTodo } from "../../store/todo.slice";
import { useDebounce } from "../../hooks/useDebounce";
import { todoContext } from "../todo/Todo";

export const Search = () => {
  const [input, setInput] = useState("");
  const value = useContext(todoContext)
  const dispatch = useAppDispatch();

  const search = useDebounce(input, 200);
  
  useEffect(() => {
    dispatch(searchTodo({id: value.id!, filter: search}));
  }, [search]);

  return (
    <div className={s.container}>
      <input
        type="search"
        className={s.input}
        placeholder="Search"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
};
