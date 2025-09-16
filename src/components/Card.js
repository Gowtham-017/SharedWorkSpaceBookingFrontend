import React from "react";

const Card = ({ name, type, capacity, imageUrl, location, onView, onBook }) => {
  return (
    <div className="card shadow-sm" style={{ width: "18rem" }}>
      
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
       
        <br />
        <div className="d-flex justify-content-between">
          <button className="btn btn-outline-primary" onClick={onView}>
            View
          </button>&nbsp;&nbsp;
          <button className="btn btn-success" onClick={onBook}>
            Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;

