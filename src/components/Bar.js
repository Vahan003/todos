import React from "react";

const Bar = ({setOpenModal}) => {
  return (
    <div className="bar">
      <p className="card_title">By Vahan Muradyan</p>
      <div>
        <button className="card_button" onClick={()=>{setOpenModal(prev => !prev)}}>Create</button>
        <button className="card_button">Delete All</button>
      </div>
    </div>
  );
};

export default Bar;
