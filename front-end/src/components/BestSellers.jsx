import React from "react";
const BestSellers = (props) => {
  return (
    <div className="card" style={{width: '20rem'}}>
      <img className="card-img-top" src={props.image} alt="Card" />
      <div className="card-body p-1">
        <h5 className="card-title">{props.name}</h5>
        <p className="card-text">
          <a href="#home">{props.description}</a> <br/>
          <p>From {props.price} Dinars</p>
        </p>
      </div>
    </div>

  );
};

export default BestSellers;
