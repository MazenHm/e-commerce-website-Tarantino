import React from "react";
import { Link } from "react-router-dom";
import { logOut } from "../services/UserService";

const SideBarAccount = () => {
  const handleSignOut = () => {
    logOut();
  };
  return (
    <div>
      <div className="account-side-bar">
        <Link to="/account">
          <p className="active">ACCOUNT OVERVIEW</p>
        </Link>
        <Link to="/account/edit">
          <p>ACCOUNT INFORMATION</p>
        </Link>
        <p>MY ORDERS</p>
        <p>MY WISH LIST</p>
        <Link to="/signout/success">
          <p onClick={handleSignOut}>SIGN OUT</p>
        </Link>
      </div>
    </div>
  );
};

export default SideBarAccount;
