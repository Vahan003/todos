import React, { useEffect} from "react";


const Message = ({ isOpen, setIsOpenMessage, onMessage}) => {
  useEffect(()=>{
      setTimeout(() => {
        setIsOpenMessage(false)
  }, 1500);
  }, [isOpen])

  return (
    <span className={isOpen ? "message active" : "message"}>{onMessage}</span>
  );
};

export default Message;
