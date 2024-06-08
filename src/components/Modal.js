import React, { useEffect, useState } from "react";
import LoadingIcon from "../icon/loading.gif";

const Modal = ({
  name,
  updateMode,
  element,
  isOpen,
  onCreate,
  onUpdate,
  onCancel,
}) => {
  const [postValues, setPostValues] = useState({
    title: "",
    description: "",
    color: "#ffffff",
  });
 
  const [loading, setLoading] = useState(false);

  const onCreateHandle = async () => {
    setLoading((prev) => !prev);
    await onCreate(postValues);
    setLoading((prev) => !prev);
  };

  const onUpdateHandle = async () => {
    setLoading((prev) => !prev);
    await onUpdate(postValues);
    setLoading((prev) => !prev);
  };

  useEffect(() => {
    if(element){
      setPostValues({
        title: element.title,
        description: element.description,
        color: element.color,
      });
    }
  }, [element]);

  const handleInputs = (e) => {
    setPostValues((prev) => ({
      ...prev,
      [e.target.name]: `${e.target.value}`,
    }));
  };

  return (
    <div className={isOpen ? "modal active" : "modal"}>
      <div className="input_section">
        <span className="card_title input_element">{name}</span>
        {loading && (
          <div className="input_element loading_small">
            <img
              src={LoadingIcon}
              alt="Loading..."
              className="loading_img small"
            ></img>
          </div>
        )}

        <input
          name="title"
          className="input_element"
          placeholder="Title"
          onChange={handleInputs}
          value={postValues.title}
        />
        <textarea
          name="description"
          className="input_element large"
          placeholder="Description"
          onChange={handleInputs}
          value={postValues.description}
        />
        <input
          name="color"
          type="color"
          className="input_element"
          onChange={handleInputs}
          value={postValues.color}
        />
        <div className="input_element buttons">
          {!updateMode ? (
            <button
              className="card_button"
              onClick={!loading ? () => onCreateHandle() : () => {}}
            >
              Create
            </button>
          ) : (
            <button
              className="card_button"
              onClick={!loading ? () => onUpdateHandle() : () => {}}
            >
              Update
            </button>
          )}

          <button
            className="card_button"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
