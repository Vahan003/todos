import React from "react";
import TodoCard from "./TodoCard";
const TodoList = (props) => {
  const { todos, deleteTodo } = props;
  const arr = [...todos]

  return (
    <div className="todo_list">
      {arr.reverse().map((el) => (
        <TodoCard
          key={el._id}
          title={el.title}
          description={el.description}
          color={el.color}
          onDelete = {async () => {
            await deleteTodo(el._id);
          }}
        />
      ))}
    </div>
  );
};

export default TodoList;