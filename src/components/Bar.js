import React from "react";
import ArrowUp from '../icon/arrow_up.png'

const Bar = ({setOpenModal, onDeleteAll}) => {
  return (
    <>
    <div className="bar">
      <p className="card_title">By Vahan Muradyan</p>
      <div>
        <button className="card_button" onClick={()=>{setOpenModal(prev => !prev)}}>Create</button>
        <button className="card_button" onClick={onDeleteAll}>Delete All</button>
      </div>
      <div className="in_bar">
      <img src={ArrowUp} alt = "[Click Here]" className="loading_img small"></img>
    </div>
    </div>
    <div className="hide">
      <img src={ArrowUp} alt = "[Click Here]" className="loading_img small"></img>
    </div>
    </>
  );
};

export default Bar;
