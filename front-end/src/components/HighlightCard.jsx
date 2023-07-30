import React from "react";
// import Diamond from '../diamond.png'
const HighlightCard = (props) => {
  return (
    <div className="highlight">
      <img
        src={props.image}
        alt="diamond"
        height="130"
        width="130"
        className="mx-auto"
      />
      {/* <img className="heart-img" src={props.heart} alt="Hear" /> */}

      <h1 className="mx-auto">{props.name}</h1>
      <p>{props.description}</p>
    </div>
  );
};

export default HighlightCard;
