import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogoutSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      navigate("/"); 
    }, 5000);

    return () => {
      clearTimeout(redirectTimer);
    };
  }, [navigate]);

  return (
    <div className="logout">
      <h1>YOU ARE SIGNED OUT</h1>
      <p>You have signed out and will go to our homepage in 5 seconds.</p>
    </div>
  );
};

export default LogoutSuccess;
