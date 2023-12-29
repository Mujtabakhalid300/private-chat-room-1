import React, { useState, useContext } from "react";
import { nameContext } from "../../nameContext/nameContext";
import "./name.css";
import { useNavigate } from "react-router-dom";

const Name = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const { value, setValue } = useContext(nameContext);
  return (
    <div className="main-div">
      {/* <h1 className="enter-name-title">Kindly Enter your name here</h1> */}
      <form
      className="name-form"
        onSubmit={(e) => {
          e.preventDefault();
          setValue(name);
          navigate("/chat");
          localStorage.setItem("name", name);
        }}
      >
        {/* <label className="name-label">Name</label> */}
        <input
        className="name-input"
          value={name}
          placeholder="Enter Name"
          onChange={(e) => {
            setName(e.target.value.toLowerCase());
          }}
        />
        <button className="name-submit" type="submit">Enter Chatroom</button>
      </form>
    </div>
  );
};

export default Name;
