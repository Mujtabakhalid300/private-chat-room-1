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
      <div className="hello-section">

      <h1 className="title-h1">Welcome</h1>
      </div>
    </div>
  );
};

export default Welcome;
