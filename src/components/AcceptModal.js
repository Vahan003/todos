import React, { useEffect, useState } from "react";
import LoadingIcon from "../icon/loading.gif";
const AcceptModal = ({ text, isOpen, setIsOpen, onAccept, loading }) => {
  const onAcceptAsync = async () => {
    await onAccept();
  };
  return (
    <div className={isOpen ? "modal active" : "modal"}>
      <div className="input_section">
        <span className="card_title input_element red">{text}</span>
        {loading && (
          <div className="input_element loading_small">
            <img
              src={LoadingIcon}
              alt="Loading..."
              className="loading_img small"
            ></img>
          </div>
        )}
        <div className="input_element">
          <button className="card_button" onClick={onAcceptAsync}>
            Accept
          </button>
          <button
            className="card_button"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AcceptModal;
