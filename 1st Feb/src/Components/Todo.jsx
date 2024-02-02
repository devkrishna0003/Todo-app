import React, { useState } from "react";
import style from "./Todo.module.css";

function Todo() {
  const [value, setValue] = useState("");
  const [todoArr, setTodoArr] = useState([]);
  const inputValue = (e) => {
    setValue(e.target.value);
  };
  const handleAddTodo = () => {
    if (value !== "") {
      const newTodo = {
        id: Date.now(),
        content: value,
        isCompleted: false,
      };
      setTodoArr([...todoArr, newTodo]);
      setValue("");
    }
  };
  const handleEnterBtn = (event) => {
    if (event.key === "Enter") {
      handleAddTodo();
    }
  };
  const handleCompleted = (id) => {
    const updatedTodo = todoArr.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });
    setTodoArr(updatedTodo);
  };
  const handleRemove = (id) => {
    const filteredTodo = todoArr.filter((filt) => filt.id !== id);
    setTodoArr(filteredTodo);
  };
  return (
    <>
      <div className={style.mainContainer}>
        <h1 className={style.header}>Todo App</h1>
        <div className={style.inputArea}>
          <input
            type="text"
            placeholder="Enter your todo"
            className={style.todoInput}
            value={value}
            onChange={inputValue}
            onKeyDown={handleEnterBtn}
          />
          <button className={style.addBtn} onClick={handleAddTodo}>
            Add
          </button>
        </div>
        <div className={style.allTodos}>
          {todoArr.map((todo) => (
            <li className={`${style.indTodo} `}>
              <span className={style.mainTodo}>
                <input
                  type="checkbox"
                  onChange={() => handleCompleted(todo.id)}
                />
                <p
                  className={`${style.mainContent} ${
                    todo.isCompleted === true ? style.completed : ""
                  }`}
                >
                  {todo.content}
                </p>
              </span>
              <button
                className={style.deleteBtn}
                onClick={() => handleRemove(todo.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </div>
      </div>
    </>
  );
}

export default Todo;
