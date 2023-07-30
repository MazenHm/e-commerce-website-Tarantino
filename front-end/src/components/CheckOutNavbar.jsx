import React from "react";
import { Link } from "react-router-dom";

const CheckOutNavbar = () => {
  return (
    <div className="checkout-nav">
      <nav className="navbar navbar-expand-lg navbar-light bg-transparent  mb-2">
        <Link
          to="/"
          className="navbar-brand m-4 d-inline-block align-top mx-auto "
        >
          <img
            className=""
            src="/assets/img/tarantino_logo.png"
            height="25"
            alt="Logo"
          />
        </Link>
      </nav>
    </div>
  );
};

export default CheckOutNavbar;
