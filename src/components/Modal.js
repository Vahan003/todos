import React, { useEffect, useState } from "react";
import LoadingIcon from "../icon/loading.gif";

const Modal = ({
  name,
  updateMode,
  element,
  isOpen,
  setOpen,
  onCreate,
  onUpdate,
  status,
  messageDate,
  setElement,
}) => {
  const [postValues, setPostValues] = useState({
    title: "",
    description: "",
    color: "#ffffff",
  });
  const [post, setPost] = useState({
    title: null,
    description: null,
    color: "#ffffff",
  });
  const [loading, setLoading] = useState(false);

  const onCreateHandle = async () => {
    setLoading((prev) => !prev);
    await onCreate(post);
    setLoading((prev) => !prev);
  };
  const onUpdateHandle = async () => {
    setLoading((prev) => !prev);
    await onUpdate(post, element._id);
    setElement({});
    setLoading((prev) => !prev);
  };

  useEffect(() => {
    if (status) {
      setOpen(false);
      setPostValues({
        title: "",
        description: "",
        color: "#ffffff",
      });
      setPost({
        title: null,
        description: null,
        color: "#ffffff",
      });
    }
  }, [status, messageDate]);

  useEffect(() => {
    if (updateMode) {
      setPostValues({
        title: element.title,
        description:  element.description,
        color: element.color,
      });
      setPost({
        title: element.title,
        description:  element.description,
        color: element.color,
      });
    }
  }, [updateMode]);

  const handleInputs = (e) => {
    setPostValues((prev) => ({
      ...prev,
      [e.target.name]: `${e.target.value}`,
    }));
    setPost((prev) => ({
      ...prev,
      [e.target.name]: e.target.value !== "" ? e.target.value : null,
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
            onClick={() => {
              setOpen((prev) => !prev);
              setPostValues({
                title: "",
                description: "",
                color: "#ffffff",
              });
              setPost({
                title: null,
                description: null,
                color: "#ffffff",
              });
              setElement({})
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
