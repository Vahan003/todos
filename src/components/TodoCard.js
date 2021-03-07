import React, { useEffect, useState } from "react";

const TodoCard = (props) => {
  const { title, description, color, onUpdate, onDelete } = props;

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAnimate(true);
    }, 100);
  }, []);

  return (
    <div
      className={animate ? "todo_card animated" : "todo_card"}
      style={{ borderBottom: `0.4rem solid ${color ?? "#E5E5E5"}` }}
    >
      <h3 className="card_title">{title ?? "No title!"}</h3>
      <p className="card_description">{description ?? "No description!"}</p>
      <div className="buttonSection">
        <div
          className="color_picker"
          style={{
            borderBottom: `0.3rem solid ${color ?? "#E5E5E5"}`,
          }}
        >
          {color}
        </div>
        <button className="card_button" onClick={onUpdate}>
          Update
        </button>
        <button className="card_button" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoCard;
