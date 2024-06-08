import React from "react";
import TodoCard from "./TodoCard";
const TodoList = (props) => {
  const { todos, onUpdate, onDelete, loading } = props;

  return (
    <div className="todo_list">
      {todos.length ? (
        todos.map((el) => (
          <TodoCard
            key={el?.id}
            title={el.title}
            description={el.description}
            color={el.color}
            onUpdate={() => {
              !loading && onUpdate(el);
            }}
            onDelete={async () => {
              !loading && (await onDelete(el?.id));
            }}
          />
        ))
      ) : (
        <span className="todo_list large">
          No Todos, Please create new one!
        </span>
      )}
    </div>
  );
};

export default TodoList;
