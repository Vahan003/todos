import React, { useEffect, useState } from "react";


const Modal = ({ isOpen, onMessage, messageDate}) => {
  const [show, setShow] = useState(false);
  
  useEffect(()=>{
    setShow(prev => !prev)
      setTimeout(() => {
      setShow(prev => !prev)
  }, 1000);
  }, [messageDate])

  return (
    <span className={isOpen && show ? "message active" : "message"}>{onMessage}</span>
  );
};

export default Modal;
