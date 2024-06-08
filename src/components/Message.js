import React, { useEffect, useState } from "react";

const Message = ({ message, messageDate }) => {
  const [isOpenMessage, setIsOpenMessage] = useState(false);

  useEffect(() => {
    message && setIsOpenMessage(true);

    setTimeout(() => {
      setIsOpenMessage(false);
    }, 1500);
  }, [messageDate]);

  return (
    <span className={isOpenMessage ? "message active" : "message"}>
      {message}
    </span>
  );
};

export default Message;
