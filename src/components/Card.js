import React from "react";

const Card = ({ name, type, capacity,imageUrl,location, onClick }) => {
  return (
    <div className="card shadow-sm" style={{ width: "18rem", cursor: "pointer" }} onClick={onClick}>
      {imageUrl && <img src={imageUrl} className="card-img-top" alt={name} />}
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{type}</p>
        <p className="card-text">{capacity}</p>
        <p className="card-text">{location}</p>
        <button className="btn btn-primary">View</button>
      </div>
    </div>
  );
};

export default Card;