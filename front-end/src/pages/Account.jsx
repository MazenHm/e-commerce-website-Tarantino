import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SideBarAccount from "../components/SideBarAccount";
import { useAuth } from "../context/auth/authContext";

const Account = () => {
  const [user, setUser] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const auth = useAuth();

  useEffect(() => {
    console.log(auth);
    if (auth && auth.user) {
      setUser(auth.user);
      setIsConnected(true);
    }
  }, [JSON.stringify(auth)]);
  return (
    <>
      <div className="category-top">
        <div className="category-top-content">
          <h1>My Account</h1>
        </div>
      </div>
      <div className="d-flex gap-5 mx-5">
        <SideBarAccount />
        <div className="contact-side-bar">
          <p className="inf">Account Information</p>
          <p>CONTACT INFORMATION</p>
          <p>{user?.fullname}</p>
          <p>{user?.email}</p>
          <div className="d-flex justify-content-between mt-5">
            <Link to="/account/edit">
              <button className="bt-acc">EDIT</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
