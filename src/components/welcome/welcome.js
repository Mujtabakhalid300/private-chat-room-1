import React, { useEffect } from "react";
import "./welcome.css";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/name");
    }, 5000);
  });
  return (
    <div className="main-div">
      <h1 className="title">hello sir</h1>
    </div>
  );
};

export default Welcome;
