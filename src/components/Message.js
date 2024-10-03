import React from "react";
import "../styles/Message.css"

const Message = ({msg, bgColor}) => {
  return (
    <div
      className="box"
      style={{backgroundColor: bgColor}}>
      <p
        className="text"
        dangerouslySetInnerHTML={{ __html: msg }}
      />
    </div>
  );
};

export default Message;