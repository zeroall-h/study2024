import { useState } from "react";
import "./List.css";
import TodoItem from "./TodoItem";

const List = ({ todos, onUpdate, onDelete }) => {
  const [search, setSearch] = useState("");
  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const getFilteredData = () => {
    if (search === "") {
      return todos;
    }
    return todos.filter((todo) =>
      todo.content.toLowerCase().includes(search.toLowerCase())
    );
  };
  let filteredTodos = getFilteredData();
  return (
    <>
      <div className="box_search">
        <h2 className="title_search">Todo List</h2>
        <input
          placeholder="검색어를 입력하세요"
          className="input_search"
          onChange={onChangeSearch}
          value={search}
        />
      </div>
      <div className="list_todo">
        {filteredTodos.map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              {...todo}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          );
        })}
      </div>
    </>
  );
};

export default List;
