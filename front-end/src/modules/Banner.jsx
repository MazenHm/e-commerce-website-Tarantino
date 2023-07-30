import React from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <section className="bg-bannier">
      <h1>
        New in <br />
        Glovy Flowers
      </h1>
      <Link to="/news">
        <button className="btn-bannier">Shop Now</button>
      </Link>
    </section>
  );
};

export default Banner;
